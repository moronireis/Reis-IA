#!/usr/bin/env python3
"""Batch processor — transcribe, caption, and encode all videos in a directory.

For short-form creatives (Reels/Shorts) that don't need clipping or B-roll.
Pipeline: transcribe (word-level) → generate ASS captions → burn-in → final encode.

Usage:
    python process_batch.py \
        --input-dir ~/Downloads/criativos \
        --output-dir ~/Downloads/criativos/final \
        [--language pt] [--model medium] [--max-words 4] [--font-size 72]

Requires: ffmpeg on PATH or set FFMPEG_PATH env var.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
from pathlib import Path

# Add project root to path for lib imports
sys.path.insert(0, str(Path(__file__).parent))

from lib.ffmpeg_helpers import FFmpegError, run
from lib.reis_ass_template import AssStyle, build_ass, lines_from_whisper_words

VIDEO_EXTS = {".mov", ".mp4", ".mkv", ".avi", ".webm", ".m4v"}

# Resolve ffmpeg/ffprobe paths
FFMPEG = os.environ.get("FFMPEG_PATH", "ffmpeg")
FFPROBE = os.environ.get("FFPROBE_PATH", "ffprobe")


def find_binary(name: str, env_var: str, fallback_paths: list[str]) -> str:
    """Find a binary from env var, PATH, or known fallback locations."""
    from_env = os.environ.get(env_var)
    if from_env and os.path.isfile(from_env):
        return from_env

    import shutil
    on_path = shutil.which(name)
    if on_path:
        return on_path

    for p in fallback_paths:
        if os.path.isfile(p):
            return p

    raise FileNotFoundError(
        f"{name} not found. Set {env_var} env var or install ffmpeg."
    )


def transcribe_video(video: Path, output: Path, model: str, language: str) -> dict:
    """Transcribe with faster-whisper, return JSON with word-level timestamps."""
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        print("ERROR: faster-whisper not installed.", file=sys.stderr)
        sys.exit(1)

    print(f"  [transcribe] {video.name}...", file=sys.stderr)
    wmodel = WhisperModel(model, device="auto", compute_type="int8")
    segments, info = wmodel.transcribe(
        str(video),
        language=language,
        word_timestamps=True,
        vad_filter=True,
    )

    result = {
        "source": str(video),
        "language": info.language,
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
                    "start": round(w.start, 3),
                    "end": round(w.end, 3),
                    "probability": round(w.probability, 3),
                }
                seg_dict["words"].append(word_rec)
                result["words"].append(word_rec)
        result["segments"].append(seg_dict)

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(
        f"  [transcribe] {len(result['words'])} words, {len(result['segments'])} segments",
        file=sys.stderr,
    )
    return result


def generate_and_burn_captions(
    video: Path,
    transcript: dict,
    ass_out: Path,
    video_out: Path,
    ffmpeg: str,
    max_words: int = 4,
    font_size: int = 72,
    alignment: int = 2,
) -> None:
    """Generate ASS captions from transcript and burn into video."""
    words = transcript.get("words", [])
    if not words:
        print(f"  [caption] SKIP — no words for {video.name}", file=sys.stderr)
        return

    lines = lines_from_whisper_words(
        words,
        max_words_per_line=max_words,
        max_line_duration=2.5,
    )

    style = AssStyle(
        font_name="Inter",
        font_size=font_size,
        alignment=alignment,
        margin_v=200,
    )
    ass_text = build_ass(lines, style=style)

    ass_out.parent.mkdir(parents=True, exist_ok=True)
    ass_out.write_text(ass_text, encoding="utf-8")
    print(f"  [caption] {len(lines)} caption lines -> {ass_out.name}", file=sys.stderr)

    # Burn in
    video_out.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        ffmpeg, "-y",
        "-i", str(video),
        "-vf", f"ass={ass_out}",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "20",
        "-c:a", "aac",
        "-b:a", "192k",
        str(video_out),
    ]
    run(cmd, timeout=1800)
    print(f"  [caption] burned -> {video_out.name}", file=sys.stderr)


def final_encode(
    video_in: Path,
    video_out: Path,
    ffmpeg: str,
    width: int = 1080,
    height: int = 1920,
    fps: int = 30,
    crf: int = 20,
) -> None:
    """Final Reels/Shorts encode with faststart."""
    video_out.parent.mkdir(parents=True, exist_ok=True)
    vf = (
        f"scale={width}:{height}:force_original_aspect_ratio=increase,"
        f"crop={width}:{height},format=yuv420p"
    )
    cmd = [
        ffmpeg, "-y",
        "-i", str(video_in),
        "-vf", vf,
        "-r", str(fps),
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", str(crf),
        "-c:a", "aac",
        "-b:a", "192k",
        "-movflags", "+faststart",
        str(video_out),
    ]
    run(cmd, timeout=3600)
    print(f"  [encode] final -> {video_out.name}", file=sys.stderr)


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Batch video pipeline for short-form creatives.")
    p.add_argument("--input-dir", type=Path, required=True, help="Directory with source videos.")
    p.add_argument("--output-dir", type=Path, required=True, help="Output directory.")
    p.add_argument("--language", default="pt", help="Whisper language (default: pt).")
    p.add_argument("--model", default="medium", help="Whisper model size (default: medium).")
    p.add_argument("--max-words", type=int, default=4, help="Max words per caption line.")
    p.add_argument("--font-size", type=int, default=72, help="Caption font size.")
    p.add_argument("--skip-transcribe", action="store_true", help="Skip transcription if JSON exists.")
    p.add_argument("--only", type=str, help="Process only this filename (partial match).")
    return p.parse_args()


def main() -> int:
    args = parse_args()

    if not args.input_dir.is_dir():
        print(f"ERROR: input-dir not found: {args.input_dir}", file=sys.stderr)
        return 1

    # Find ffmpeg
    ffmpeg = find_binary("ffmpeg", "FFMPEG_PATH", [
        "/Users/moronireis/Library/Python/3.9/bin/ffmpeg",
        "/opt/ffmpeg/bin/ffmpeg",
        "/usr/local/bin/ffmpeg",
    ])
    print(f"[batch] Using ffmpeg: {ffmpeg}", file=sys.stderr)

    # Find videos
    videos = sorted([
        f for f in args.input_dir.iterdir()
        if f.suffix.lower() in VIDEO_EXTS and f.is_file()
    ])

    if args.only:
        videos = [v for v in videos if args.only.lower() in v.name.lower()]

    if not videos:
        print("ERROR: no videos found.", file=sys.stderr)
        return 1

    print(f"[batch] Found {len(videos)} videos to process", file=sys.stderr)

    # Create output structure
    out = args.output_dir
    transcripts_dir = out / "transcripts"
    ass_dir = out / "ass"
    captioned_dir = out / "captioned"
    final_dir = out / "final"

    for d in [transcripts_dir, ass_dir, captioned_dir, final_dir]:
        d.mkdir(parents=True, exist_ok=True)

    # Load Whisper model once
    print(f"[batch] Loading Whisper model '{args.model}'...", file=sys.stderr)
    from faster_whisper import WhisperModel
    wmodel = WhisperModel(args.model, device="auto", compute_type="int8")

    results = []
    total = len(videos)

    for idx, video in enumerate(videos, 1):
        stem = video.stem
        print(f"\n[{idx}/{total}] Processing: {video.name}", file=sys.stderr)
        t0 = time.time()

        # Step 1: Transcribe
        transcript_path = transcripts_dir / f"{stem}.json"
        if args.skip_transcribe and transcript_path.exists():
            print(f"  [transcribe] SKIP — using cached {transcript_path.name}", file=sys.stderr)
            transcript = json.loads(transcript_path.read_text(encoding="utf-8"))
        else:
            print(f"  [transcribe] running whisper...", file=sys.stderr)
            segments, info = wmodel.transcribe(
                str(video),
                language=args.language,
                word_timestamps=True,
                vad_filter=True,
            )
            transcript = {
                "source": str(video),
                "language": info.language,
                "duration": info.duration,
                "segments": [],
                "words": [],
            }
            for seg in segments:
                seg_dict = {
                    "id": seg.id, "start": seg.start, "end": seg.end,
                    "text": seg.text, "words": [],
                }
                if seg.words:
                    for w in seg.words:
                        wr = {
                            "word": w.word.strip(),
                            "start": round(w.start, 3),
                            "end": round(w.end, 3),
                            "probability": round(w.probability, 3),
                        }
                        seg_dict["words"].append(wr)
                        transcript["words"].append(wr)
                transcript["segments"].append(seg_dict)
            transcript_path.write_text(
                json.dumps(transcript, ensure_ascii=False, indent=2), encoding="utf-8"
            )
            print(
                f"  [transcribe] {len(transcript['words'])} words",
                file=sys.stderr,
            )

        # Step 2: Generate ASS + burn captions
        ass_path = ass_dir / f"{stem}.ass"
        captioned_path = captioned_dir / f"{stem}_captioned.mp4"

        words = transcript.get("words", [])
        if not words:
            print(f"  [caption] SKIP — no words found", file=sys.stderr)
            continue

        lines = lines_from_whisper_words(
            words,
            max_words_per_line=args.max_words,
            max_line_duration=2.5,
        )
        style = AssStyle(font_size=args.font_size, alignment=2, margin_v=200)
        ass_text = build_ass(lines, style=style)
        ass_path.write_text(ass_text, encoding="utf-8")
        print(f"  [caption] {len(lines)} lines -> {ass_path.name}", file=sys.stderr)

        try:
            run([
                ffmpeg, "-y",
                "-i", str(video),
                "-vf", f"ass={ass_path}",
                "-c:v", "libx264", "-preset", "medium", "-crf", "20",
                "-c:a", "aac", "-b:a", "192k",
                str(captioned_path),
            ], timeout=1800)
        except FFmpegError as e:
            print(f"  [caption] ERROR: {e}", file=sys.stderr)
            continue

        # Step 3: Final encode
        final_path = final_dir / f"{stem}_final.mp4"
        try:
            run([
                ffmpeg, "-y",
                "-i", str(captioned_path),
                "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,format=yuv420p",
                "-r", "30",
                "-c:v", "libx264", "-preset", "slow", "-crf", "20",
                "-c:a", "aac", "-b:a", "192k",
                "-movflags", "+faststart",
                str(final_path),
            ], timeout=3600)
        except FFmpegError as e:
            print(f"  [encode] ERROR: {e}", file=sys.stderr)
            continue

        elapsed = time.time() - t0
        size_mb = final_path.stat().st_size / (1024 * 1024) if final_path.exists() else 0
        results.append({
            "file": video.name,
            "final": str(final_path),
            "words": len(words),
            "caption_lines": len(lines),
            "size_mb": round(size_mb, 1),
            "time_s": round(elapsed, 1),
        })
        print(
            f"  [done] {size_mb:.1f}MB in {elapsed:.1f}s",
            file=sys.stderr,
        )

    # Summary
    print(f"\n{'='*60}", file=sys.stderr)
    print(f"[batch] COMPLETE — {len(results)}/{total} videos processed", file=sys.stderr)
    for r in results:
        print(f"  {r['file']} -> {r['size_mb']}MB ({r['caption_lines']} caption lines)", file=sys.stderr)

    # Save manifest
    manifest_path = out / "manifest.json"
    manifest_path.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[batch] Manifest -> {manifest_path}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    sys.exit(main())
