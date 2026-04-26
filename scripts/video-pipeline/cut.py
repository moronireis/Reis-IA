#!/usr/bin/env python3
"""Step 3 — Cut clips from a source video using ffmpeg.

Reads a JSON produced by clip-cutter agent:
    { "clips": [ { "id": "01", "start": 127.4, "end": 168.92, "mode": "precise" }, ... ] }

`mode` is "fast" (stream copy, keyframe-aligned) or "precise" (re-encode, sample-accurate).

Usage:
    python cut.py --input source.mp4 --clips clips.json --out-dir clips/
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from lib.ffmpeg_helpers import FFmpegError, require_binary, run


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Cut clips from a source video.")
    p.add_argument("--input", type=Path, required=True)
    p.add_argument("--clips", type=Path, required=True, help="clip-cutter JSON.")
    p.add_argument("--out-dir", type=Path, required=True)
    p.add_argument(
        "--default-mode",
        choices=["fast", "precise"],
        default="precise",
        help="Used when a clip doesn't specify mode.",
    )
    return p.parse_args()


def cut_one(ffmpeg: str, src: Path, start: float, end: float, mode: str, out: Path) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    base = [ffmpeg, "-y", "-ss", f"{start:.3f}", "-to", f"{end:.3f}", "-i", str(src)]
    if mode == "fast":
        cmd = base + ["-c", "copy", str(out)]
    else:
        cmd = base + [
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "18",
            "-c:a", "aac",
            "-b:a", "192k",
            str(out),
        ]
    run(cmd, timeout=1800)


def main() -> int:
    args = parse_args()
    if not args.input.exists():
        print(f"ERROR: input not found: {args.input}", file=sys.stderr)
        return 1
    if not args.clips.exists():
        print(f"ERROR: clips json not found: {args.clips}", file=sys.stderr)
        return 1

    try:
        ffmpeg = require_binary("ffmpeg", "brew install ffmpeg")
    except FFmpegError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

    data = json.loads(args.clips.read_text(encoding="utf-8"))
    clips = data.get("clips") or []
    if not clips:
        print("ERROR: no clips in JSON.", file=sys.stderr)
        return 1

    args.out_dir.mkdir(parents=True, exist_ok=True)
    for idx, clip in enumerate(clips, start=1):
        cid = str(clip.get("id") or f"{idx:02d}")
        start = float(clip["start"])
        end = float(clip["end"])
        mode = clip.get("mode") or args.default_mode
        out = args.out_dir / f"clip_{cid}_raw.mp4"
        print(f"[cut] clip {cid}: {start:.2f}-{end:.2f} mode={mode} -> {out}", file=sys.stderr)
        try:
            cut_one(ffmpeg, args.input, start, end, mode, out)
        except FFmpegError as e:
            print(f"ERROR cutting clip {cid}: {e}", file=sys.stderr)
            return 1

    print(f"[cut] OK — {len(clips)} clips written to {args.out_dir}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
