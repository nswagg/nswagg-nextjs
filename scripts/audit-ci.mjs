import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { appendFileSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const deferredAdvisory = 'https://github.com/advisories/GHSA-vfj7-8cjw-p6xm'
export const exceptionExpires = '2026-11-02T00:00:00Z'

const reviewedChain = {
  'eslint-config-next': { version: '16.3.8', via: '@next/eslint-plugin-next', parent: '' },
  '@next/eslint-plugin-next': { version: '16.3.8', via: 'fast-glob', parent: 'eslint-config-next' },
  'fast-glob': { version: '3.3.1', via: 'micromatch', parent: '@next/eslint-plugin-next' },
  micromatch: { version: '4.0.8', via: 'braces', parent: 'fast-glob' },
  braces: { version: '3.0.3', parent: 'micromatch' },
}

function isReviewedChain(packages) {
  return Object.entries(reviewedChain).every(([name, reviewed]) => {
    const node = packages[`node_modules/${name}`]
    if (node?.dev !== true || node.version !== reviewed.version) return false
    // A new consumer invalidates the reviewed exposure, even at the same version.
    const consumers = Object.entries(packages).filter(([path, entry]) =>
      entry.dependencies?.[name] || entry.optionalDependencies?.[name] || entry.peerDependencies?.[name] ||
        (path === '' && entry.devDependencies?.[name]),
    ).map(([path]) => path)
    const expected = reviewed.parent ? `node_modules/${reviewed.parent}` : ''
    return consumers.length === 1 && consumers[0] === expected
  })
}

/** Only the reviewed, development-only Braces chain may bypass the full audit gate. */
export function evaluateAudit(report, lockfile, now = new Date()) {
  assert.equal(report?.auditReportVersion, 2, 'Missing or unsupported npm audit report')
  assert.ok(!report.error, 'npm audit reported an execution error')
  assert.ok(report.vulnerabilities && typeof report.vulnerabilities === 'object' &&
    !Array.isArray(report.vulnerabilities), 'Missing vulnerability results')
  assert.ok(lockfile?.packages && !Array.isArray(lockfile.packages), 'Missing lockfile packages')
  const findings = Object.entries(report.vulnerabilities)
  assert.equal(report.metadata?.vulnerabilities?.total, findings.length, 'Incomplete npm audit report')
  const canDefer = now.getTime() < Date.parse(exceptionExpires) && isReviewedChain(lockfile.packages) &&
    Object.keys(reviewedChain).every(name => Object.hasOwn(report.vulnerabilities, name))
  const deferred = []
  const blocking = []

  for (const [name, finding] of findings) {
    const reviewed = Object.hasOwn(reviewedChain, name) ? reviewedChain[name] : undefined
    const via = finding?.via
    const knownSource = Array.isArray(via) && via.length === 1 && (name === 'braces'
      ? via[0]?.url === deferredAdvisory && via[0].name === 'braces' &&
        via[0].dependency === 'braces' && via[0].range === '<=3.0.3' && via[0].severity === 'high'
      : via[0] === reviewed?.via)
    const knownNode = finding?.nodes?.length === 1 && finding.nodes[0] === `node_modules/${name}`
    const allowed = canDefer && reviewed && finding.name === name && finding.severity === 'high' &&
      knownNode && knownSource
    if (allowed) deferred.push(name)
    else blocking.push(name)
  }
  return { deferred, blocking }
}

function runAudit() {
  assert.ok(process.env.npm_execpath, 'Run this gate using npm run audit:ci')
  const audit = spawnSync(process.execPath, [process.env.npm_execpath,
    'audit', '--offline=false', '--json', '--audit-level=low'], {
    encoding: 'utf8', timeout: 120_000, maxBuffer: 10 * 1024 * 1024,
  })
  if (audit.error) throw audit.error
  assert.ok(audit.status === 0 || audit.status === 1, `npm audit failed: ${audit.stderr}`)
  // Keep the complete report in CI logs; this is a deferral, not remediation.
  console.log(audit.stdout)
  const report = JSON.parse(audit.stdout)
  const lockfile = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'))
  const { deferred, blocking } = evaluateAudit(report, lockfile)
  assert.equal(audit.status, Object.keys(report.vulnerabilities).length ? 1 : 0,
    'npm audit exit status does not match its report')

  if (deferred.length) {
    const warning = `GHSA-vfj7-8cjw-p6xm deferred in ${deferred.length} reviewed development packages; ` +
      `expires ${exceptionExpires}. ESLint remains enabled. See ${deferredAdvisory}`
    console.warn(warning)
    if (process.env.GITHUB_ACTIONS === 'true') {
      console.log(`::warning title=Temporary Braces exception::${warning}`)
    }
    if (process.env.GITHUB_STEP_SUMMARY) {
      appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n### Dependency audit exception\n\n${warning}\n`)
    }
  }
  assert.equal(blocking.length, 0, `Blocking dependency findings: ${blocking.join(', ')}`)
  console.log('Full dependency audit gate passed with only the explicitly reported deferral, if any.')
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    runAudit()
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
