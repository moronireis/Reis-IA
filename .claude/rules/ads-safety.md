# Ads Safety Rules — REIS [IA]

> Used by: traffic-manager, ads-analyst, creative-strategist
> Purpose: Prevent accidental spend, unauthorized changes, and data loss in ad accounts

---

## 1. Campaign Creation

- **ALL campaigns MUST be created in PAUSED status.** No exceptions.
- Never activate a campaign without explicit human approval.
- Always confirm the correct ad account ID before any write operation.
- Use the naming convention: `[Client] [Objective] [Audience] [Creative Type] — [YYYY-MM]`

## 2. Budget Limits

- **Budget changes above R$100/day require explicit human approval.**
- Never set a lifetime budget without human confirmation.
- When increasing budget, never increase by more than 30% in a single change (Meta's recommendation to avoid resetting learning phase).
- Always report current budget AND proposed budget before making changes.

## 3. Destructive Operations

- **NEVER delete campaigns, ad sets, or ads.** Only pause them.
- **NEVER delete audiences or creatives** from the library.
- **NEVER modify campaigns on accounts not explicitly authorized** for the current task.
- Before pausing an active campaign, report its current performance to the user.

## 4. Token & Credential Security

- Access tokens are stored in `.mcp.json` (gitignored) or environment variables.
- **NEVER** log, print, or include access tokens in reports, files, or agent memory.
- **NEVER** commit tokens to git.
- If a token error occurs, report the error type — never the token itself.

## 5. Rate Limiting

- Respect Meta API limits: ~200 calls/hour per ad account.
- Space batch operations (multiple campaigns/ad sets) with reasonable intervals.
- If rate limited (error 17 or 32), wait and retry — never force.

## 6. Logging

- Every write operation (create, update, pause, activate) must be reported with:
  - Timestamp
  - Account ID
  - Object type and ID
  - Change made
  - Who authorized it

## 7. Multi-Account Safety

- When the user has multiple ad accounts, ALWAYS confirm which account before operating.
- Never assume the "default" account — always ask or verify.
- Display account name AND ID for confirmation.

## 8. Learning Phase Protection

- Do not make significant edits to ad sets in learning phase (first 50 conversions or 7 days).
- "Significant edits" = targeting changes, budget changes > 30%, bid strategy changes, creative swaps.
- If an edit is needed during learning, warn the user that it will reset the learning phase.

## 9. Checklist Before Any Write Operation

Before executing any create/update/pause operation, verify:

- [ ] Correct ad account confirmed
- [ ] User authorized this specific action
- [ ] Budget within approved limits
- [ ] Campaign will be created in PAUSED status (if new)
- [ ] No learning phase disruption (if modifying existing)
- [ ] Action logged with details
