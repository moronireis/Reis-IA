#!/usr/bin/env python3
"""Smoke test for the REIS [IA] video pipeline.

Checks:
  1. ffmpeg binary present
  2. faster-whisper importable
  3. PEXELS_API_KEY and PIXABAY_API_KEY env vars (report only)
  4. Creates a synthetic test video (testsrc + sine audio) in /tmp/
  5. Runs transcribe.py on it
  6. Generates an .ass via caption.py

Designed to fail GRACIOUSLY with actionable install hints.
Do NOT run until deps are installed — Moroni approves install first.
"""
from __future__ import annotations

import os
import shutil
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
PIPELINE = HERE.parent
TMP = Path("/tmp/reis-video-smoke")


def step(name: str) -> None:
    print(f"\n=== {name} ===", flush=True)


def ok(msg: str) -> None:
    print(f"  PASS  {msg}", flush=True)


def fail(msg: str) -> None:
    print(f"  FAIL  {msg}", flush=True)


def warn(msg: str) -> None:
    print(f"  WARN  {msg}", flush=True)


def check_ffmpeg() -> bool:
    step("1. ffmpeg")
    path = shutil.which("ffmpeg")
    if not path:
        fail("ffmpeg not found. Install: brew install ffmpeg")
        return False
    try:
        r = subprocess.run([path, "-version"], capture_output=True, text=True, timeout=10)
        ok(f"{path} — {r.stdout.splitlines()[0]}")
        return True
    except Exception as e:
        fail(f"ffmpeg present but failed to run: {e}")
        return False


def check_faster_whisper() -> bool:
    step("2. faster-whisper")
    try:
        import faster_whisper  # noqa: F401
        ok("faster-whisper importable")
        return True
    except ImportError:
        fail("faster-whisper not installed. Install: pip install -r requirements.txt")
        return False


def check_env() -> None:
    step("3. env vars")
    for k in ("PEXELS_API_KEY", "PIXABAY_API_KEY"):
        v = os.environ.get(k, "").strip()
        if v:
            ok(f"{k} set (len={len(v)})")
        else:
            warn(f"{k} empty or unset (ok for transcription tests, required for broll_fetch)")


def make_dummy_video() -> Path | None:
    step("4. synthetic test video")
    if not shutil.which("ffmpeg"):
        fail("skipped (no ffmpeg)")
        return None
    TMP.mkdir(parents=True, exist_ok=True)
    dummy = TMP / "dummy.mp4"
    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", "testsrc=duration=5:size=1080x1920:rate=30",
        "-f", "lavfi", "-i", "sine=frequency=440:duration=5",
        "-c:v", "libx264", "-preset", "ultrafast", "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        str(dummy),
    ]
    try:
        subprocess.run(cmd, capture_output=True, text=True, timeout=120, check=True)
    except subprocess.CalledProcessError as e:
        fail(f"ffmpeg failed: {e.stderr[-300:]}")
        return None
    ok(f"created {dummy}")
    return dummy


def run_transcribe(dummy: Path) -> Path | None:
    step("5. transcribe.py")
    out = TMP / "transcript.json"
    cmd = [
        sys.executable, str(PIPELINE / "transcribe.py"),
        "--input", str(dummy),
        "--output", str(out),
        "--model", "tiny",
        "--language", "en",
    ]
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
    except Exception as e:
        fail(f"transcribe crashed: {e}")
        return None
    if r.returncode != 0:
        fail(f"transcribe failed: {r.stderr[-400:]}")
        return None
    if not out.exists():
        fail("transcribe exited 0 but no output file.")
        return None
    ok(f"transcript -> {out}")
    return out


def run_caption(transcript: Path) -> bool:
    step("6. caption.py -> .ass")
    out = TMP / "captions.ass"
    cmd = [
        sys.executable, str(PIPELINE / "caption.py"),
        "--transcript", str(transcript),
        "--output", str(out),
    ]
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    except Exception as e:
        fail(f"caption crashed: {e}")
        return False
    if r.returncode != 0:
        # Empty transcript (sine wave has no words) is acceptable.
        if "no words array" in r.stderr or "no caption lines" in r.stderr:
            warn("no words detected in dummy audio (expected for sine wave)")
            return True
        fail(f"caption failed: {r.stderr[-400:]}")
        return False
    ok(f"ass -> {out}")
    return True


def main() -> int:
    print("REIS [IA] video pipeline — smoke test")
    print(f"pipeline root: {PIPELINE}")

    results = []
    results.append(("ffmpeg", check_ffmpeg()))
    results.append(("faster-whisper", check_faster_whisper()))
    check_env()

    dummy = make_dummy_video()
    results.append(("dummy video", dummy is not None))

    transcript = None
    if dummy and all(r for _, r in results[:2]):
        transcript = run_transcribe(dummy)
        results.append(("transcribe", transcript is not None))
        if transcript:
            results.append(("caption", run_caption(transcript)))
    else:
        warn("skipping transcribe/caption — deps missing")

    step("SUMMARY")
    for name, passed in results:
        print(f"  {'OK  ' if passed else 'FAIL'}  {name}")
    all_ok = all(r for _, r in results)
    print(f"\n{'ALL GREEN' if all_ok else 'FAILURES PRESENT — see hints above'}")
    return 0 if all_ok else 1


if __name__ == "__main__":
    sys.exit(main())
