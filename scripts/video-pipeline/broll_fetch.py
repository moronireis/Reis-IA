#!/usr/bin/env python3
"""Step 6a — Fetch stock B-roll clips from Pexels and Pixabay.

Reads a plan JSON from caption-broll-operator:
    {
      "insertions": [
        {
          "id": "01",
          "clip_start": 3.8,
          "clip_end": 7.1,
          "queries": {
            "pexels": ["dark office night executive thinking", "..."],
            "pixabay": ["corporate budget chart down", "..."]
          },
          "max_results": 3
        }
      ]
    }

Outputs downloaded clips to --out-dir and writes a manifest JSON mapping
insertion id -> downloaded file paths. Never commits API keys.

Usage:
    python broll_fetch.py --plan broll_plan.json --out-dir broll/ --manifest broll_manifest.json
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Any

try:
    import requests
except ImportError:
    print(
        "ERROR: requests not installed. Run: pip install -r requirements.txt",
        file=sys.stderr,
    )
    sys.exit(1)


PEXELS_SEARCH = "https://api.pexels.com/videos/search"
PIXABAY_SEARCH = "https://pixabay.com/api/videos/"


def load_env() -> None:
    """Best-effort .env loader (no python-dotenv hard dep)."""
    env_path = Path(__file__).parent / ".env"
    if not env_path.exists():
        return
    for raw in env_path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip())


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Fetch B-roll from Pexels/Pixabay.")
    p.add_argument("--plan", type=Path, required=True)
    p.add_argument("--out-dir", type=Path, required=True)
    p.add_argument("--manifest", type=Path, required=True)
    p.add_argument("--timeout", type=int, default=60)
    return p.parse_args()


def pexels_search(query: str, key: str, per_page: int, timeout: int) -> list[dict]:
    r = requests.get(
        PEXELS_SEARCH,
        headers={"Authorization": key},
        params={"query": query, "per_page": per_page, "orientation": "portrait"},
        timeout=timeout,
    )
    r.raise_for_status()
    videos = r.json().get("videos", [])
    results = []
    for v in videos:
        files = v.get("video_files") or []
        hd = sorted(
            (f for f in files if f.get("width") and f.get("height")),
            key=lambda f: (f.get("height", 0), f.get("width", 0)),
            reverse=True,
        )
        if hd:
            results.append({"url": hd[0]["link"], "source": "pexels", "id": v["id"]})
    return results


def pixabay_search(query: str, key: str, per_page: int, timeout: int) -> list[dict]:
    r = requests.get(
        PIXABAY_SEARCH,
        params={"key": key, "q": query, "per_page": max(3, per_page), "video_type": "film"},
        timeout=timeout,
    )
    r.raise_for_status()
    hits = r.json().get("hits", [])
    results = []
    for h in hits:
        videos = h.get("videos") or {}
        # Prefer large, fall back medium.
        for size in ("large", "medium", "small", "tiny"):
            if videos.get(size, {}).get("url"):
                results.append({"url": videos[size]["url"], "source": "pixabay", "id": h["id"]})
                break
    return results


def download(url: str, dest: Path, timeout: int) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    with requests.get(url, stream=True, timeout=timeout) as r:
        r.raise_for_status()
        with dest.open("wb") as f:
            for chunk in r.iter_content(chunk_size=1024 * 256):
                if chunk:
                    f.write(chunk)


def main() -> int:
    load_env()
    args = parse_args()

    pexels_key = os.environ.get("PEXELS_API_KEY", "").strip()
    pixabay_key = os.environ.get("PIXABAY_API_KEY", "").strip()
    if not pexels_key and not pixabay_key:
        print(
            "ERROR: neither PEXELS_API_KEY nor PIXABAY_API_KEY set. "
            "Copy .env.example to .env and fill at least one.",
            file=sys.stderr,
        )
        return 1

    plan = json.loads(args.plan.read_text(encoding="utf-8"))
    insertions = plan.get("insertions") or []
    if not insertions:
        print("ERROR: plan has no insertions.", file=sys.stderr)
        return 1

    args.out_dir.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, Any] = {"insertions": []}

    for ins in insertions:
        ins_id = str(ins.get("id"))
        max_results = int(ins.get("max_results", 2))
        queries = ins.get("queries") or {}
        candidates: list[dict] = []

        try:
            if pexels_key:
                for q in queries.get("pexels", []):
                    candidates.extend(pexels_search(q, pexels_key, max_results, args.timeout))
            if pixabay_key:
                for q in queries.get("pixabay", []):
                    candidates.extend(pixabay_search(q, pixabay_key, max_results, args.timeout))
        except requests.RequestException as e:
            print(f"WARN: search failed for insertion {ins_id}: {e}", file=sys.stderr)

        if not candidates:
            print(f"WARN: no candidates for insertion {ins_id}", file=sys.stderr)
            manifest["insertions"].append({"id": ins_id, "files": []})
            continue

        # Dedupe by url and cap.
        seen: set[str] = set()
        unique = []
        for c in candidates:
            if c["url"] in seen:
                continue
            seen.add(c["url"])
            unique.append(c)
            if len(unique) >= max_results:
                break

        files: list[str] = []
        for i, cand in enumerate(unique, start=1):
            dest = args.out_dir / f"broll_{ins_id}_{i:02d}_{cand['source']}.mp4"
            try:
                download(cand["url"], dest, args.timeout)
                files.append(str(dest))
                print(f"[broll] {ins_id} <- {cand['source']} {cand['id']} -> {dest}", file=sys.stderr)
            except requests.RequestException as e:
                print(f"WARN: download failed {cand['url']}: {e}", file=sys.stderr)

        manifest["insertions"].append({
            "id": ins_id,
            "clip_start": ins.get("clip_start"),
            "clip_end": ins.get("clip_end"),
            "files": files,
        })

    args.manifest.parent.mkdir(parents=True, exist_ok=True)
    args.manifest.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[broll] OK — manifest -> {args.manifest}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
