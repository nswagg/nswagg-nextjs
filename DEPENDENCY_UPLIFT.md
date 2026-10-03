# Dependency security uplift

## Scope and baseline

This pass upgrades the app and traces vulnerabilities through its full npm tree,
including development and optional packages. It does not deploy production or
dismiss GitHub alerts.

Discovery on October 2, 2026:

- Checkout: `codex/gpt-assist` at `7432429`, carried into
  `codex/dependency-security-uplift` to preserve existing app work.
- GitHub default branch: `v2.0` at
  `e18fa6e57584acdcd4ef2326204e09bdd5c00534`. This checkout differs from that
  branch; the final integration must account for both histories.
- Live GitHub Dependabot: 42 open alerts. These describe the default branch,
  not this local feature branch.
- Live npm audit: 8 affected packages (1 critical, 6 high, 1 moderate), with
  482 total dependencies reported before remediation.
- An initial restricted offline audit returned zero findings. Discard that
  result; successful access to the advisory service is required.

## Recursive remediation loop

1. Reproduce the checkout with `npm ci`. Record the branch, Node version,
   `npm audit --offline=false --json`, and authenticated Dependabot findings.
2. Trace each affected package with `npm explain <package>` or
   `npm ls <package> --all`. Inspect source imports, build configuration,
   scripts, and active routes before calling a direct dependency unused.
3. Remove unused direct packages. Upgrade required parents to published patched
   releases. Refresh transitive packages within compatible ranges. Use an
   override only when a required parent cannot resolve a compatible patch,
   and record the parent path, reason, and removal condition.
4. Run `npm run verify`: live audit at every severity (with only the documented,
   temporary Braces development exception described in `TAILWIND_MIGRATION.md`),
   full dependency tree,
   lint, production build, and route/header/image smoke checks. An execution
   failure or unavailable advisory service does not count as a passing check.
5. If findings remain, return to step 2 for the newly resolved tree. Stop when
   all checks pass, or document a package without a usable fix and its specific
   blocker. Do not use `npm audit fix --force` to skip compatibility review.
6. Review the app in a preview deployment, then integrate the reviewed change
   into the production/default branch. Recheck Dependabot after GitHub rescans
   the merged lockfile. A clean local audit does not close default-branch alerts.

## Package decisions

| Package or group | Decision | Evidence |
| --- | --- | --- |
| `next`, `eslint-config-next` | Upgrade together to 16.3.8 | Live registry metadata and the September security release. |
| `react`, `react-dom` | Upgrade together to 19.3.0 | Published stable versions satisfy Next's React peer range. |
| Root `sharp` 0.32.6 | Remove | No source/config/script imports it; Next supplies its own image optimizer dependency. Smoke-test `/_next/image`. |
| `mapbox-gl` | Keep and update within major 3 | `/cfagis` imports and constructs a Mapbox map. Being absent from navigation does not make a route inactive. |
| Headless UI, Heroicons | Keep | `/nasa` uses Disclosure and icons for its mobile legend. |
| ESLint and its Next config | Move to development dependencies | Used for validation rather than application rendering. Still included in the security audit. |
| PostCSS, Autoprefixer, Tailwind | Move to development dependencies; retain Tailwind 3 | Required by the CSS build. Keep dev packages installed during the build. Tailwind 4 is a separate styling migration. |
| Transitive packages | Refresh compatible versions | Audit identified brace-expansion, Browserslist, baseline-browser-mapping, js-yaml, nanoid, and PostCSS paths. No overrides required by the first updated tree. |

## Compatibility and regression checks

- Remove the pass-through Webpack hook so Next 16 can use default Turbopack.
- Replace the Webpack-only `!mapbox-gl` import with `mapbox-gl`.
- Replace `next lint` and the legacy ESLint config with the ESLint CLI and
  Next's flat Core Web Vitals config.
- Keep the custom server available. Smoke-test all eight app routes and all
  four security headers through both standard and custom production servers.
  `/a` and `/b` have no corresponding pages, so the expected result is 404.
- Validate real raster image optimization after removing root Sharp.
- Add pull-request and selected branch checks in
  `.github/workflows/dependency-checks.yml`; it runs `npm ci` and
  `npm run verify` on Node 22 with read-only repository permissions.

## Integration and remaining work

- The existing untracked `SECURITY_REMEDIATION_PLAN.md` contains historical
  August findings. Its original content is preserved and linked to this pass.
- The old GitHub Pages workflow still invokes removed `next export`. Decide
  whether to retire that legacy deployment or implement and verify static
  export separately. This uplift does not change the hosting model.
- Browser interaction, Mapbox credentials/WebGL, and Vercel Preview must be
  checked before deployment. HTTP smoke checks verify server rendering only.
- ESLint 9 emits an upstream end-of-support warning. Live registry checks
  confirm the current React, import, and JSX accessibility plugins accept
  ESLint 9 but not 10. Retain 9.39.5 for compatibility and revisit 10 when
  these plugins support it; do not bypass incompatible peers.

## Sources

