# BRIEFING — 2026-06-20T00:25:00+02:00

## Mission
Implement required bug fixes, video showcase, hero logo, service/pricing card updates, and E2E selector alignments so that all tests pass.

## 🔒 My Identity
- Archetype: worker
- Roles: implementer, qa, specialist
- Working directory: /Users/iMac21/Downloads/Zulian Social Media Marketing/.agents/worker_implementation_gen3
- Original parent: d545409a-1079-4908-8de1-397a393e3857
- Milestone: Worker Bugfixes and E2E Alignment

## 🔒 Key Constraints
- CODE_ONLY network mode. No external web/network access.
- Write only to own folder `.agents/worker_implementation_gen3/` for metadata.
- Minimal change principle when modifying source code.

## Current Parent
- Conversation ID: d545409a-1079-4908-8de1-397a393e3857
- Updated: not yet

## Task Summary
- **What to build**:
  - Rename `#loader` to `#preloader`, style/class changes, add `#loader-canvas` inside it, fix references. Fix the stray syntax error `});` on line 1632 in `index.html`.
  - Update `src/assets/cinematic.js` to reference `#preloader` or `.loader-overlay`, update `endLoader` callback.
  - Video Showcase section below `#chi-sono` and before `#come-funziona`.
  - Hero logo image inside `#hero`'s container.
  - Services headings & descriptions alignment, class `glass` additions, move dashboard wrapper inside `#servizi`.
  - Revert process section to 4 steps, class `glass`, span step-numbers.
  - Rename pricing section ID to `preventivi`, add `#prezzi` div, class `glass`, change prices, wrap `#navbar` in `<header>`, nav links class `nav-menu`, calendar URLs `?gv=true`.
- **Success criteria**:
  - `npm run build` succeeds.
  - `npx playwright test` succeeds.
- **Interface contracts**: E2E test assertions in `e2e-tests`.
- **Code layout**: Standard Vite project, changes primarily in `index.html` and `src/assets/cinematic.js`.

## Key Decisions Made
- Will verify test cases before implementing anything to understand current failures and structure.

## Artifact Index
- `.agents/worker_implementation_gen3/ORIGINAL_REQUEST.md` — Original request details.
- `.agents/worker_implementation_gen3/BRIEFING.md` — Project briefing file.
