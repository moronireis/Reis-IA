import express from "express";
import {
  unstable_v2_createSession,
} from "@anthropic-ai/claude-agent-sdk";

const PORT = 3457;
const DEFAULT_MODEL = "claude-sonnet-4-6";
const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

const BASE_ALLOWED_TOOLS = [
  "Read", "Write", "Edit", "Bash", "Glob", "Grep",
  "Agent", "WebSearch", "WebFetch", "NotebookEdit",
  "mcp__github__create_pull_request", "mcp__github__push_files",
  "mcp__github__create_or_update_file", "mcp__github__create_branch",
  "mcp__github__create_issue", "mcp__github__add_issue_comment",
  "mcp__github__search_code", "mcp__github__list_issues",
];

const DEFAULT_SYSTEM_PROMPT = [
  "Voce esta operando via WhatsApp Bridge para Moroni Reis.",
  "REGRAS CRITICAS:",
  "1. Mantenha contexto TOTAL da conversa. Referencie o que ja foi discutido.",
  "2. Respostas concisas (max 500 palavras) — isso e WhatsApp, nao terminal.",
  "3. Para codigo longo, salve em arquivo e reporte o path.",
  "4. Use o @orchestrator e delegue para agentes especializados quando apropriado.",
  "5. Responda sempre em portugues brasileiro.",
  "6. Quando fizer alteracoes em arquivos, reporte o que mudou de forma resumida.",
].join("\n");

// --- Per-user session store ---
// { [userName]: { session, sessionId, model, lastActivity, messageCount, cwd } }
const sessions = {};

function buildSessionOptions(model, cwd) {
  return {
    model: model || DEFAULT_MODEL,
    cwd: cwd || "/Users/moronireis/Projetos vscode",
    permissionMode: "bypassPermissions",
    allowDangerouslySkipPermissions: true,
    settingSources: ["user", "project", "local"],
    allowedTools: BASE_ALLOWED_TOOLS,
    env: { ANTHROPIC_API_KEY: undefined },
  };
}

function isSessionExpired(userSession) {
  return Date.now() - userSession.lastActivity > SESSION_TTL_MS;
}

async function ensureSession(userName, cwd, systemPrompt) {
  let us = sessions[userName];

  if (us?.session && !isSessionExpired(us)) {
    us.lastActivity = Date.now();
    return us;
  }

  // Close expired session
  if (us?.session) {
    try { us.session.close(); } catch (_) {}
    console.log(`[sidecar][${userName}] Session expired, creating new one`);
  }

  const model = us?.model || DEFAULT_MODEL;
  const session = unstable_v2_createSession(buildSessionOptions(model, cwd));

  us = {
    session,
    sessionId: null,
    model,
    lastActivity: Date.now(),
    messageCount: 0,
    cwd,
  };
  sessions[userName] = us;
  console.log(`[sidecar][${userName}] New session (model: ${model}, cwd: ${cwd})`);

  // Inject system prompt
  const prompt = systemPrompt || DEFAULT_SYSTEM_PROMPT;
  await session.send(prompt);
  for await (const msg of session.stream()) {
    if (msg.session_id) us.sessionId = msg.session_id;
  }
  console.log(`[sidecar][${userName}] System prompt injected, ready`);

  return us;
}

async function collectResponse(stream) {
  let resultText = "";
  let usage = null;
  let cost = null;
  let sid = null;

  for await (const msg of stream) {
    if (msg.session_id) sid = msg.session_id;
    if (msg.type === "result" && msg.subtype === "success") {
      resultText = msg.result || "";
      usage = msg.usage || null;
      cost = msg.total_cost_usd || null;
    }
  }

  return { text: resultText, sessionId: sid, usage, cost };
}

const app = express();
app.use(express.json());

// --- POST /message ---
app.post("/message", async (req, res) => {
  const { message, user, cwd, systemPrompt } = req.body;
  const userName = user || "default";

  if (!message) {
    return res.status(400).json({ error: "message required" });
  }

  try {
    const us = await ensureSession(userName, cwd, systemPrompt);
    await us.session.send(message);
    const result = await collectResponse(us.session.stream());

    if (result.sessionId) us.sessionId = result.sessionId;
    us.messageCount++;

    console.log(
      `[sidecar][${userName}] Response: ${result.text.length} chars | ` +
        `cost: $${(result.cost || 0).toFixed(4)} | ` +
        `usage: ${JSON.stringify(result.usage || {})}`
    );

    res.json({
      response: result.text,
      sessionId: us.sessionId,
      usage: result.usage,
      cost: result.cost,
    });
  } catch (err) {
    console.error(`[sidecar][${userName}] Error:`, err.message);
    // Reset broken session
    const us = sessions[userName];
    if (us?.session) {
      try { us.session.close(); } catch (_) {}
    }
    delete sessions[userName];
    res.status(500).json({ error: err.message });
  }
});

// --- POST /reset ---
app.post("/reset", async (req, res) => {
  const { user } = req.body || {};
  const userName = user || "default";

  const us = sessions[userName];
  if (us?.session) {
    try { us.session.close(); } catch (_) {}
  }
  delete sessions[userName];
  console.log(`[sidecar][${userName}] Session reset`);
  res.json({ status: "reset" });
});

// --- POST /model ---
app.post("/model", async (req, res) => {
  const { model, user } = req.body;
  const userName = user || "default";
  const allowed = ["claude-sonnet-4-6", "claude-opus-4-6"];

  if (!allowed.includes(model)) {
    return res.status(400).json({ error: `Model must be one of: ${allowed.join(", ")}` });
  }

  const us = sessions[userName];
  if (us?.session) {
    try { us.session.close(); } catch (_) {}
  }
  // Preserve model preference, clear session
  sessions[userName] = { ...sessions[userName], session: null, sessionId: null, messageCount: 0, model };
  console.log(`[sidecar][${userName}] Model switched to ${model}`);
  res.json({ status: "model_changed", model });
});

// --- GET / ---
app.get("/", (_req, res) => {
  const userSummary = {};
  for (const [name, us] of Object.entries(sessions)) {
    userSummary[name] = {
      hasSession: !!us.session,
      model: us.model,
      messageCount: us.messageCount,
      lastActivity: new Date(us.lastActivity).toISOString(),
    };
  }
  res.json({ status: "running", sessions: userSummary });
});

app.listen(PORT, () => {
  console.log(`\n[sidecar] Claude Code SDK sidecar on :${PORT}`);
  console.log(`[sidecar] Default model: ${DEFAULT_MODEL}`);
  console.log(`[sidecar] Session TTL: 2h`);
  console.log(`[sidecar] Multi-user support enabled\n`);
});
