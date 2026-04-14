# Video Pipeline — OSS Recipe (Stack 3)

Last updated: 2026-04-14
Owner: video-editor-director (plans) + integration-engineer (executes)
Status: **Documented. Not yet installed or executed.** Installation and script generation pending explicit go-ahead from Moroni.

---

## Purpose

This recipe is the single source of truth for REIS [IA]'s OSS-first video editing pipeline. It replaces paid tools end-to-end:

| Paid tool | OSS replacement | Cost |
|-----------|------------------|------|
| Opus Clip | Whisper transcript + Claude/clip-cutter scoring (fallback: Supoclip) | $0 |
| Submagic | Whisper + ffmpeg + libass (ASS subtitles burned in) | $0 |
| Descript (edit-by-transcript UX) | Not replaced — not needed for current workflow | — |
| Runway B-roll generation | Pexels API + Pixabay API (free tier) | $0 |
| ElevenLabs voice | Not used in this phase | — |

**Total Stack 3 cost: $0/month.**

---

## 1. Stack Components

### Core
- **Whisper** — transcription. Two viable options:
  - `openai-whisper` (Python, reference implementation): `pip install -U openai-whisper`
  - `whisper.cpp` (C++, much faster on Apple Silicon): `brew install whisper-cpp`
  - Preferred on macOS Darwin 25.3 (Apple Silicon): **whisper.cpp** for speed.
- **ffmpeg** — cutting, encoding, subtitle burn-in, overlay compositing.
- **libass** — ASS/SSA subtitle renderer (bundled with ffmpeg when built with `--enable-libass`).
- **yt-dlp** — for pulling videos from URLs (YouTube, Vimeo, etc.).

### Optional / Fallback
- **Supoclip** (`FujiwaraChoki/supoclip`) — OSS clip-scoring pipeline. Only used when clip-cutter's native scoring is not wanted.

### APIs (free tiers)
- **Pexels API** — 200 requests/hour, unlimited downloads. Requires free API key.
- **Pixabay API** — free tier, ~5000 requests/hour. Requires free API key.

---

## 2. Install Instructions (macOS Apple Silicon)

Run in terminal — **only when Moroni says to install**:

```bash
# Core binaries
brew install ffmpeg whisper-cpp yt-dlp

# Optional: Python whisper if whisper.cpp model support is insufficient
python3 -m venv ~/.venvs/reis-video
source ~/.venvs/reis-video/bin/activate
pip install -U openai-whisper

# Download a whisper.cpp model (medium recommended for PT-BR)
mkdir -p ~/.whisper-models
cd ~/.whisper-models
curl -L -o ggml-medium.bin https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-medium.bin

# Inter font (for ASS subtitle rendering) — already likely installed, but ensure
brew install --cask font-inter

# Environment variables (document in .env.local, do NOT commit)
# PEXELS_API_KEY=...
# PIXABAY_API_KEY=...
```

**Verification**:
```bash
ffmpeg -version | head -1
whisper-cpp --help | head -1
yt-dlp --version
```

---

## 3. End-to-End Pipeline

### Step 1 — Transcribe

Input: `input.mp4` (or URL to pull with yt-dlp first).

```bash
# If source is a URL, pull first
yt-dlp -f "bestvideo[height<=1080]+bestaudio/best" -o "input.%(ext)s" "$URL"

# Transcribe with whisper.cpp (word-level timestamps)
whisper-cpp \
  -m ~/.whisper-models/ggml-medium.bin \
  -f input.mp4 \
  -l pt \
  -ml 1 \
  -oj \
  -of transcript
# Produces transcript.json with word-level timing
```

Hand off `transcript.json` to **clip-cutter** for scoring.

### Step 2 — Score clips

`clip-cutter` (Claude agent) reads `transcript.json` and returns:

```json
{ "clips": [ { "start": 127.40, "end": 168.92, ... }, ... ] }
```

**Fallback**: if Supoclip is enabled, run Supoclip instead and normalize its output to the same JSON shape.

### Step 3 — Cut segments with ffmpeg

