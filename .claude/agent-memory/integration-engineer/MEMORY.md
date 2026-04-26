# Memory Index

Created 2026-04-14 as part of Phase A foundation. Updated 2026-04-22 (Stack 4).

## Starting context
- Stack: REIS [IA] ecosystem. Existing infra includes Resend (transactional), Supabase self-hosted (weirdpigeon-supabase.cloudfy.live), Evolution API (WhatsApp), Vercel hosting.
- Preferred for new work: FastMCP 3.0 for Python MCP servers, `@modelcontextprotocol/sdk` for TypeScript.

## Stack 4 — Meta Ads (2026-04-22)
- MCP installed: `meta-ads` (@getscaleforge/mcp-meta-ads) — 32 tools, Graph API v24.0, MIT. Configured in `.mcp.json` (gitignored).
- Plugin installed: `claude-ads` (AgriciDaniel/claude-ads v1.5.1) — 250+ audit checks.
- Replaced original plan of using pipeboard-co/meta-ads-mcp (required separate Pipeboard account). ScaleForge MCP uses direct META_ACCESS_TOKEN — simpler, no middleman.
- Token: User Access Token with 12 permissions. Future: migrate to System User token (non-expiring) via Business Manager.
- 4 ad accounts connected: Moroni Reis, Noiva S/A, Agente Lucrativo, Leo Soares 3.
- Stack 1 (competitive intelligence via Ad Library API) still blocked — official API only returns political ads in 2026. Apify decision pending.
