#!/bin/bash
# Ollama Query Bridge for Claude Code
# Usage: ollama-query.sh <model> <prompt> [context_file]
#
# Models available:
#   qwen2.5-coder:7b  — Code tasks (read, explain, generate, format)
#   reis-ops           — Operational planning in PT-BR
#   reis-strategy      — Strategic planning in PT-BR
#   llama3             — General purpose
#
# Examples:
#   ./ollama-query.sh qwen2.5-coder:7b "Explain this function" ./src/utils.ts
#   ./ollama-query.sh reis-ops "Organize these tasks into a plan"
#   ./ollama-query.sh llama3 "Summarize this text"

MODEL="${1:-qwen2.5-coder:7b}"
PROMPT="$2"
CONTEXT_FILE="$3"

if [ -z "$PROMPT" ]; then
  echo "Usage: ollama-query.sh <model> <prompt> [context_file]"
  exit 1
fi

# Ensure Ollama is running
if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
  echo "Starting Ollama..."
  ollama serve &>/dev/null &
  sleep 2
fi

# Build the full prompt with optional file context
FULL_PROMPT="$PROMPT"
if [ -n "$CONTEXT_FILE" ] && [ -f "$CONTEXT_FILE" ]; then
  FILE_CONTENT=$(cat "$CONTEXT_FILE")
  FULL_PROMPT="$PROMPT

--- File: $CONTEXT_FILE ---
$FILE_CONTENT
--- End File ---"
fi

# Query Ollama via API (streaming disabled for clean output)
RESPONSE=$(curl -s http://localhost:11434/api/generate \
  -d "$(jq -n \
    --arg model "$MODEL" \
    --arg prompt "$FULL_PROMPT" \
    '{model: $model, prompt: $prompt, stream: false, options: {temperature: 0.3, num_predict: 2048}}')" \
  2>/dev/null)

# Extract and print response
echo "$RESPONSE" | jq -r '.response // "Error: No response from Ollama"' 2>/dev/null

# Print timing info to stderr
TOTAL_DURATION=$(echo "$RESPONSE" | jq -r '.total_duration // 0' 2>/dev/null)
if [ "$TOTAL_DURATION" != "0" ] && [ "$TOTAL_DURATION" != "null" ]; then
  SECONDS_TAKEN=$(echo "scale=1; $TOTAL_DURATION / 1000000000" | bc 2>/dev/null)
  echo "[Ollama: ${MODEL}, ${SECONDS_TAKEN}s, FREE]" >&2
fi