Fast-path (no re-encode, keyframe-aligned):
```bash
ffmpeg -ss 127.40 -to 168.92 -i input.mp4 -c copy clip_01_raw.mp4
```

Precise-path (re-encode, sample-accurate):
```bash
ffmpeg -ss 127.40 -to 168.92 -i input.mp4 \
  -c:v libx264 -preset fast -crf 18 \
  -c:a aac -b:a 192k \
  clip_01_raw.mp4
```

Use precise-path when the fast-path lands on a bad keyframe.

### Step 4 — Generate ASS subtitle

`caption-broll-operator` (Claude agent) reads the clip's transcript slice and emits `clip_01.ass` (inline file content — integration-engineer saves it to disk).

### Step 5 — Burn-in subtitles

```bash
ffmpeg -i clip_01_raw.mp4 \
  -vf "ass=clip_01.ass" \
  -c:v libx264 -preset medium -crf 20 \
  -c:a copy \
  clip_01_captioned.mp4
```

### Step 6 — Insert B-roll

`caption-broll-operator` emits a B-roll plan. The integration-engineer:

1. Queries Pexels/Pixabay with the semantic queries
2. Downloads the chosen clips
3. Composites them via ffmpeg `filter_complex` with fades

Example single B-roll overlay (full-frame replacement between 131.2–134.5 of the clip):

```bash
ffmpeg -i clip_01_captioned.mp4 -i broll_01.mp4 \
  -filter_complex "\
    [1:v]scale=1080:1920,setpts=PTS-STARTPTS+3.8/TB[bv]; \
    [0:v][bv]overlay=enable='between(t,3.8,7.1)':x=0:y=0[out]" \
  -map "[out]" -map 0:a \
  -c:v libx264 -preset medium -crf 20 -c:a copy \
  clip_01_with_broll.mp4
```

### Step 7 — Final encode (Reels/Shorts 9:16)

```bash
ffmpeg -i clip_01_with_broll.mp4 \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" \
  -r 30 \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -c:a aac -b:a 192k \
  -movflags +faststart \
  clip_01_final.mp4
```

---

## 4. FFmpeg Recipe Book

### R1 — Burn-in ASS subtitles on 9:16
```bash
ffmpeg -i in.mp4 -vf "ass=subs.ass" -c:v libx264 -crf 20 -c:a copy out.mp4
```

### R2 — Sample-accurate cut with keyframe align
```bash
ffmpeg -ss 00:02:07.400 -to 00:02:48.920 -i in.mp4 \
  -c:v libx264 -preset fast -crf 18 -c:a aac -b:a 192k out.mp4
```

### R3 — B-roll overlay with fade in/out
```bash
ffmpeg -i main.mp4 -i broll.mp4 \
  -filter_complex "\
    [1:v]fade=t=in:st=0:d=0.3,fade=t=out:st=3.0:d=0.3,setpts=PTS-STARTPTS+5.0/TB[bv]; \
    [0:v][bv]overlay=enable='between(t,5.0,8.3)':x=0:y=0[v]" \
  -map "[v]" -map 0:a -c:v libx264 -crf 20 -c:a copy out.mp4
```

### R4 — Convert 16:9 → 9:16 (center crop)
```bash
ffmpeg -i in.mp4 \
  -vf "crop=ih*9/16:ih,scale=1080:1920" \
  -c:v libx264 -crf 20 -c:a copy out.mp4
```

### R5 — Final Reels/Shorts encode
```bash
ffmpeg -i in.mp4 \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,format=yuv420p" \
  -r 30 -c:v libx264 -preset slow -crf 20 \
  -c:a aac -b:a 192k -movflags +faststart out.mp4
```

---

## 5. REIS [IA] Caption Style — ASS Template

Save as `templates/reis-ia-9x16.ass.tpl`. Substitute `{{DIALOGUE_LINES}}`.

