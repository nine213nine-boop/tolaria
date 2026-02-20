# Code Health Report — Laputa App

**Date:** 2026-02-20
**Branch:** `main`
**Overall Project Score:** 9.33 / 10.0 (Green — up from 9.14)
**Tool:** CodeScene Code Health Analysis (project ID: 76865)
**Previous Report:** 2026-02-20 on `main` — 9.14 / 10.0

---

## Summary

The Laputa App codebase scores **9.33** overall — a further improvement of **+0.19** from the previous report (9.14). The codebase remains solidly in **Green**, driven by the `vault.rs` refactoring (+2.59 to 8.81) and the `frontmatter.rs` refactoring (+2.79 to 9.68, now Green). Five files remain in the Yellow zone, down from six — `frontmatter.rs` has exited Yellow into Green.

| Zone | Score Range | File Count | Description |
|------|------------|------------|-------------|
| Optimal | 10.0 | 8 | Perfect — optimized for human and AI comprehension |
| Green | 9.0 – 9.9 | 15 | High quality, minor issues only |
| Yellow | 4.0 – 8.9 | 5 | Problematic technical debt |
| Red | 1.0 – 3.9 | 0 | — |
| N/A | — | 6 | CSS files (4) and tiny utility files (2) — unsupported by CodeScene |

---

## Refactoring Completed (vault.rs + frontmatter.rs)

The following refactorings were executed on vault.rs and frontmatter.rs, raising both files significantly:

### vault.rs: 6.22 → 8.81 (+2.59)

Refactored in 5 commits across multiple phases:

1. **Extracted `run_git` helper** — Consolidated duplicated git command execution into a single helper function, flattening git functions (`git_changed_files`, `git_uncommitted_new_files`).
2. **Decomposed `parse_md_file`** — Extracted `parse_frontmatter_fields`, `extract_title`, `extract_snippet`, and `extract_relationships` into focused sub-functions. Flattened deep nesting with early returns.
3. **Decomposed `scan_vault_cached`** — Extracted `process_vault_entry`, `collect_vault_entries`, `apply_git_status`, and `build_vault_response` as focused functions.
4. **Split large test assertion blocks** — Broke monolithic assertion blocks into per-field assertions for readability and maintainability.
5. **Converted internal functions to use `&Path`** instead of `&str` for vault/file paths, reducing string-heavy arguments.

All 8 original code smells (3 Bumpy Roads, 4 Deep Nestings, 2 Complex Methods, 2 Large Methods, String-Heavy Args, Large Assertion Blocks) have been resolved. The CodeScene review now reports **zero code smells**.

### frontmatter.rs: 6.89 → 9.68 (+2.79) — Yellow → Green

Refactored in 4 commits:

1. **Flattened `update_frontmatter_content`** — Used early returns and extracted `find_key_line_range` and `build_updated_content` helpers. Eliminated bumpy road (4 bumps) and deep nesting (4 levels).
2. **Simplified `FrontmatterValue::to_yaml_value`** — Extracted `needs_yaml_quoting` predicate, simplified match arms. Reduced cc from 17.
3. **Simplified `format_yaml_key`** — Extracted key-quoting rules into `key_needs_quoting` predicate. Reduced complex conditionals from 5.
4. **Extracted line-parsing helpers** — `line_is_key` and related helpers for clean YAML line detection.

All original code smells (1 Bumpy Road, 1 Deep Nesting, 2 Complex Methods, 4 Complex Conditionals) have been resolved. Only one minor issue remains: **String Heavy Function Arguments** (73% of args are string types).

---

## Change Summary vs Previous Report (Feb 17)

