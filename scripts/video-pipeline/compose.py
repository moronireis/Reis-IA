#!/usr/bin/env python3
"""Step 6b — Compose B-roll overlays onto a captioned clip via ffmpeg filter_complex.

Reads the manifest from broll_fetch.py and overlays the FIRST file of each insertion
onto the main clip between clip_start and clip_end, with 0.3s fade in/out.

Usage:
    python compose.py --input clip_01_captioned.mp4 --manifest broll_manifest.json \
        --output clip_01_with_broll.mp4
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from lib.ffmpeg_helpers import FFmpegError, require_binary, run


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Overlay B-roll clips onto a main video.")
    p.add_argument("--input", type=Path, required=True)
    p.add_argument("--manifest", type=Path, required=True)
    p.add_argument("--output", type=Path, required=True)
    p.add_argument("--width", type=int, default=1080)
    p.add_argument("--height", type=int, default=1920)
    p.add_argument("--fade", type=float, default=0.3)
    return p.parse_args()


def build_filter(
    insertions: list[dict],
    width: int,
    height: int,
    fade: float,
) -> tuple[str, list[str]]:
    """Return (filter_complex string, list of -i input files)."""
    inputs: list[str] = []
    chains: list[str] = []
    last_label = "0:v"

    for idx, ins in enumerate(insertions, start=1):
        files = ins.get("files") or []
        if not files:
            continue
        broll = files[0]
        start = float(ins["clip_start"])
        end = float(ins["clip_end"])
        dur = max(0.1, end - start)
        fade_d = min(fade, dur / 3)

        input_idx = len(inputs) + 1  # 0 is the main video
        inputs.append(broll)
        bv_label = f"bv{idx}"
        out_label = f"v{idx}"

        chains.append(
            f"[{input_idx}:v]scale={width}:{height}:force_original_aspect_ratio=increase,"
            f"crop={width}:{height},"
            f"fade=t=in:st=0:d={fade_d:.2f},"
            f"fade=t=out:st={max(0, dur - fade_d):.2f}:d={fade_d:.2f},"
            f"setpts=PTS-STARTPTS+{start:.3f}/TB[{bv_label}]"
        )
        chains.append(
            f"[{last_label}][{bv_label}]overlay=enable='between(t,{start:.3f},{end:.3f})':x=0:y=0[{out_label}]"
        )
        last_label = out_label

    filter_complex = ";".join(chains) if chains else ""
    return filter_complex, inputs, last_label


def main() -> int:
    args = parse_args()
    if not args.input.exists():
        print(f"ERROR: input not found: {args.input}", file=sys.stderr)
        return 1
    if not args.manifest.exists():
        print(f"ERROR: manifest not found: {args.manifest}", file=sys.stderr)
        return 1

    try:
        ffmpeg = require_binary("ffmpeg", "brew install ffmpeg")
    except FFmpegError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

    manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
    insertions = manifest.get("insertions") or []
    usable = [i for i in insertions if i.get("files")]

    args.output.parent.mkdir(parents=True, exist_ok=True)

    if not usable:
        print("[compose] WARN: no usable B-roll — copying input to output.", file=sys.stderr)
        cmd = [ffmpeg, "-y", "-i", str(args.input), "-c", "copy", str(args.output)]
        try:
            run(cmd, timeout=600)
        except FFmpegError as e:
            print(f"ERROR: {e}", file=sys.stderr)
            return 1
        return 0

    filter_complex, inputs, last_label = build_filter(usable, args.width, args.height, args.fade)

    cmd = [ffmpeg, "-y", "-i", str(args.input)]
    for bfile in inputs:
        cmd.extend(["-i", bfile])
    cmd.extend([
        "-filter_complex", filter_complex,
        "-map", f"[{last_label}]",
        "-map", "0:a?",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "20",
        "-c:a", "copy",
        str(args.output),
    ])

    try:
        run(cmd, timeout=3600)
    except FFmpegError as e:
        print(f"ERROR composing: {e}", file=sys.stderr)
        return 1

    print(f"[compose] OK — {len(usable)} overlays -> {args.output}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
