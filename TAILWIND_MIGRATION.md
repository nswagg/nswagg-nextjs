# Tailwind 4 migration

Updated October 3, 2026 on `codex/night-notebook`.

- Tailwind and `@tailwindcss/postcss` use 4.3.3. The lockfile records the exact
  dependency tree. Autoprefixer is removed because Tailwind 4 handles prefixing.
- `src/app/globals.css` imports Tailwind and explicitly scans `src`. The old
  JavaScript configuration is replaced by CSS utilities for the existing radial
  and conic gradient names.
- The theme retains the NASA legend's 2px small corner radius, without changing
  its existing embedded map configuration. Legacy components use the v4 names
  for small shadows, hidden outlines, opacity modifiers, and flex shrinking. Navbar
  spacing uses `gap`. Base border colors and button cursors retain v3 behavior.
- Tailwind 4 requires Safari 16.4+, Chrome 111+, or Firefox 128+.

## Remaining ESLint advisory

Next's ESLint configuration remains at 16.3.8 with its existing rules enabled.
Tailwind no longer resolves `braces`. The remaining dependency path is:

`eslint-config-next -> @next/eslint-plugin-next -> fast-glob -> micromatch -> braces`

The full audit reports five high-severity affected packages for the single
[braces recursion advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm),
down from seven before migration. The production-only audit reports zero.
The user chose to retain the current ESLint checks until an upstream remedy is
published. No advisory suppression, audit threshold change, or forced ESLint
downgrade is applied. `npm run verify` and its CI workflow still fail at the full
audit step while this finding is open.

When a remedy is published, update the compatible Next ESLint package and its
lockfile, check `npm explain braces` and the full live audit, and rerun lint,
build, and smoke tests. Do not treat a package version bump alone as remediation.

Migration follows the [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide).

## Validation

- The new lockfile reproduced with `npm ci --no-fund` in a fresh temporary
  directory. The in-place clean install was interrupted by another preview's
  Windows DLL lock; missing local files were restored from that clean install.
- Dependency-tree validation, lint, the standard Turbopack production build,
  and both production server smoke tests passed.
- Meal Prep's desktop padding, heading size, grid, and corner radius match the
  previous build. Mobile Meal Prep and the homepage have no horizontal overflow
  at 320px. The homepage video and branding render correctly.
- The NASA legend expands on mobile and retains its 2px corners and desktop
  breakpoint. Its externally hosted map has independent missing-sprite warnings.
- `/cfagis` returns HTTP 200, but browser map rendering is blocked by a missing
  `NEXT_PUBLIC_MAPBOX_ACCESSTOKEN` in the local build. No map configuration was changed.