| File | Previous | Current | Delta | Notes |
|------|----------|---------|-------|-------|
| `src/App.tsx` | 7.13 | **9.28** | **+2.15** | Yellow -> Green. Brain Method eliminated via hook extraction |
| `src/components/Inspector.tsx` | 7.49 | **9.02** | **+1.53** | Yellow -> Green. Decomposed into sub-components |
| `src-tauri/src/vault.rs` | 4.80 | **8.81** | **+4.01** | Still Yellow but near-Green. All code smells resolved |
| `src-tauri/src/frontmatter.rs` | 6.89* | **9.68** | **+2.79** | Yellow -> Green. All major smells resolved |
| `src/components/Editor.tsx` | 6.94 | **7.68** | **+0.74** | Still Yellow. DiffView/wikilinks extracted but Editor still too large |
| `src/components/Sidebar.tsx` | 9.02 | **9.14** | +0.12 | Green (stable) |
| `src/components/NoteList.tsx` | 8.11 | **8.05** | -0.06 | Yellow (stable, slight regression) |
| `src/components/QuickOpenPalette.tsx` | 9.55 | **9.55** | = | Green (unchanged) |
| `src-tauri/src/lib.rs` | 9.68 | **9.68** | = | Green (unchanged) |
| `src-tauri/src/main.rs` | 10.0 | **10.0** | = | Optimal (unchanged) |
| `src-tauri/src/git.rs` | 10.0 | **10.0** | = | Optimal (unchanged) |
| `src/components/StatusBar.tsx` | 10.0 | **9.23** | -0.77 | Regression: Optimal -> Green (new features added) |
| `src/mock-tauri.ts` | 10.0 | **9.37** | -0.63 | Regression: Optimal -> Green (new mock data added) |

*frontmatter.rs was extracted from vault.rs; "previous" is its initial score after extraction.

### New Files (not in previous report)

| File | Score | Zone | Notes |
|------|-------|------|-------|
| `src/hooks/useNoteActions.ts` | **7.81** | Yellow | Extracted from App.tsx — still needs decomposition |
| `src/components/AIChatPanel.tsx` | **8.51** | Yellow | New feature — large component |
| `src/components/DynamicPropertiesPanel.tsx` | **9.06** | Green | Extracted from Inspector.tsx |
| `src/components/DiffView.tsx` | **9.09** | Green | Extracted from Editor.tsx |
| `src/utils/frontmatter.ts` | **9.24** | Green | Extracted from Inspector.tsx |
| `src/components/CommitDialog.tsx` | **9.38** | Green | New component |
| `src/hooks/useVaultLoader.ts` | **9.41** | Green | Extracted from App.tsx |
| `src/utils/wikilinks.ts` | **9.53** | Green | Extracted from Editor.tsx |
| `src/hooks/useTheme.ts` | **9.68** | Green | New hook |
| `src/components/EditableValue.tsx` | **10.0** | Optimal | Extracted from Inspector.tsx |
| `src/components/ResizeHandle.tsx` | **10.0** | Optimal | New component |
| `src/components/CreateNoteDialog.tsx` | **10.0** | Optimal | New component |
| `src/components/Toast.tsx` | **10.0** | Optimal | New component |
| `src/utils/typeColors.ts` | **10.0** | Optimal | New utility |
| `src/main.tsx` | **10.0** | Optimal | Entry point |

---

## File-by-File Scores (All 34 Files)

| File | LoC | Score | Zone | Key Issues |
|------|-----|-------|------|------------|
| `src-tauri/src/main.rs` | 6 | **10.0** | Optimal | None |
| `src-tauri/src/git.rs` | 423 | **10.0** | Optimal | None |
| `src/components/EditableValue.tsx` | 167 | **10.0** | Optimal | None |
| `src/components/ResizeHandle.tsx` | 74 | **10.0** | Optimal | None |
| `src/components/CreateNoteDialog.tsx` | 99 | **10.0** | Optimal | None |
| `src/components/Toast.tsx` | 28 | **10.0** | Optimal | None |
| `src/utils/typeColors.ts` | 37 | **10.0** | Optimal | None |
| `src/main.tsx` | 16 | **10.0** | Optimal | None |
| `src-tauri/src/frontmatter.rs` | 279 | **9.68** | Green | String-heavy function arguments (73%) |
| `src-tauri/src/lib.rs` | 80 | **9.68** | Green | String-heavy function arguments |
| `src/hooks/useTheme.ts` | 51 | **9.68** | Green | None significant |
| `src/components/QuickOpenPalette.tsx` | 145 | **9.55** | Green | Complex Method (cc=16) |
| `src/utils/wikilinks.ts` | 68 | **9.53** | Green | None significant |
| `src/hooks/useVaultLoader.ts` | 123 | **9.41** | Green | None significant |
| `src/components/CommitDialog.tsx` | 73 | **9.38** | Green | None significant |
| `src/mock-tauri.ts` | 894 | **9.37** | Green | None significant |
| `src/App.tsx` | 176 | **9.28** | Green | Complex Method: App() cc=16 / 130 LoC |
| `src/utils/frontmatter.ts` | 72 | **9.24** | Green | None significant |
| `src/components/StatusBar.tsx` | 159 | **9.23** | Green | None significant |
| `src/components/Sidebar.tsx` | 208 | **9.14** | Green | None significant |
| `src/components/DiffView.tsx` | 45 | **9.09** | Green | None significant |
| `src/components/DynamicPropertiesPanel.tsx` | 265 | **9.06** | Green | None significant |
| `src/components/Inspector.tsx` | 312 | **9.02** | Green | None significant |
| `src-tauri/src/vault.rs` | 1111 | **8.81** | Yellow | No code smells reported — near Green threshold |
| `src/components/AIChatPanel.tsx` | 364 | **8.51** | Yellow | Complex Method: AIChatPanel() cc=15 / 285 LoC |
| `src/components/NoteList.tsx` | 434 | **8.05** | Yellow | Complex Method: NoteListInner() cc=28 / 208 LoC |
| `src/hooks/useNoteActions.ts` | 280 | **7.81** | Yellow | Bumpy Road, Deep Nesting, Complex Method: useNoteActions() cc=30 / 169 LoC |
| `src/components/Editor.tsx` | 575 | **7.68** | Yellow | **Brain Method**: Editor() cc=61 / 385 LoC, Bumpy Road |
| `src/types.ts` | 38 | N/A | — | Type definitions only |
| `src/lib/utils.ts` | 6 | N/A | — | Utility (too small) |
| `src/App.css` | — | N/A | — | CSS not supported |
| `src/index.css` | — | N/A | — | CSS not supported |
| `src/components/Editor.css` | — | N/A | — | CSS not supported |
| `src/components/EditorTheme.css` | — | N/A | — | CSS not supported |

