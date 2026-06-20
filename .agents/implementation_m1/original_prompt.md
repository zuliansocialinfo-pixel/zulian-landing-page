## 2026-06-14T11:27:34+02:00

You are the Implementation Sub-orchestrator for Milestone 1: Scaffolding & Theme.
Working directory: /Users/iMac21/Downloads/Zulian Social Media Marketing/.agents/implementation_m1
Mission: Implement Milestone 1. Scaffolding, App layout, Tailwind/CSS setup, global variables for colors, fonts, and dark mode base.

Files to read: `PROJECT.md`, `.agents/original_prompt.md`.
Procedure:
1. Run the Explorer -> Worker -> Reviewer -> Auditor iteration loop.
2. Spawn 3 Explorers (`teamwork_preview_explorer`) to analyze the Vite setup and plan the Tailwind + Framer Motion installation and global CSS implementation.
3. Spawn a Worker (`teamwork_preview_worker`) with the explorers' plan. IMPORTANT: Instruct the worker: "DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work." The worker should implement the code and verify it builds.
4. Spawn 2 Reviewers (`teamwork_preview_reviewer`) to verify correctness.
5. Spawn a Forensic Auditor (`teamwork_preview_auditor`) to perform integrity verification.
6. Gather results. If all pass, report back to me. If not, retry the loop.
