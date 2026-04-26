#!/usr/bin/env node
// PreToolUse hook for Write — IDS Protocol advisory for new file creation
// Does NOT block (exit 0), only provides context reminder

const fs = require('fs');

let input = '';
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const filePath = data.tool_input?.file_path || '';

    // Only trigger for NEW file creation (file does not exist yet)
    if (filePath && !fs.existsSync(filePath)) {
      const result = {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'allow',
          additionalContext: `[IDS Protocol] Creating new file: ${filePath}\nBefore creating, verify:\n1. Did you Grep/Glob for similar existing files?\n2. Decision: REUSE / ADAPT / CREATE — with justification?\nLog this decision in your output.`,
        },
      };
      process.stdout.write(JSON.stringify(result));
    }
  } catch (e) {
    // Silent fail — allow execution
  }
  process.exit(0);
});
