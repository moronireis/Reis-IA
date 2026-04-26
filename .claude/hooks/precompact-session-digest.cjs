#!/usr/bin/env node
// PreCompact hook (async) — saves session state before context compaction
// Preserves continuity across long sessions by writing a digest file

const fs = require('fs');
const path = require('path');

let input = '';
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

    // Determine output directory
    const digestsDir = path.join(projectDir, '.claude', 'session-digests');
    if (!fs.existsSync(digestsDir)) {
      fs.mkdirSync(digestsDir, { recursive: true });
    }

    // Build digest from available metadata
    const digest = {
      timestamp: new Date().toISOString(),
      sessionId: data.session_id || 'unknown',
      trigger: data.trigger || 'unknown',
      contextLength: data.current_context_length || null,
      contextLimit: data.context_limit || null,
    };

    // Try to extract recent context from transcript if available
    let recentContext = [];
    if (data.transcript_path && fs.existsSync(data.transcript_path)) {
      try {
        const transcript = fs.readFileSync(data.transcript_path, 'utf8');
        const lines = transcript.trim().split('\n');
        // Get last 20 lines for context
        const recent = lines.slice(-20);
        recentContext = recent.map((line) => {
          try {
            const parsed = JSON.parse(line);
            if (parsed.role === 'user' || parsed.role === 'assistant') {
              const content = typeof parsed.content === 'string'
                ? parsed.content.slice(0, 200)
                : JSON.stringify(parsed.content).slice(0, 200);
              return { role: parsed.role, preview: content };
            }
            return null;
          } catch {
            return null;
          }
        }).filter(Boolean);
      } catch {
        // Transcript read failed — continue without it
      }
    }

    digest.recentContext = recentContext;

    // Write JSON digest
    const jsonPath = path.join(digestsDir, `digest-${timestamp}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(digest, null, 2));

    // Write markdown summary
    const mdPath = path.join(digestsDir, `digest-${timestamp}.md`);
    const md = [
      `# Session Digest — ${digest.timestamp}`,
      '',
      `**Session**: ${digest.sessionId}`,
      `**Trigger**: ${digest.trigger}`,
      `**Context**: ${digest.contextLength || '?'}/${digest.contextLimit || '?'} tokens`,
      '',
      '## Recent Activity',
      '',
      ...recentContext.map((c) => `- **${c.role}**: ${c.preview}`),
      '',
      '---',
      `Saved at compaction time to preserve session continuity.`,
    ].join('\n');
    fs.writeFileSync(mdPath, md);

    // Clean up old digests (keep last 10)
    const files = fs.readdirSync(digestsDir)
      .filter((f) => f.startsWith('digest-'))
      .sort()
      .reverse();
    const toDelete = files.slice(20); // Keep 20 files (10 pairs of .json + .md)
    for (const f of toDelete) {
      fs.unlinkSync(path.join(digestsDir, f));
    }
  } catch (e) {
    // Silent fail — compaction must not be blocked
  }
  process.exit(0);
});