---

## Technical Debt Hotspots

Based on code health scores, file sizes, and change frequency:

| Priority | File | Score | LoC | Risk Factor |
|----------|------|-------|-----|-------------|
| 1 | `src/components/Editor.tsx` | 7.68 | 575 | **Brain Method** (cc=61, 385 LoC) — worst single function in codebase |
| 2 | `src/hooks/useNoteActions.ts` | 7.81 | 280 | Brain Method (cc=30, 169 LoC), deep nesting in updateMockFrontmatter |
| 3 | `src/components/NoteList.tsx` | 8.05 | 434 | Complex Method (cc=28, 208 LoC) |
| 4 | `src/components/AIChatPanel.tsx` | 8.51 | 364 | Large component (cc=15, 285 LoC) — new, address before it grows |
| 5 | `src-tauri/src/vault.rs` | 8.81 | 1111 | Near-Green, no code smells — minor improvement needed to cross 9.0 |

---

## Detailed Analysis — Files Scoring Below 9.0

### 1. `src/components/Editor.tsx` — Score: 7.68 (Now #1 Priority)

The core `Editor` component function remains a **Brain Method** — the single worst function in the codebase at cc=61 and 385 LoC (3.2x the 120 LoC limit).

**Code Smells Found:**

| Smell | Location | Details | Severity |
|-------|----------|---------|----------|
| Bumpy Road | `Editor` (L154–575) | 2 bumps | High |
| Complex Method | `Editor` (L154–575) | cc = 61 (**Brain Method**) | High |
| Complex Conditional | `Editor:196` | 2 complex expressions | Medium |
| Large Method | `Editor` (L154–575) | 385 LoC (limit: 120) | Medium |

---

### 2. `src/hooks/useNoteActions.ts` — Score: 7.81

Extracted from App.tsx. Contains the `updateMockFrontmatter` function which has deep nesting, plus the `useNoteActions` hook itself is still too large.

**Code Smells Found:**

| Smell | Location | Details | Severity |
|-------|----------|---------|----------|
| Bumpy Road | `updateMockFrontmatter` (L14–66) | 2 bumps | High |
| Deep Nesting | `updateMockFrontmatter` (L14–66) | 4 levels deep | High |
| Complex Method | `useNoteActions` (L93–280) | cc = 30 | Medium |
| Complex Method | `updateMockFrontmatter` (L14–66) | cc = 17 | Medium |
| Complex Method | `deleteMockFrontmatterProperty` (L68–91) | cc = 9 | Medium |
| Large Method | `useNoteActions` (L93–280) | 169 LoC (limit: 70) | Medium |

---

### 3. `src/components/NoteList.tsx` — Score: 8.05

Slightly regressed from 8.11. The `NoteListInner` component and `buildRelationshipGroups` remain complex.

**Code Smells Found:**

