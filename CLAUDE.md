# CLAUDE.md — Laputa App

## Project
Laputa App is a personal knowledge and life management desktop app, built with Tauri v2 + React + TypeScript + CodeMirror 6. It reads a vault of markdown files with YAML frontmatter and presents them in a four-panel UI inspired by Bear Notes.

## Tech Stack
- **Desktop shell**: Tauri v2 (Rust backend)
- **Frontend**: React 18+ with TypeScript
- **Editor**: CodeMirror 6 (live preview, reveal-on-focus)
- **Build**: Vite
- **Tests**: Vitest (unit), Playwright (E2E), `cargo test` (Rust)
- **Package manager**: pnpm

## Architecture
- `src-tauri/` — Rust backend (file I/O, frontmatter parsing, git ops, filesystem watching)
- `src/` — React frontend
- Vault path is configurable (not hardcoded) — the app works with "a vault at some path"
- All data lives in markdown files with YAML frontmatter, git-versioned
- The app reads/writes these files directly — no database

## Coding Standards
- Rust: use `serde` for serialization, `gray_matter` or similar for frontmatter parsing
- TypeScript: strict mode, functional components, hooks
- Keep components responsive-ready (don't hardcode four-panel layout assumptions)
- Use Context7 MCP to look up current API docs for Tauri v2, CodeMirror 6, etc.

## How to Work

### Approach
- **Small steps**: Build one thing at a time. Get it working, test it, commit it. Then move to the next.
- **Test as you go**: Write tests alongside code, not after. If you build a frontmatter parser, test it immediately with real-world examples before moving on.
- **Verify constantly**: After each meaningful change, run the relevant tests (`cargo test`, `pnpm test`). Don't stack up a bunch of code and hope it all works.
- **Commit often**: Each logical unit of work gets its own commit with a clear message. Not one giant commit at the end.

### Testing
- `pnpm test` runs Vitest (unit tests)
- `cargo test` runs Rust tests
- `pnpm test:e2e` runs Playwright (E2E)
- Every new module should have tests
- Test with realistic data — use real markdown files with YAML frontmatter, not toy examples
- Edge cases matter: empty frontmatter, missing fields, malformed YAML, files with no H1 title

### Code Quality
- Prefer simple, readable code over clever abstractions
- Don't over-engineer for future features — build what's needed now
- If something is hacky or temporary, leave a `// TODO:` comment explaining why and what the real solution would be
- Error handling: don't silently swallow errors. Log them, surface them, or return Result types (Rust)

### Visual Verification (MANDATORY)
Before declaring any milestone or feature complete, you MUST visually verify it works:

1. **Start the dev server**: `pnpm dev` (Vite only, no Tauri needed)
2. **Run Playwright screenshot**: `npx playwright test e2e/screenshot.spec.ts`
3. **Check the screenshot** at `test-results/app-screenshot.png` — does it look right? Are notes showing? Is the layout correct?
4. **Interact and verify**: Write a Playwright test that clicks, navigates, and screenshots the result

The app has a **Tauri mock layer** (`src/mock-tauri.ts`): when running in a browser (not Tauri), it returns realistic test data. This means Playwright and Chrome can test the full UI without the Rust backend.

**Key rule**: passing unit tests ≠ working app. If you can't see it working in a screenshot, it's not done.

### Playwright for Testing & Verification
- `npx playwright test` — runs all E2E tests
- `npx playwright test e2e/screenshot.spec.ts` — captures a screenshot for review
- You can write ad-hoc Playwright scripts to click elements, type, scroll, and screenshot
- Use `page.screenshot({ path: 'test-results/something.png' })` to capture state
- Always screenshot before AND after interactions to verify changes

### When Stuck
- Use Context7 MCP to look up current API docs (Tauri v2, CodeMirror 6, etc.)
- If a dependency doesn't work as expected, check its version and docs before trying workarounds
- If something is genuinely blocked, write what you tried and what failed — don't spin in circles
