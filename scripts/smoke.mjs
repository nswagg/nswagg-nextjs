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
const routes = ['/', '/mealprep', '/nasa', '/cfagis']
const missingRoutes = ['/a', '/b', '/work', '/projects', '/about', '/contact']

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

    for (const route of [...routes, ...missingRoutes]) {
      const response = await fetch(`${origin}${route}`, { signal: AbortSignal.timeout(10_000) })
      assert.equal(response.status, routes.includes(route) ? 200 : 404, `${label} ${route}`)
      for (const [header, value] of Object.entries(securityHeaders)) {
        assert.equal(response.headers.get(header), value, `${label} ${route}: ${header}`)
      }
      const html = await response.text()
      assert.match(html, /<html/, `${label} ${route}: HTML response`)
      assert.doesNotMatch(html, /mailto:|[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i, `${label} ${route}: public email contact`)
      if (route === '/') {
        for (const title of ['Rock Paper Planes', 'Polygon Drifter', 'Parried', 'From YouTube', 'Outrunning Digital Realism']) {
          assert.ok(html.includes(title), `${label}: missing homepage content ${title}`)
        }
        assert.match(html, /https:\/\/nswagg\.itch\.io\/rock-paper-planes/, `${label}: RPP demo link`)
        assert.match(html, /https:\/\/glacier15\.itch\.io\/parried/, `${label}: collaboration link`)
        assert.match(html, /https:\/\/www\.youtube\.com\/watch\?v=gK-OBEcZZOE/, `${label}: latest curated upload`)
        assert.match(html, /\/icons\/paper-plane\.svg/, `${label}: Paper Plane header mark`)
        assert.match(html, /\/icons\/paper-plane-favicon\.svg/, `${label}: SVG favicon metadata`)
        assert.match(html, /\/icons\/apple-touch-icon\.png/, `${label}: Apple icon metadata`)
        assert.doesNotMatch(html, /\/icons\/N\.png/, `${label}: replaced N header logo`)
        assert.match(html, /<source src="\/videos\/rock-paper-planes-highlight\.mp4" type="video\/mp4"/, `${label}: RPP gameplay source`)
        const previewTag = html.match(/<video\b[^>]*>/)?.[0]
        assert.ok(previewTag, `${label}: gameplay player`)
        for (const attribute of ['controls', 'muted', 'loop', 'playsInline']) {
          assert.match(previewTag, new RegExp(`\\b${attribute}\\b`, 'i'), `${label}: player ${attribute}`)
        }
        assert.match(previewTag, /preload="none"/, `${label}: defer loading until motion preference is checked`)
        assert.match(previewTag, /controlsList="nodownload"/i, `${label}: hide native download option`)
        assert.match(previewTag, /poster="\/images\/projects\/rock-paper-planes-poster\.jpg"/, `${label}: gameplay poster`)
        assert.doesNotMatch(previewTag, /autoplay/i, `${label}: autoplay waits for the visitor's motion preference`)
      }
    }

    if (includeImages) {
      for (const path of ['/icons/paper-plane.png', '/images/projects/parried.png', '/images/projects/rock-paper-planes-poster.jpg']) {
        const response = await fetch(`${origin}/_next/image?url=${encodeURIComponent(path)}&w=640&q=75`, {
          signal: AbortSignal.timeout(10_000),
        })
        assert.equal(response.status, 200, `${label}: ${path} image optimization`)
        assert.match(response.headers.get('content-type'), /^image\//)
        assert.ok((await response.arrayBuffer()).byteLength > 0)
      }
    }
    for (const path of ['/icons/paper-plane.svg', '/icons/paper-plane-favicon.svg', '/icons/favicon-16.png', '/icons/favicon-32.png', '/icons/apple-touch-icon.png', '/favicon.ico']) {
      const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(10_000) })
      assert.equal(response.status, 200, `${label}: ${path}`)
      assert.match(response.headers.get('content-type'), /^image\//, `${label}: ${path} content type`)
      const bytes = Buffer.from(await response.arrayBuffer())
      assert.ok(bytes.length > 0, `${label}: ${path} body`)
      if (path.endsWith('.png')) {
        const size = path.includes('16') ? 16 : path.includes('32') ? 32 : 180
        assert.equal(bytes.readUInt32BE(16), size, `${label}: ${path} PNG width`)
        assert.equal(bytes.readUInt32BE(20), size, `${label}: ${path} PNG height`)
      }
      if (path === '/favicon.ico') {
        assert.equal(bytes.readUInt16LE(2), 1, `${label}: ICO format`)
        assert.equal(bytes.readUInt16LE(4), 3, `${label}: ICO entries`)
        assert.deepEqual([0, 1, 2].map(index => bytes.readUInt8(6 + index * 16)), [16, 32, 48], `${label}: ICO sizes`)
      }
    }
    const clipPath = '/videos/rock-paper-planes-highlight.mp4'
    const clip = await fetch(`${origin}${clipPath}`, { signal: AbortSignal.timeout(10_000) })
    assert.equal(clip.status, 200, `${label}: gameplay MP4`)
    assert.match(clip.headers.get('content-type'), /^video\/mp4/, `${label}: video content type`)
    const clipBytes = Buffer.from(await clip.arrayBuffer())
    assert.ok(clipBytes.length > 0 && clipBytes.length < 3_000_000, `${label}: web clip size`)
    assert.equal(clipBytes.toString('ascii', 4, 8), 'ftyp', `${label}: MP4 format`)
    const range = await fetch(`${origin}${clipPath}`, { headers: { Range: 'bytes=0-1023' }, signal: AbortSignal.timeout(10_000) })
    assert.equal(range.status, 206, `${label}: video seeking`)
    assert.equal(range.headers.get('content-range'), `bytes 0-1023/${clipBytes.length}`, `${label}: video byte range`)
    assert.equal((await range.arrayBuffer()).byteLength, 1024, `${label}: partial video body`)
    console.log(`${label}: ${routes.length} pages, ${missingRoutes.length} expected 404s, homepage content, no public email, security headers, gameplay player and MP4 seeking${includeImages ? ', and image optimization' : ''} passed`)
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