| Smell | Location | Details | Severity |
|-------|----------|---------|----------|
| Complex Method | `NoteListInner` (L211–432) | cc = 28 | Medium |
| Complex Method | `buildRelationshipGroups` (L125–188) | cc = 13 | Medium |
| Large Method | `NoteListInner` (L211–432) | 208 LoC (limit: 120) | Medium |
| Overall Code Complexity | File-wide | High mean cyclomatic complexity | Medium |

---

### 4. `src/components/AIChatPanel.tsx` — Score: 8.51

New file (mock AI chat feature). Already showing signs of complexity that should be addressed early.

**Code Smells Found:**

| Smell | Location | Details | Severity |
|-------|----------|---------|----------|
| Complex Method | `AIChatPanel` (L62–364) | cc = 15 | Medium |
| Large Method | `AIChatPanel` (L62–364) | 285 LoC (limit: 120) | Medium |

---

### 5. `src-tauri/src/vault.rs` — Score: 8.81

Dramatically improved from 6.22. The CodeScene review reports **zero code smells** after the refactoring. The file is near the Green threshold (9.0) and may only need minor adjustments to cross it.

---

## Quick Wins (Low Effort, High Impact)

### 1. Decompose `Editor` into hooks (highest ROI)
**File:** `src/components/Editor.tsx` | **Impact:** cc 61 -> ~10 per hook
- Extract `useEditorExtensions()` — all CodeMirror extension setup (themes, keybindings, decorations)
- Extract `useEditorContent()` — content loading, saving, dirty state management
- Extract `useEditorKeymap()` — custom keymap handlers
- The `Editor` component becomes a thin composition + JSX layer

### 2. Decompose `useNoteActions` hook
**File:** `src/hooks/useNoteActions.ts` | **Impact:** cc 30 -> ~8 per hook
- Extract `useFrontmatterSync()` — `updateMockFrontmatter` + `deleteMockFrontmatterProperty`
- Flatten `updateMockFrontmatter` with early returns and helper functions
- Keep `useNoteActions` as pure action dispatch (create, delete, rename)

### 3. Split `NoteListInner` into sub-components
**File:** `src/components/NoteList.tsx` | **Impact:** cc 28 -> ~8 per component
- Extract `NoteListItem` component for individual note rendering
- Extract `RelationshipGroup` component for grouped entries
- Extract `buildRelationshipGroups` to a utility file

### 4. Extract `AIChatPanel` hooks early
**File:** `src/components/AIChatPanel.tsx` | **Impact:** Prevent further complexity growth
- Extract `useChatMessages()` — message state, send/receive logic
- Extract `ChatMessage` component for individual message rendering

### 5. Push `vault.rs` past 9.0
**File:** `src-tauri/src/vault.rs` | **Impact:** 8.81 -> 9.0+
- Minor: reduce string-heavy args further with `&Path` conversions
- Minor: simplify any remaining complex expressions

---

## Path to 9.5 Overall

**Current:** 9.33 (28 scored files, sum = 261.20)
**Target:** 9.5

To reach 9.5, all 5 Yellow files must reach at least 9.5:

| File | Current | Target | Points Needed |
|------|---------|--------|---------------|
| `vault.rs` | 8.81 | 9.5 | +0.69 |
| `Editor.tsx` | 7.68 | 9.5 | +1.82 |
| `useNoteActions.ts` | 7.81 | 9.5 | +1.69 |
| `NoteList.tsx` | 8.05 | 9.5 | +1.45 |
| `AIChatPanel.tsx` | 8.51 | 9.5 | +0.99 |
| **Total points needed** | | | **+6.64** |

**Projected score if all Yellow files reach 9.5:** (261.20 + 6.64) / 28 = **9.57**

**Recommended execution order for maximum impact:**
1. `Editor.tsx` (7.68 -> 9.5) — highest user-facing impact, hook extraction is mechanical
2. `useNoteActions.ts` (7.81 -> 9.5) — extracted hook, straightforward decomposition
3. `NoteList.tsx` (8.05 -> 9.5) — component extraction
4. `AIChatPanel.tsx` (8.51 -> 9.5) — closest to target, prevent drift
5. `vault.rs` (8.81 -> 9.5) — near-Green already, minor tweaks

---

## Refactoring ROI Summary

| File | Current | Target | Defect Reduction | Speed Improvement |
|------|---------|--------|------------------|-------------------|
| `Editor.tsx` | 7.68 | 9.5 | 25–38% | 19–30% |
| `useNoteActions.ts` | 7.81 | 9.5 | 24–36% | 18–28% |
| `NoteList.tsx` | 8.05 | 9.5 | 22–33% | 16–26% |
| `AIChatPanel.tsx` | 8.51 | 9.5 | 18–27% | 13–21% |
| `vault.rs` | 8.81 | 9.5 | 10–18% | 8–14% |

