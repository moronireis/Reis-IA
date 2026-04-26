#!/usr/bin/env python3
"""Step 1 — Transcribe a video/audio file with faster-whisper.

Outputs JSON with word-level timestamps for downstream clip-cutter consumption.

Usage:
    python transcribe.py --input video.mp4 --output transcript.json \
        [--model medium] [--language pt] [--device auto]
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Transcribe media with faster-whisper.")
    p.add_argument("--input", type=Path, required=True, help="Input media file.")
    p.add_argument("--output", type=Path, required=True, help="Output JSON path.")
    p.add_argument(
        "--model",
        default=os.environ.get("WHISPER_MODEL", "medium"),
        help="faster-whisper model size (tiny/base/small/medium/large-v3).",
    )
    p.add_argument("--language", default="pt", help="Language code (default: pt).")
    p.add_argument(
        "--device",
        default=os.environ.get("WHISPER_DEVICE", "auto"),
        help="cpu / cuda / auto.",
    )
    p.add_argument(
        "--compute-type",
        default="int8",
        help="Precision: int8 (CPU), float16 (GPU), float32 (max accuracy).",
    )
    return p.parse_args()


def main() -> int:
    args = parse_args()

    if not args.input.exists():
        print(f"ERROR: input not found: {args.input}", file=sys.stderr)
        return 1

    try:
        from faster_whisper import WhisperModel
    except ImportError:
        print(
            "ERROR: faster-whisper not installed. Run: pip install -r requirements.txt",
            file=sys.stderr,
        )
        return 1

    print(f"[transcribe] loading model={args.model} device={args.device}", file=sys.stderr)
    model = WhisperModel(args.model, device=args.device, compute_type=args.compute_type)

    print(f"[transcribe] transcribing {args.input}", file=sys.stderr)
    segments, info = model.transcribe(
        str(args.input),
        language=args.language,
        word_timestamps=True,
        vad_filter=True,
    )

    out = {
        "source": str(args.input),
        "language": info.language,
        "language_probability": info.language_probability,
        "duration": info.duration,
        "segments": [],
        "words": [],
    }

    for seg in segments:
        seg_dict = {
            "id": seg.id,
            "start": seg.start,
            "end": seg.end,
            "text": seg.text,
            "words": [],
        }
        if seg.words:
            for w in seg.words:
                word_rec = {
                    "word": w.word.strip(),
                    "start": w.start,
                    "end": w.end,
                    "probability": w.probability,
                }
                seg_dict["words"].append(word_rec)
                out["words"].append(word_rec)
        out["segments"].append(seg_dict)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(
        f"[transcribe] OK — {len(out['segments'])} segments, {len(out['words'])} words -> {args.output}",
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
