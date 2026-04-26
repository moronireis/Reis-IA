---
name: Output Path Authority — brain/research/
description: analysis-agent must verify orchestrator explicitly delegated the output path before writing to brain/research/; that directory is owned by market-research-analyst
type: feedback
---

Context summaries and briefing files are analysis-agent's deliverable, but `brain/research/` is owned by `market-research-analyst` per CLAUDE.md.

**Rule:** Before writing to `brain/research/`, confirm the orchestrator task instruction explicitly names that output path. If yes, the write is authorized under delegation. If the task instruction is ambiguous, prefer `brain/context/` as a neutral output location and flag the path choice in the response.

**Why:** A PostToolUse hook flagged this after writing `00-context-summary.md` to `brain/research/competitors/noiva-sa/`. The write was justified by explicit orchestrator instruction and prior precedent in that directory, but the systemic rule still applies.

**How to apply:** Check task instruction for an explicit output path before writing to any owned directory. If path is missing, default to `brain/context/` or ask the orchestrator to confirm.
