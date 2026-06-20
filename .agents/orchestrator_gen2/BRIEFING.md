# BRIEFING — 2026-06-20T00:17:13+02:00

## Mission
Build the production version of "Zulian Social Media Marketing" website matching all Awwwards-level luxury criteria, premium animations, and zero JavaScript errors.

## 🔒 My Identity
- Archetype: teamwork_preview_orchestrator
- Roles: orchestrator, user_liaison, human_reporter, successor
- Working directory: /Users/iMac21/Downloads/Zulian Social Media Marketing/.agents/orchestrator_gen2
- Original parent: main agent
- Original parent conversation ID: cc4caad0-6faf-4f63-912e-d9775b319baf

## 🔒 My Workflow
- **Pattern**: Project Pattern
- **Scope document**: /Users/iMac21/Downloads/Zulian Social Media Marketing/PROJECT.md
1. **Decompose**: Decompose the task into milestones:
   - Milestone 1: Theme & Global Styling
   - Milestone 2: Premium Preloader & Hero
   - Milestone 3: Core Sections & Trust
   - Milestone 4: High-Ticket Pricing & Footer
   - Milestone 5: Final Integration & E2E Pass
2. **Dispatch & Execute** (pick ONE):
   - **Direct (iteration loop)**: Iterate: Explorer -> Worker -> Reviewer -> Challenger -> Forensic Auditor -> Gate.
   - **Delegate (sub-orchestrator)**: Spawn a sub-orchestrator for the implementation milestones and E2E testing track.
3. **On failure** (in this order):
   - Retry: nudge stuck agent or re-send task
   - Replace: spawn fresh agent with partial progress
   - Skip: proceed without (only if non-critical)
   - Redistribute: split stuck agent's remaining work
   - Redesign: re-partition decomposition
   - Escalate: report to parent (sub-orchestrators only, last resort)
4. **Succession**: Self-succeed at spawn count 16. Spawn successor, soft handoff.
- **Work items**:
  - M1: Theme & Global Styling [pending]
  - M2: Premium Preloader & Hero [pending]
  - M3: Core Sections & Trust [pending]
  - M4: High-Ticket Pricing & Footer [pending]
  - M5: Final Integration & E2E Pass [pending]
- **Current phase**: 1
- **Current focus**: Verification of the codebase, running the existing E2E tests via a worker, and analyzing gaps.

## 🔒 Key Constraints
- Never write, modify, or create source code files directly.
- Never run build/test commands yourself.
- If Forensic Auditor reports INTEGRITY VIOLATION, fail milestone immediately.
- Never reuse a subagent after it has delivered its handoff.

## Current Parent
- Conversation ID: cc4caad0-6faf-4f63-912e-d9775b319baf
- Updated: not yet

## Key Decisions Made
- Initial assessment of files shows `index.html` is the primary static layout file loading GSAP and cinematic.js, and that Vite is configured to serve/build it.
- Decided to run the E2E tests first using a worker to identify which tests pass/fail.

## Team Roster
| Agent | Type | Work Item | Status | Conv ID |
|-------|------|-----------|--------|---------|
| init_explorer | teamwork_preview_explorer | Run E2E tests and inspect codebase | completed | 7246b039-b377-403c-8b74-52059ab9d00f |
| impl_worker | teamwork_preview_worker | Implement fixes, features, and E2E alignment | pending | 3082df0c-5781-41a7-9eba-858d734d7f42 |

## Succession Status
- Succession required: no
- Spawn count: 2 / 16
- Pending subagents: [3082df0c-5781-41a7-9eba-858d734d7f42]
- Predecessor: none
- Successor: not yet spawned

## Active Timers
- Heartbeat cron: task-75
- Safety timer: none

## Artifact Index
- /Users/iMac21/Downloads/Zulian Social Media Marketing/PROJECT.md — Global index, milestones, interfaces
- /Users/iMac21/Downloads/Zulian Social Media Marketing/TEST_INFRA.md — E2E test infra and strategy
