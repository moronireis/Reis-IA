#!/usr/bin/env python3
"""Step 4-5 — Generate ASS subtitle file and burn it into a clip.

Input formats:
  Mode A — from Whisper transcript JSON (auto-grouping words into lines).
  Mode B — from caption-broll-operator JSON with pre-grouped lines.
            { "lines": [ { "words": [ {"word":"...", "start":1.2, "end":1.5}, ... ] } ] }

Usage:
    # Generate .ass only:
    python caption.py --transcript transcript.json --output clip_01.ass

    # Generate + burn into video:
    python caption.py --transcript transcript.json --video clip_01_raw.mp4 \
        --output clip_01_captioned.mp4 --ass-out clip_01.ass
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from lib.ffmpeg_helpers import FFmpegError, require_binary, run
from lib.reis_ass_template import (
    AssLine,
    AssStyle,
    AssWord,
    build_ass,
    lines_from_whisper_words,
)


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Generate and/or burn-in ASS captions.")
    p.add_argument("--transcript", type=Path, help="Whisper transcript JSON (mode A).")
    p.add_argument("--lines-json", type=Path, help="Pre-grouped lines JSON (mode B).")
    p.add_argument("--video", type=Path, help="Video to burn captions into (optional).")
    p.add_argument("--output", type=Path, required=True, help="Output path (.ass or .mp4).")
    p.add_argument("--ass-out", type=Path, help="Optional intermediate .ass path.")
    p.add_argument("--alignment", type=int, default=2, help="2=bottom, 5=middle.")
    p.add_argument("--font-size", type=int, default=72)
    p.add_argument("--font-name", default="Inter")
    p.add_argument("--max-words-per-line", type=int, default=5)
    return p.parse_args()


def load_lines(args: argparse.Namespace) -> list[AssLine]:
    if args.transcript:
        data = json.loads(args.transcript.read_text(encoding="utf-8"))
        words = data.get("words") or []
        if not words:
            raise SystemExit("ERROR: transcript has no words array.")
        return lines_from_whisper_words(words, max_words_per_line=args.max_words_per_line)

    if args.lines_json:
        data = json.loads(args.lines_json.read_text(encoding="utf-8"))
        lines = []
        for raw in data.get("lines", []):
            line = AssLine(words=[
                AssWord(text=str(w["word"]).strip(), start=float(w["start"]), end=float(w["end"]))
                for w in raw.get("words", [])
                if str(w.get("word", "")).strip()
            ])
            if line.words:
                lines.append(line)
        return lines

    raise SystemExit("ERROR: must supply --transcript or --lines-json.")


def main() -> int:
    args = parse_args()
    lines = load_lines(args)
    if not lines:
        print("ERROR: no caption lines produced.", file=sys.stderr)
        return 1

    style = AssStyle(
        font_name=args.font_name,
        font_size=args.font_size,
        alignment=args.alignment,
    )
    ass_text = build_ass(lines, style=style)

    # Decide ass destination.
    burn = bool(args.video)
    if burn:
        ass_path = args.ass_out or args.output.with_suffix(".ass")
    else:
        ass_path = args.output

    ass_path.parent.mkdir(parents=True, exist_ok=True)
    ass_path.write_text(ass_text, encoding="utf-8")
    print(f"[caption] wrote {ass_path}", file=sys.stderr)

    if not burn:
        print(f"[caption] OK — {len(lines)} lines -> {ass_path}", file=sys.stderr)
        return 0

    try:
        ffmpeg = require_binary("ffmpeg", "brew install ffmpeg")
    except FFmpegError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

    args.output.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        ffmpeg, "-y",
        "-i", str(args.video),
        "-vf", f"ass={ass_path}",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "20",
        "-c:a", "copy",
        str(args.output),
    ]
    try:
        run(cmd, timeout=1800)
    except FFmpegError as e:
        print(f"ERROR burning captions: {e}", file=sys.stderr)
        return 1

    print(f"[caption] OK — burned into {args.output}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
