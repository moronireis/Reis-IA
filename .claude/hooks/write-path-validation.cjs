#!/usr/bin/env node
// PostToolUse hook for Write|Edit — validates brain/ directory ownership
// WARNING only (exit 0), does NOT block operations

const OWNERSHIP = {
  'brain/research/': 'market-research-analyst',
  'brain/strategy/': 'cmo-strategist',
  'brain/messaging/': 'cmo-strategist',
  'brain/assets/copy/': 'direct-response-copywriter',
  'brain/assets/campaigns/': 'cmo-strategist',
  'brain/context/': 'orchestrator',
};

let input = '';
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const filePath = data.tool_input?.file_path || '';
    const cwd = data.cwd || '';

    // Normalize to relative path
    const relative = filePath.startsWith(cwd)
      ? filePath.slice(cwd.length).replace(/^\//, '')
      : filePath;

    // Check if writing to a brain/ directory
    for (const [dir, owner] of Object.entries(OWNERSHIP)) {
      if (relative.startsWith(dir)) {
        // We cannot reliably detect the current agent in PostToolUse
        // So we output a context reminder about ownership
        const result = {
          hookSpecificOutput: {
            hookEventName: 'PostToolUse',
            additionalContext: `[Ownership Notice] "${dir}" is owned by ${owner}. Verify you have authority to write here per CLAUDE.md File Ownership table.`,
          },
        };
        process.stdout.write(JSON.stringify(result));
        break;
      }
    }
  } catch (e) {
    // Silent fail — do not disrupt workflow
  }
  process.exit(0);
});
