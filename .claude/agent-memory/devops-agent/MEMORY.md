# Memory Index

Created 2026-04-14 as part of Phase A foundation.

## Starting context — Deploy conventions (do not drift from these)
- `reis-ia-hub`: ALWAYS `npm run deploy` — updates BOTH `reis-ia-hub.vercel.app` AND `hub-reisia.vercel.app`.
- `reis-ia-marketing`: manual `vercel --prod` only. Does NOT auto-deploy from git.
- `reis-ia-website`: localhost-only so far — verify with Moroni before first prod deploy.
- `reis-ia-brand`: localhost-only so far.
- `reis-ia-funnels`: initialized, no deploy target yet.

## Git safety (strict, no exceptions)
- Never push to main without explicit approval.
- Never force-push, `reset --hard`, `--no-verify`, `--no-gpg-sign`, or modify git config.
- Always create new commits; never amend.
- When a hook fails, fix the root cause — do not bypass.

## Deploy gate
- qa-agent verdict BLOCK = no deploy. No exceptions.