---

## Files in Good Shape

These files need no immediate attention:

**Optimal (10.0):**
- `src-tauri/src/main.rs` — 6 LoC, clean entry point
- `src-tauri/src/git.rs` — 423 LoC, well-structured
- `src/components/EditableValue.tsx` — 167 LoC, clean extracted component
- `src/components/ResizeHandle.tsx` — 74 LoC, simple component
- `src/components/CreateNoteDialog.tsx` — 99 LoC, clean dialog
- `src/components/Toast.tsx` — 28 LoC, minimal component
- `src/utils/typeColors.ts` — 37 LoC, simple utility
- `src/main.tsx` — 16 LoC, entry point

**Green (9.0–9.9):**
- `src-tauri/src/frontmatter.rs` — 9.68 (up from 6.89! Only: string-heavy args)
- `src-tauri/src/lib.rs` — 9.68 (minor: string-heavy args)
- `src/hooks/useTheme.ts` — 9.68 (clean hook)
- `src/components/QuickOpenPalette.tsx` — 9.55 (minor: cc=16)
- `src/utils/wikilinks.ts` — 9.53 (clean utility)
- `src/hooks/useVaultLoader.ts` — 9.41 (clean hook)
- `src/components/CommitDialog.tsx` — 9.38 (clean component)
- `src/mock-tauri.ts` — 9.37 (large but clean)
- `src/App.tsx` — 9.28 (dramatically improved from 7.13)
- `src/utils/frontmatter.ts` — 9.24 (clean utility)
- `src/components/StatusBar.tsx` — 9.23 (slightly regressed from 10.0)
- `src/components/Sidebar.tsx` — 9.14 (stable)
- `src/components/DiffView.tsx` — 9.09 (clean extracted component)
- `src/components/DynamicPropertiesPanel.tsx` — 9.06 (clean extracted component)
- `src/components/Inspector.tsx` — 9.02 (dramatically improved from 7.49)

---

## What Worked Since Last Report

The following refactorings from the Feb 17 recommendations were executed:

1. **App.tsx decomposition** (Plan C) — Extracted `useNoteActions`, `useVaultLoader`, and other hooks. App dropped from cc=56/381 LoC to cc=16/130 LoC. Score: 7.13 -> 9.28.
2. **Inspector.tsx decomposition** (Plan D) — Extracted `DynamicPropertiesPanel`, `EditableValue`, and `frontmatter.ts` utility. Score: 7.49 -> 9.02.
3. **vault.rs full refactoring** (Plan A) — Extracted `run_git` helper, decomposed `parse_md_file` and `scan_vault_cached`, split large assertion blocks, converted to `&Path` args. Score: 4.80 -> 8.81. **All code smells resolved.**
4. **frontmatter.rs full refactoring** (Plan B) — Flattened `update_frontmatter_content`, simplified `to_yaml_value` and `format_yaml_key`, extracted line-parsing helpers. Score: 6.89 -> 9.68. **Yellow -> Green.**
5. **Editor.tsx partial decomposition** (Plan B, Steps 2–3) — Extracted `DiffView.tsx` and `wikilinks.ts`. Score: 6.94 -> 7.68.

## What Still Needs Work

1. **Editor.tsx** — DiffView and wikilinks were extracted, but the core Editor function was NOT decomposed into hooks. It's now the worst function (cc=61, 385 LoC). Hook extraction (useEditorExtensions, useEditorContent, useEditorKeymap) is the next high-impact target.
2. **useNoteActions.ts** — Inherited App.tsx's `updateMockFrontmatter` complexity. Needs decomposition into smaller hooks.
3. **NoteList.tsx** — Slight regression, needs component extraction (NoteListItem, RelationshipGroup).
4. **AIChatPanel.tsx** — New file already showing complexity. Address early before it grows.
5. **vault.rs** — Near-Green at 8.81 with zero code smells. Minor tweaks may push it past 9.0.

---

*Report generated by CodeScene MCP analysis on 2026-02-20. For interactive exploration, visit: https://codescene.io/projects/76865*
*Note: CodeScene MCP Server MCP-0.1.5 was used. Version MCP-0.2.0 is available — consider updating via `brew upgrade cs-mcp`.*
