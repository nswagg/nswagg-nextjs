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
published. The migration initially left `npm run verify` blocked at the full
audit step. The October 3 CI workaround below supersedes that gate behavior;
the vulnerability remains open and the dependency versions are unchanged.

When a remedy is published, update the compatible Next ESLint package and its
lockfile, check `npm explain braces` and the full live audit, and rerun lint,
build, and smoke tests. Do not treat a package version bump alone as remediation.

Migration follows the [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide).

## Temporary CI workaround, October 3, 2026

The user authorized a workaround while Next's compatible ESLint tooling has no
published remedy. `npm run verify` now runs the audit-policy tests, a strict
production-only audit, the full audit with a narrow exception, dependency-tree
validation, the unchanged ESLint rules, production build, and both server smoke
checks. `npm run audit` still runs the original, unsuppressed full audit.

`scripts/audit-ci.mjs` defers only GHSA-vfj7-8cjw-p6xm and its five affected
packages in the reviewed development chain: eslint-config-next 16.3.8,
@next/eslint-plugin-next 16.3.8, fast-glob 3.3.1, micromatch 4.0.8, and braces
3.0.3. Every installation must remain development-only at its reviewed location,
with no additional consumers. New findings at any severity, changed advisory
identity/range/severity, changed package versions or exposure, malformed reports,
and audit execution/network errors fail verification. No `npm audit fix --force` or
framework downgrade is used.

The exception expires on **November 2, 2026 at 00:00 UTC**. CI records the full
JSON audit in its logs and emits a warning and job-summary entry for the deferral.
The exception permits validation to continue; it does not fix Braces, dismiss
Dependabot alerts, or change commit-signing or repository protection rules.

Risk remains in development tooling if untrusted, deeply nested glob patterns
reach Braces. Next's ESLint plugin uses fast-glob for configured root directories;
this app uses the default root rather than untrusted input. Keep lint/build
tooling separate from public request handling and review any new glob consumers.

Removal: upgrade to a compatible upstream remedy, regenerate the lockfile, require
`npm run audit` to pass without exceptions, remove the reviewed exception, and
rerun `npm run verify`. The strict production audit remains mandatory throughout.

Workaround validation on October 3, 2026: `npm run verify` passed locally with
12 audit-policy tests, zero production audit findings, the explicitly deferred
five-package chain, dependency-tree validation, lint, production build, and both
standard/custom production-server smoke checks. The raw full audit still reports
the unpatched advisory. Remote CI and deployment are pending a signed push.

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
