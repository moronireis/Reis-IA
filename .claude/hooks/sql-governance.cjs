#!/usr/bin/env node
// PreToolUse hook for Bash — blocks raw SQL DDL commands
// EXIT 2 = BLOCK (prevents execution)

const DDL_PATTERNS = /\b(CREATE\s+TABLE|DROP\s+TABLE|ALTER\s+TABLE|TRUNCATE\s+TABLE|DROP\s+DATABASE|DROP\s+SCHEMA)\b/i;

let input = '';
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const command = data.tool_input?.command || '';

    if (DDL_PATTERNS.test(command)) {
      const result = {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: `[SQL Governance] Direct DDL command detected. Use Supabase migrations or the Supabase MCP server instead of raw SQL. Blocked command fragment: "${command.slice(0, 100)}"`,
        },
      };
      process.stdout.write(JSON.stringify(result));
      process.exit(2);
    }
  } catch (e) {
    // Silent fail — allow execution on parse error
  }
  process.exit(0);
});
