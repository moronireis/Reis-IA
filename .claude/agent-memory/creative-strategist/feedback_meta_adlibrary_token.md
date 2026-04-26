---
name: Meta Ad Library API Token Issue
description: Meta Ad Library API (search_ads_library) returns error 2332002 — requires separate developer consent at facebook.com/ads/library/api before competitor research via API is possible.
type: feedback
---

# Meta Ad Library API Access Issue

**Rule:** Before attempting search_ads_library calls, verify the token has been authorized through the Ad Library API consent flow. The standard meta-ads MCP token (for campaign management) does NOT automatically include Ad Library research access.

**Why:** Error code 2332002 from Meta means the token owner (Moroni) needs to complete the developer opt-in at facebook.com/ads/library/api. This is a one-time setup. Once done, all 5 searches (assessoria de casamento, cerimonialista, planejamento de casamento, assessoria noivas, wedding planner brasil) can be run directly.

**How to apply:** When a user requests competitor ad research via search_ads_library, first check if this token issue has been resolved. If not, use WebSearch + WebFetch to gather competitive intelligence from public sources as fallback. Always disclose the API limitation and provide the fix path.

**Fix:** Moroni needs to visit https://www.facebook.com/ads/library/api and accept the terms with the same Facebook developer account linked to the meta-ads MCP token.
