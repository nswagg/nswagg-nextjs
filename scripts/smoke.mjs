import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createRequire } from 'node:module'
import { createServer } from 'node:net'
import { setTimeout } from 'node:timers/promises'

const require = createRequire(import.meta.url)
const securityHeaders = {
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
  'x-frame-options': 'DENY',
}
const routes = ['/', '/work', '/projects', '/about', '/contact', '/mealprep', '/nasa', '/cfagis']

async function smokeServer(label, args, includeImages) {
  const reservation = createServer()
  await new Promise((resolve, reject) => {
    reservation.once('error', reject)
    reservation.listen(0, '127.0.0.1', resolve)
  })
  const port = reservation.address().port
  await new Promise((resolve, reject) => reservation.close(error => error ? reject(error) : resolve()))

  const server = spawn(process.execPath, args(port), {
    env: { ...process.env, NODE_ENV: 'production', PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  let logs = ''
  let startupError
  server.on('error', error => { startupError = error })
  server.stdout.on('data', data => { logs += data })
  server.stderr.on('data', data => { logs += data })
  const closed = once(server, 'close')
  const origin = `http://127.0.0.1:${port}`

  try {
    const deadline = Date.now() + 30_000
    while (true) {
      if (startupError) throw startupError
      assert.equal(server.exitCode, null, `${label} exited before startup`)
      try {
        await fetch(origin, { signal: AbortSignal.timeout(1000) })
        break
      } catch {
        assert.ok(Date.now() < deadline, `${label} startup timed out`)
        await setTimeout(250)
      }
    }

    for (const route of [...routes, '/a', '/b']) {
      const response = await fetch(`${origin}${route}`, { signal: AbortSignal.timeout(10_000) })
      assert.equal(response.status, routes.includes(route) ? 200 : 404, `${label} ${route}`)
      for (const [header, value] of Object.entries(securityHeaders)) {
        assert.equal(response.headers.get(header), value, `${label} ${route}: ${header}`)
      }
      assert.match(await response.text(), /<html/, `${label} ${route}: HTML response`)
    }

    if (includeImages) {
      const response = await fetch(`${origin}/_next/image?url=%2Ficons%2FN.png&w=64&q=75`, {
        signal: AbortSignal.timeout(10_000),
      })
      assert.equal(response.status, 200, `${label}: image optimization`)
      assert.match(response.headers.get('content-type'), /^image\//)
      assert.ok((await response.arrayBuffer()).byteLength > 0)
    }
    console.log(`${label}: ${routes.length} pages, /a and /b 404s, security headers${includeImages ? ', and image optimization' : ''} passed`)
  } catch (error) {
    console.error(logs)
    throw error
  } finally {
    server.kill()
    await closed
  }
}

await smokeServer('Next production server', port => [
  require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(port),
], true)
await smokeServer('Custom production server', () => ['server.js'], false)
