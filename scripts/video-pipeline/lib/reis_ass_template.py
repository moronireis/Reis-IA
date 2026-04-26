"""REIS [IA] ASS subtitle template with brand tokens.

Color encoding note:
  ASS uses &HAABBGGRR. Our brand blue #4A90FF (RGB) = B:FF G:90 R:4A => &H00FF904A.
  White #FFFFFF => &H00FFFFFF. Black #000000 => &H00000000.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Iterable, List, Sequence


REIS_BLUE_ASS = "&H00FF904A"   # #4A90FF in BGR ASS
WHITE_ASS = "&H00FFFFFF"
BLACK_ASS = "&H00000000"
TRANSPARENT_BG = "&H00000000"


@dataclass
class AssStyle:
    font_name: str = "Inter"          # Fallback: Arial Bold if Inter missing
    font_size: int = 72
    primary: str = WHITE_ASS
    secondary: str = REIS_BLUE_ASS    # Used by \k karaoke highlight
    outline: str = BLACK_ASS
    back: str = TRANSPARENT_BG
    bold: int = -1                     # -1 = true (ASS convention)
    outline_width: int = 3
    shadow: int = 0
    alignment: int = 2                 # 2 = bottom center, 5 = middle center
    margin_l: int = 60
    margin_r: int = 60
    margin_v: int = 200                # Safe zone for Reels UI
    play_res_x: int = 1080
    play_res_y: int = 1920


@dataclass
class AssWord:
    """A single word with start/end in seconds (from Whisper)."""
    text: str
    start: float
    end: float


@dataclass
class AssLine:
    """A caption line containing multiple words with karaoke timing."""
    words: List[AssWord] = field(default_factory=list)

    @property
    def start(self) -> float:
        return self.words[0].start if self.words else 0.0

    @property
    def end(self) -> float:
        return self.words[-1].end if self.words else 0.0


def _fmt_time(seconds: float) -> str:
    """ASS time format: H:MM:SS.cs (centiseconds)."""
    if seconds < 0:
        seconds = 0
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = seconds - (h * 3600 + m * 60)
    return f"{h:d}:{m:02d}:{s:05.2f}"


def _karaoke_text(line: AssLine) -> str:
    """Render an AssLine as a karaoke-tagged ASS Text field."""
    parts = []
    for w in line.words:
        cs = max(1, int(round((w.end - w.start) * 100)))
        # \k = highlight for cs centiseconds. We reuse SecondaryColour as highlight.
        parts.append(f"{{\\k{cs}}}{w.text}")
    return " ".join(parts)


def build_ass(
    lines: Sequence[AssLine],
    style: AssStyle | None = None,
    *,
    title: str = "REIS [IA] Captions",
) -> str:
    """Return full .ass document as a string."""
    s = style or AssStyle()

    header = (
        "[Script Info]\n"
        f"Title: {title}\n"
        "ScriptType: v4.00+\n"
        f"PlayResX: {s.play_res_x}\n"
        f"PlayResY: {s.play_res_y}\n"
        "WrapStyle: 2\n"
        "ScaledBorderAndShadow: yes\n"
        "\n"
        "[V4+ Styles]\n"
        "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, "
        "OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, "
        "ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, "
        "Alignment, MarginL, MarginR, MarginV, Encoding\n"
        f"Style: Reis,{s.font_name},{s.font_size},{s.primary},{s.secondary},"
        f"{s.outline},{s.back},{s.bold},0,0,0,100,100,0,0,1,{s.outline_width},"
        f"{s.shadow},{s.alignment},{s.margin_l},{s.margin_r},{s.margin_v},1\n"
        "\n"
        "[Events]\n"
        "Format: Layer, Start, End, Style, Name, MarginL, MarginR, "
        "MarginV, Effect, Text\n"
    )

    events: List[str] = []
    for line in lines:
        if not line.words:
            continue
        events.append(
            f"Dialogue: 0,{_fmt_time(line.start)},{_fmt_time(line.end)},"
            f"Reis,,0,0,0,,{_karaoke_text(line)}"
        )

    return header + "\n".join(events) + "\n"


def lines_from_whisper_words(
    words: Iterable[dict],
    *,
    max_words_per_line: int = 5,
    max_line_duration: float = 2.5,
) -> List[AssLine]:
    """Group Whisper word-level timestamps into caption lines.

    Input: iterable of {"word": str, "start": float, "end": float}.
    """
    lines: List[AssLine] = []
    current = AssLine()
    for w in words:
        text = str(w.get("word", "")).strip()
        if not text:
            continue
        aw = AssWord(text=text, start=float(w["start"]), end=float(w["end"]))
        if current.words:
            too_long = (aw.end - current.words[0].start) > max_line_duration
            too_many = len(current.words) >= max_words_per_line
            if too_long or too_many:
                lines.append(current)
                current = AssLine()
        current.words.append(aw)
    if current.words:
        lines.append(current)
    return lines
