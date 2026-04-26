"""FFmpeg subprocess helpers. Never uses shell=True."""
from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Sequence


class FFmpegError(RuntimeError):
    """Raised when an ffmpeg/ffprobe invocation fails."""


def require_binary(name: str, install_hint: str) -> str:
    """Return absolute path to a binary or raise with an actionable hint."""
    path = shutil.which(name)
    if not path:
        raise FFmpegError(f"{name} not found on PATH. Install hint: {install_hint}")
    return path


def run(cmd: Sequence[str], *, timeout: int = 600, check: bool = True) -> subprocess.CompletedProcess:
    """Run a subprocess safely. Never uses shell=True."""
    print(f"[run] {' '.join(cmd)}", file=sys.stderr)
    try:
        proc = subprocess.run(
            list(cmd),
            capture_output=True,
            text=True,
            timeout=timeout,
            check=False,
        )
    except subprocess.TimeoutExpired as exc:
        raise FFmpegError(f"Command timed out after {timeout}s: {cmd[0]}") from exc

    if check and proc.returncode != 0:
        sys.stderr.write(proc.stderr)
        raise FFmpegError(
            f"Command failed (exit {proc.returncode}): {cmd[0]}\n{proc.stderr.strip()}"
        )
    return proc


def probe(path: Path) -> dict:
    """Return ffprobe JSON for a media file."""
    ffprobe = require_binary("ffprobe", "brew install ffmpeg")
    proc = run(
        [
            ffprobe,
            "-v", "error",
            "-print_format", "json",
            "-show_format",
            "-show_streams",
            str(path),
        ],
        timeout=60,
    )
    return json.loads(proc.stdout)


def duration_seconds(path: Path) -> float:
    info = probe(path)
    return float(info["format"]["duration"])
