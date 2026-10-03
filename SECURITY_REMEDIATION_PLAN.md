# Security Remediation Plan

## Purpose

Track discovery, decisions, and verification for the Dependabot remediation work. This document intentionally separates the Next.js 16 major upgrade from remaining dependency fixes.

## Current snapshot

- GitHub Dependabot: 40 open alerts, 48 closed alerts.
- `next` accounts for 22 open alerts and is the first remediation target.
- Dependabot security update pull requests are paused by GitHub until a Dependabot pull request is merged or update settings change.
- Current resolved framework package: `next@15.5.20`.
- Latest stable Next.js checked during discovery: `16.3.3`.
- Local Node: `22.17.1`; CI Node: `20`; both meet Next.js 16's Node 20.9 minimum.
- Production domain: `www.nswagg.com` serves from Vercel, verified by public response headers and deployed-page footer.
- Vercel production branch: `v2.0`; current Vercel build runtime: Node 22.
- Previous Next.js 16 preview failed before application compilation because Next 16 selected Turbopack while `next.config.js` declared a `webpack` configuration.

## Discovery findings

| Area | Evidence | Migration impact |
| --- | --- | --- |
| Custom server | `server.js` creates and prepares a Next server, sets response headers, and has two custom route handlers. | Smoke-test production server startup and both custom routes after upgrade. |
| Webpack configuration | `next.config.js` has a custom `webpack` function, currently pass-through. | Next.js 16 defaults to Turbopack; preserve Webpack for first build or remove this no-op configuration after validating no behavior depends on it. |
| Lint script | `package.json` runs `next lint`. | Next.js 16 removes this command; replace with an explicit ESLint CLI command. |
| Static deployment workflow | `.github/workflows/nextjs.yml` builds then runs `next export` for GitHub Pages. | Clarify whether GitHub Pages remains deployed target; a custom Node server cannot run on GitHub Pages, and export behavior must be validated independently. |
| Runtime APIs | Initial source scan found no `cookies()`, `headers()`, `draftMode()`, `params`, or `searchParams` usage. | Re-scan after merge/rebase; Next.js 16 removes synchronous request API compatibility. |
| Image handling | Root `sharp@0.32.6`; Next also supplies an optional newer `sharp`. | Update root `sharp` separately; a Next upgrade alone does not fix root alert exposure. |

## Remediation sequence

### Phase 1: Confirm deployment model

1. Production domain is confirmed on Vercel; inspect Vercel project configuration before the upgrade.
2. Confirm whether GitHub Pages remains a required secondary deployment or is a legacy workflow.
3. If GitHub Pages remains supported, verify static export requirements and ensure server-only behavior is not required there.

**Exit condition:** one documented production deployment path and matching build command.

### Phase 2: Next.js 16 compatibility branch

1. Upgrade `next` and `eslint-config-next` together to an advisory-supported Next.js 16 version.
2. Keep React and React DOM at compatible versions; current React 19.2 line meets Next 16 peer requirements.
3. Replace `next lint` with ESLint CLI.
4. Fix the confirmed prior preview failure: explicitly select Webpack for the first Next 16 build, or remove only the proven no-op Webpack hook. Do not migrate Webpack behavior and framework version in the same unreviewed step.
5. Regenerate `package-lock.json` using supported Node and npm versions.
6. Validate local production build, custom server startup, `/a`, `/b`, image rendering, route navigation, and deployment build.

**Exit condition:** build and production smoke checks pass; all Next-related alerts are rechecked in GitHub.

### Phase 3: Remaining dependency remediation

1. Update root `sharp` and `postcss` using exact fixed versions from their alerts.
2. Inspect dependency paths for `brace-expansion`, `js-yaml`, and `nanoid` with `npm ls`.
3. Prefer upstream package upgrades. Add narrow `overrides` only when an upstream package has no compatible fixed release.
4. Re-run `npm audit`, `npm ls`, build, and deployment verification.

**Exit condition:** every remaining alert is marked fixed, intentionally deferred with a documented reason, or lacks an upstream patch.

## Required validation

- `npm audit`
- `npm ls next sharp postcss brace-expansion js-yaml nanoid --all --omit=optional`
- `npm run build`
- Production server smoke test for `/`, `/a`, and `/b`
- GitHub Pages or Vercel deployment build, according to confirmed deployment model
- Final Dependabot alert review

## Decision log

| Date | Decision | Reason | Owner |
| --- | --- | --- | --- |
| 2026-08-25 | Start with Next.js 16 discovery and compatibility work. | 22 open alerts are attributed to `next`; highest remediation leverage. | Pending |
| 2026-08-25 | Keep Next 16 work separate from other package fixes. | Major framework behavior must remain independently reviewable. | Pending |
| 2026-08-25 | Treat Vercel as current production hosting. | `www.nswagg.com` responds from Vercel; GitHub Pages has not yet been confirmed as a required deployment. | Verified |
| 2026-08-25 | Treat the existing Webpack hook as the first Next 16 blocker. | Vercel's prior Next 16 preview failed because Turbopack detected the `webpack` configuration. | Verified |

## Open questions

1. Is GitHub Pages a required secondary deployment or a legacy workflow to retire?
2. Should the pass preserve Webpack for compatibility or remove the no-op hook after verification?
3. May Dependabot be resumed after remediation, or should it remain paused?

## October 2, 2026 dependency uplift

The August snapshot above is historical. Current discovery, package removals,
the recursive remediation loop, and validation results are tracked in
[DEPENDENCY_UPLIFT.md](./DEPENDENCY_UPLIFT.md). This pass preserves the original
plan and distinguishes local npm findings from default-branch Dependabot alerts.
