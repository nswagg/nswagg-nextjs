import assert from 'node:assert/strict'
import { test } from 'node:test'
import { deferredAdvisory, evaluateAudit, exceptionExpires } from './audit-ci.mjs'

const reviewDate = new Date('2026-10-03T12:00:00Z')

function fixture() {
  const chain = [
    ['eslint-config-next', '16.3.8', '@next/eslint-plugin-next'],
    ['@next/eslint-plugin-next', '16.3.8', 'fast-glob'],
    ['fast-glob', '3.3.1', 'micromatch'],
    ['micromatch', '4.0.8', 'braces'],
    ['braces', '3.0.3'],
  ]
  const report = { auditReportVersion: 2, vulnerabilities: {}, metadata: { vulnerabilities: { total: 5 } } }
  const lockfile = { packages: { '': { devDependencies: { 'eslint-config-next': '^16.3.8' } } } }
  for (const [name, version, dependency] of chain) {
    lockfile.packages[`node_modules/${name}`] = {
      version, dev: true, dependencies: dependency ? { [dependency]: version } : {},
    }
    report.vulnerabilities[name] = {
      name, severity: 'high', nodes: [`node_modules/${name}`],
      via: [dependency || { url: deferredAdvisory, name: 'braces', dependency: 'braces',
        range: '<=3.0.3', severity: 'high' }],
    }
  }
  return { report, lockfile }
}

test('accepts a complete, clean audit, including after the exception expires', () => {
  const { report, lockfile } = fixture()
  report.vulnerabilities = {}
  report.metadata.vulnerabilities.total = 0
  assert.deepEqual(evaluateAudit(report, lockfile, new Date('2027-01-01')), { deferred: [], blocking: [] })
})

test('defers the five reviewed packages caused by the single advisory', () => {
  const { report, lockfile } = fixture()
  const result = evaluateAudit(report, lockfile, reviewDate)
  assert.equal(result.deferred.length, 5)
  assert.deepEqual(result.blocking, [])
})

test('blocks unrelated findings, including low-severity development findings', () => {
  const { report, lockfile } = fixture()
  report.vulnerabilities.other = { name: 'other', severity: 'low', via: ['unknown'], nodes: ['node_modules/other'] }
  report.metadata.vulnerabilities.total++
  assert.deepEqual(evaluateAudit(report, lockfile, reviewDate).blocking, ['other'])
})

test('blocks a new advisory on the already deferred Braces package', () => {
  const { report, lockfile } = fixture()
  report.vulnerabilities.braces.via.push({ url: 'https://github.com/advisories/GHSA-new' })
  assert.deepEqual(evaluateAudit(report, lockfile, reviewDate).blocking, ['braces'])
})

test('blocks changed advisory metadata and inherited vulnerability sources', () => {
  for (const change of [
    report => { report.vulnerabilities.braces.via[0].url = 'https://github.com/advisories/GHSA-new' },
    report => { report.vulnerabilities.braces.via[0].range = '<=4.0.0' },
    report => { report.vulnerabilities.braces.severity = 'critical' },
    report => { report.vulnerabilities.micromatch.via = ['another-vulnerable-package'] },
  ]) {
    const { report, lockfile } = fixture()
    change(report)
    assert.ok(evaluateAudit(report, lockfile, reviewDate).blocking.length > 0)
  }
})

test('blocks additional or relocated installations', () => {
  const { report, lockfile } = fixture()
  report.vulnerabilities.braces.nodes.push('node_modules/another/node_modules/braces')
  assert.deepEqual(evaluateAudit(report, lockfile, reviewDate).blocking, ['braces'])
})

test('invalidates the entire exception when a reviewed package enters production', () => {
  const { report, lockfile } = fixture()
  delete lockfile.packages['node_modules/braces'].dev
  assert.equal(evaluateAudit(report, lockfile, reviewDate).blocking.length, 5)
})

test('invalidates the exception when reviewed versions change', () => {
  const { report, lockfile } = fixture()
  lockfile.packages['node_modules/@next/eslint-plugin-next'].version = '16.3.9'
  assert.equal(evaluateAudit(report, lockfile, reviewDate).blocking.length, 5)
})

test('invalidates the exception if another package uses the vulnerable chain', () => {
  for (const dependencyType of ['dependencies', 'optionalDependencies', 'peerDependencies']) {
    const { report, lockfile } = fixture()
    lockfile.packages['node_modules/new-consumer'] = { dev: true, [dependencyType]: { micromatch: '^4.0.8' } }
    assert.equal(evaluateAudit(report, lockfile, reviewDate).blocking.length, 5)
  }
  const { report, lockfile } = fixture()
  lockfile.packages[''].devDependencies.braces = '^3.0.3'
  assert.equal(evaluateAudit(report, lockfile, reviewDate).blocking.length, 5)
})

test('rejects an incomplete inherited vulnerability chain', () => {
  const { report, lockfile } = fixture()
  delete report.vulnerabilities.braces
  report.metadata.vulnerabilities.total--
  assert.equal(evaluateAudit(report, lockfile, reviewDate).blocking.length, 4)
})

test('expires at the specified boundary and fails closed on an invalid clock', () => {
  const { report, lockfile } = fixture()
  assert.equal(evaluateAudit(report, lockfile, new Date(Date.parse(exceptionExpires) - 1)).blocking.length, 0)
  assert.equal(evaluateAudit(report, lockfile, new Date(exceptionExpires)).blocking.length, 5)
  assert.equal(evaluateAudit(report, lockfile, new Date('invalid')).blocking.length, 5)
})

test('rejects audit service errors, incomplete reports, and unsupported formats', () => {
  const { report, lockfile } = fixture()
  for (const invalid of [undefined, {}, { ...report, auditReportVersion: 1 },
    { ...report, error: { code: 'ENOTFOUND' } }, { ...report, vulnerabilities: [] },
    { ...report, metadata: {} }, { ...report, metadata: { vulnerabilities: { total: 0 } } }]) {
    assert.throws(() => evaluateAudit(invalid, lockfile, reviewDate))
  }
  assert.throws(() => evaluateAudit(report, {}, reviewDate))
})
