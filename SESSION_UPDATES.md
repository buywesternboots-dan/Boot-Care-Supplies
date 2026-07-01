# Session Updates

This file tracks Codex handoff notes so each session can continue without guessing what happened earlier.

## 2026-07-01

- Repository source of truth is now `buywesternboots-dan/Boot-Care-Supplies`.
- The repo was previously referred to as `buywesternboots-dan/cowboy-supply-order`; GitHub now resolves it to the renamed repo.
- Replaced the original static HTML/CSS/JS prototype with a Next.js App Router + Supabase foundation.
- Merged PR #1 into `main` with the real Next/Supabase app structure.
- Vercel project appears connected to the repo and is deploying commits from `main`.
- Removed Reddit as an active login option because Supabase OAuth does not support it as a typed provider in this setup.
- Hardened the order API route type guard and Supabase server cookie handling.
- Current blocker: Vercel production deployments are still failing. The GitHub status links point to Vercel, but private build events require the logged-in Vercel session or token. Next session should retrieve the first red build error lines from Vercel and patch that exact failure.

## Commit Identity Note

The project owner requested that future local Git commits use this email:

`buywesternboots@gmail.com`

When working from a local checkout, set:

```bash
git config user.email "buywesternboots@gmail.com"
```

Commits made through the GitHub connector may use the connected GitHub/App identity because the connector API does not expose a separate author email field.
