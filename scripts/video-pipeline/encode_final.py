#!/usr/bin/env python3
"""Step 7 — Final encode for Reels/Shorts (1080x1920, 30fps, CRF 20, faststart).

Usage:
    python encode_final.py --input clip_01_with_broll.mp4 --output clip_01_final.mp4
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

from lib.ffmpeg_helpers import FFmpegError, require_binary, run


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Final Reels/Shorts encode.")
    p.add_argument("--input", type=Path, required=True)
    p.add_argument("--output", type=Path, required=True)
    p.add_argument("--width", type=int, default=1080)
    p.add_argument("--height", type=int, default=1920)
    p.add_argument("--fps", type=int, default=30)
    p.add_argument("--crf", type=int, default=20)
    p.add_argument("--preset", default="slow")
    return p.parse_args()


def main() -> int:
    args = parse_args()
    if not args.input.exists():
        print(f"ERROR: input not found: {args.input}", file=sys.stderr)
        return 1

    try:
        ffmpeg = require_binary("ffmpeg", "brew install ffmpeg")
    except FFmpegError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

    args.output.parent.mkdir(parents=True, exist_ok=True)
    vf = (
        f"scale={args.width}:{args.height}:force_original_aspect_ratio=increase,"
        f"crop={args.width}:{args.height},format=yuv420p"
    )
    cmd = [
        ffmpeg, "-y",
        "-i", str(args.input),
        "-vf", vf,
        "-r", str(args.fps),
        "-c:v", "libx264",
        "-preset", args.preset,
        "-crf", str(args.crf),
        "-c:a", "aac",
        "-b:a", "192k",
        "-movflags", "+faststart",
        str(args.output),
    ]
    try:
        run(cmd, timeout=3600)
    except FFmpegError as e:
        print(f"ERROR encoding: {e}", file=sys.stderr)
        return 1

    print(f"[encode_final] OK -> {args.output}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