```
[Script Info]
Title: REIS IA — 9x16 caption style
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Base,Inter SemiBold,64,&H00FFFFFF,&H00FF904A,&H00000000,&H70000000,0,0,0,0,100,100,0,0,1,3,0,2,60,60,180,1
Style: Impact,Inter Bold,90,&H00FF904A,&H00FFFFFF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,4,0,5,60,60,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
{{DIALOGUE_LINES}}
```

**Color encoding reminder**: ASS uses `&HAABBGGRR&`. `#4A90FF` (RGB) becomes `&H00FF904A&` in ASS (alpha 00, then B=FF, G=90, R=4A).

**Karaoke timing**: `{\k<centiseconds>}word ` — the `\k` tag highlights the word for that duration. caption-broll-operator converts word-level Whisper timestamps into centisecond deltas.

---

## 6. B-roll Query Template

For each B-roll insertion point, caption-broll-operator generates queries like:

**Content**: "A maioria das empresas que nos procura já gastou com AI e não viu retorno."

**Semantic concepts extracted**: wasted investment, stressed executive, financial decline, empty dashboards.

**Pexels queries**:
- `"dark office night executive thinking"`
- `"financial dashboard red declining"`
- `"empty boardroom night"`

**Pixabay queries**:
- `"corporate budget chart down"`
- `"late night work desk"`

**Rules**:
- 2–4 concepts per insertion
- 2–3 queries per API (spread the bet)
- Prefer abstract/ambient over literal
- Avoid stock cliches (handshake, smiling team, generic AI robot)

---

## 7. Known Limitations

- **No edit-by-transcript UX**. This pipeline does not replace Descript's visual edit-by-transcript interface. If that workflow is needed later, evaluate Reduct, Kdenlive plugins, or a custom UI.
- **No AI voice cloning**. ElevenLabs not in scope. Audio stays raw.
- **No true "viral scoring"**. clip-cutter uses language heuristics, not engagement data. Retention predictions are directional, not empirical.
- **Pexels/Pixabay footage is generic**. For premium, branded B-roll, commission custom footage. OSS queries will feel "stocky" sometimes — accept that or do manual curation.
- **whisper.cpp medium model** is ~5% less accurate than Python `large-v3` but ~10x faster. Upgrade to `large-v3` if accuracy becomes a bottleneck.
- **ASS karaoke + very fast speech**: word-by-word reveal can strobe at >4 words/sec. Fall back to phrase-by-phrase for rapid segments.

---

## 8. Next Steps — Integration Activation

When Moroni says **"implemente o Stack 3"**, the integration-engineer should:

1. Run the install block in Section 2
2. Create `scripts/video-pipeline/` with:
   - `01_transcribe.sh` — whisper.cpp wrapper
   - `02_cut.sh` — ffmpeg cutting wrapper that reads clip-cutter JSON
   - `03_caption.sh` — ffmpeg ASS burn-in wrapper
   - `04_broll_fetch.py` — Pexels/Pixabay downloader
   - `05_compose.sh` — ffmpeg filter_complex composer
   - `06_encode_final.sh` — final Reels encode
   - `README.md` — per-script usage with env var requirements
3. Wire each script to accept the JSON contracts defined in `clip-cutter.md` and `caption-broll-operator.md`
4. Add a top-level `run_pipeline.sh` that stitches all steps
5. Add a QA smoke test (hand off to qa-agent): run the pipeline on a 2-minute test video, verify output exists and passes encode validation
6. Document env vars (PEXELS_API_KEY, PIXABAY_API_KEY) and hand off to devops-agent for secret provisioning

Until that signal, this recipe is documentation only. Nothing gets installed, no scripts get written.

---

## 9. File Locations Summary

| Thing | Path |
|-------|------|
| This recipe | `brain/context/video-pipeline-oss-recipe.md` |
| Agent definitions | `.claude/agents/video-editor-director.md`, `clip-cutter.md`, `caption-broll-operator.md` |
| Future scripts | `scripts/video-pipeline/` (not yet created) |
| Future ASS templates | `scripts/video-pipeline/templates/` (not yet created) |
| Whisper models | `~/.whisper-models/` (user home, not in repo) |
| API keys | `.env.local` (not committed) |