- [Next.js September 2026 security release](https://nextjs.org/blog/september-2026-security-release)
- [Next.js 16 migration guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js ESLint configuration](https://nextjs.org/docs/app/api-reference/config/eslint)
- [Live repository Dependabot alerts](https://github.com/nswagg/nswagg-nextjs/security/dependabot)

## Validation results

Validated on October 2, 2026 with Node 22.17.1 and npm 10.9.2:

| Check | Result |
| --- | --- |
| `npm ci --no-fund` | Passed; clean install reproduced the lockfile. |
| `npm run verify` | Passed, exit code 0. |
| Live `npm run audit` | Zero known vulnerabilities, down from 8 affected packages. |
| `npm ls --all` | Passed; no invalid or missing required dependencies. Platform-specific optional packages and unused optional peers may be listed as unmet. |
| `npm run lint` | Passed using the flat ESLint configuration. |
| `npm run build` | Passed with Next 16.3.8 and Turbopack; all app pages prerendered. |
| `npm run smoke` | Passed: eight pages, four security headers, and `/a` and `/b` 404s through both production servers; raster image optimization through the standard server. |
| `git diff --check` | Passed. |
| Remote CI, browser interactions, Vercel Preview | Not run. Workflow is added locally; no commit, push, merge, or deployment occurred. |

Next resolves Sharp 0.35.5 and PostCSS 8.5.23. The build's direct PostCSS
is 8.5.28. Other patched resolutions include brace-expansion 1.1.21/5.0.12,
js-yaml 4.3.2, nanoid 3.3.19, Browserslist 4.29.3,
baseline-browser-mapping 2.11.27, `@humanfs/node` 0.16.8, and
postcss-selector-parser 6.1.4. Mapbox updated to 3.32.0 and no longer resolves
protocol-buffers-schema in this tree. No overrides were added.

The live GitHub snapshot remains a separate baseline: 42 open alerts against
the default branch, including 30 Next alerts. Recheck after reviewed integration;
local verification alone does not remediate the deployed/default branch.

## Night Notebook integration check

The homepage implementation starts from committed uplift `f6a186d` on
`codex/night-notebook`. `package.json` and `package-lock.json` are unchanged;
Next 16.3.8, React 19.3.0, and the patched transitive resolutions are retained.

The current checkout contains four app pages: `/`, `/mealprep`, `/nasa`, and
`/cfagis`. The inherited smoke list included absent `/work`, `/projects`,
`/about`, and `/contact` pages. Those now have explicit expected 404 checks,
along with `/a` and `/b`, rather than requiring unimplemented routes.
The four headers expected by the existing tests are now configured through
`security-headers.js`, shared by Next and the custom production server.

Revalidated on October 2, 2026:

- `npm ci --no-fund`: passed and reproduced the committed lockfile.
- `npm run verify`: passed with live online audit, zero vulnerabilities,
  dependency tree, lint, production build, and both server smoke checks.
- Smoke checks cover homepage content, absence of public email contact in
  returned HTML, four pages, six expected 404s, all four security headers,
  and Paper Plane/Parried raster image optimization.
- Local production browser checks: desktop and 320px layouts, loaded project
  artwork and all three YouTube thumbnails, keyboard carousel navigation,
  correct video destinations, disabled boundary controls, and text-only writing.
- No new dependencies, commit, push, merge, or deployment. Live default-branch
  Dependabot findings have not been rechecked by this design implementation.

Paper Plane branding revalidated on October 3, 2026:

- Lint, production build, and both production server smoke checks passed.
- SVG/PNG icons and the 16/32/48px ICO are served correctly; favicon and Apple
  touch icon metadata are present. PNG dimensions and ICO entries are checked.
- Header mark loads at 1280px and 320px widths with no horizontal overflow;
  browser warning/error logs are empty. Actual 16px and 32px assets were inspected.
- Package manifests and the security uplift remain unchanged.

## Gameplay video and merge validation, October 3, 2026

The RPP hero now uses a five-second silent gameplay clip and a poster frame.
The 23.5 MB source is encoded as a 1.9 MB 720p H.264 MP4 with fast-start metadata.
Playback remains user initiated, with native controls and looping. Smoke tests
check player markup, poster optimization, MP4 delivery, and byte-range seeking
through both production servers.

The fresh full audit reports seven high-severity affected packages from
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), a newly
reviewed recursion/stack-exhaustion advisory in `braces` through 3.0.3. The npm
registry's latest release is 3.0.3 and the advisory lists no patched version.
The installed path runs through Tailwind's build tooling and the lint toolchain.
`npm audit --omit=dev --offline=false` reports zero vulnerabilities. No forced
Tailwind major upgrade or Next ESLint downgrade was applied; those changes do
not remove every affected path and require separate migration validation.

This supersedes the earlier zero-finding full-audit snapshot. `npm run verify`
currently fails at its audit step, so the dependency CI check will fail until
this upstream issue is remediated. The audit requirement is retained.

Other checks passed: dependency-tree validation, lint, production build, and
both server smoke tests. Browser checks confirmed five-second H.264 playback,
looping, pause controls, poster rendering, and no horizontal overflow at 320px.
Browser warning/error logs were empty.

The later Tailwind 4 migration removes its Braces path. The targeted October 3
CI exception in [TAILWIND_MIGRATION.md](./TAILWIND_MIGRATION.md) supersedes the
blocking audit behavior above. It retains the raw audit, reports the remaining
ESLint-only advisory, and lets application validation proceed under a narrow,
expiring exception. All other findings and audit execution failures still block.
