# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier2/application-load.spec.ts >> Application Load (Preloader) - Tier 2 >> T1.2.4: Verify page loading with hash URL (/#chi-sono) is blocked until preloader finishes, then section is accessible
- Location: e2e-tests/tier2/application-load.spec.ts:41:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at /Users/iMac21/Library/Caches/ms-playwright/webkit-2287/pw_run.sh
╔════════════════════════════════════════════════════════════╗
║ Looks like Playwright was just installed or updated.       ║
║ Please run the following command to download new browsers: ║
║                                                            ║
║     npx playwright install                                 ║
║                                                            ║
║ <3 Playwright Team                                         ║
╚════════════════════════════════════════════════════════════╝
```