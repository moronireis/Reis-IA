# REIS [IA] Video Pipeline (Stack 3 — OSS)

100% open-source video editing pipeline for Reels/Shorts: Whisper transcription, heuristic clip scoring, ffmpeg cutting, brand-styled ASS captions, Pexels/Pixabay B-roll, and final 9:16 encoding. Zero recurring cost.

## Install

```bash
# 1. System binary (macOS)
brew install ffmpeg

# 2. Python deps (Python 3.11+ recommended; system 3.9 may work)
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 3. API keys
cp .env.example .env
# edit .env and paste your keys
```

### API keys

- **Pexels** — https://www.pexels.com/api/ (free, 200 req/hour)
- **Pixabay** — https://pixabay.com/api/docs/ (free, ~5000 req/hour)

At least one is required for `broll_fetch.py`. Transcription/cutting/captioning work without any keys.

## Pipeline stages

| # | Script | Input | Output |
|---|--------|-------|--------|
| 1 | `transcribe.py` | mp4/mp3 | transcript.json (word-level timestamps) |
| 2 | `clip-cutter` agent | transcript.json | clips.json |
| 3 | `cut.py` | source.mp4 + clips.json | clip_NN_raw.mp4 |
| 4 | `caption-broll-operator` agent | clip transcript | broll_plan.json + line grouping |
| 5 | `caption.py` | transcript + clip | clip_NN_captioned.mp4 |
| 6a | `broll_fetch.py` | broll_plan.json | broll clips + manifest.json |
| 6b | `compose.py` | captioned clip + manifest | clip_NN_with_broll.mp4 |
| 7 | `encode_final.py` | composed clip | clip_NN_final.mp4 |

## End-to-end example

```bash
# 1. Transcribe
python transcribe.py --input source.mp4 --output out/transcript.json --language pt

# 2. (Hand transcript to clip-cutter agent — produces out/clips.json)

# 3. Cut
python cut.py --input source.mp4 --clips out/clips.json --out-dir out/clips/

# 4. (Hand clip transcripts to caption-broll-operator — produces
#     out/lines_clip_01.json and out/broll_plan_clip_01.json)

# 5. Caption + burn in
python caption.py \
  --transcript out/transcript.json \
  --video out/clips/clip_01_raw.mp4 \
  --output out/captioned/clip_01.mp4 \
  --ass-out out/ass/clip_01.ass

# 6a. Fetch B-roll
python broll_fetch.py \
  --plan out/broll_plan_clip_01.json \
  --out-dir out/broll/ \
  --manifest out/broll/manifest.json

# 6b. Compose
python compose.py \
  --input out/captioned/clip_01.mp4 \
  --manifest out/broll/manifest.json \
  --output out/composed/clip_01.mp4

# 7. Final encode
python encode_final.py \
  --input out/composed/clip_01.mp4 \
  --output out/final/clip_01.mp4
```

## Smoke test

After installing deps, validate the environment:

```bash
python tests/smoke_test.py
```

Fails gracefully with install hints for any missing piece.

## Agent integration

| Agent | Script it drives |
|-------|------------------|
| `video-editor-director` | orchestrates the whole flow, owns the recipe |
| `clip-cutter` | consumes `transcribe.py` output, emits `clips.json` for `cut.py` |
| `caption-broll-operator` | emits `lines_*.json` for `caption.py` and `broll_plan.json` for `broll_fetch.py` |

Recipe source of truth: `brain/context/video-pipeline-oss-recipe.md`.

## Troubleshooting

- **`ffmpeg not found`** — `brew install ffmpeg` (macOS) or `apt install ffmpeg` (Linux).
- **`faster-whisper not installed`** — activate venv, `pip install -r requirements.txt`.
- **`Inter font` missing** — ASS renderer falls back to Arial Bold. Install with `brew install --cask font-inter` for exact brand look.
- **First `transcribe.py` run is slow** — faster-whisper downloads the model (~1.5 GB for `medium`). Subsequent runs cache locally.
- **Pexels/Pixabay returning 0 results** — queries may be too specific. `caption-broll-operator` should broaden (abstract > literal).
- **`.env` not loaded** — `broll_fetch.py` uses a minimal inline loader; make sure there are no quotes or spaces around `KEY=value`.

## Brand tokens in captions

`lib/reis_ass_template.py` encodes the REIS [IA] style:
- Primary: white `#FFFFFF`
- Highlight (karaoke `\k`): REIS blue `#4A90FF` (ASS `&H00FF904A`)
- Outline: black, 3px
- Font: Inter, size 72, bold
- Margin V: 200px (Reels safe zone)
- Alignment: 2 (bottom-center) default, 5 (middle-center) optional

## Security

- `.env` is gitignored. Only `.env.example` is versioned.
- No API keys ever appear in logs.
- All subprocess calls use argv lists — no `shell=True`.
