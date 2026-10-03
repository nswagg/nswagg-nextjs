import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const nextRequire = createRequire(require.resolve('next/package.json'))
const sharp = nextRequire('sharp')
const iconPath = name => fileURLToPath(new URL(`../public/icons/${name}`, import.meta.url))
const source = await readFile(iconPath('paper-plane.svg'), 'utf8')
const faviconSource = source.replace('<title>Paper plane</title>', '<title>Paper plane</title><rect width="64" height="64" rx="10" fill="#1a1c2c"/>')

await writeFile(iconPath('paper-plane-favicon.svg'), faviconSource)
await sharp(Buffer.from(source)).resize(512, 512).png().toFile(iconPath('paper-plane.png'))
await sharp(Buffer.from(faviconSource)).resize(180, 180).png().toFile(iconPath('apple-touch-icon.png'))

const sizes = [16, 32, 48]
const images = []
for (const size of sizes) {
  const image = await sharp(Buffer.from(faviconSource)).resize(size, size).png().toBuffer()
  await writeFile(iconPath(`favicon-${size}.png`), image)
  images.push(image)
}

// ICO directory entries point to PNG payloads, keeping the same artwork at each size.
const directory = Buffer.alloc(6 + 16 * images.length)
directory.writeUInt16LE(1, 2)
directory.writeUInt16LE(images.length, 4)
let offset = directory.length
for (let index = 0; index < images.length; index++) {
  const entry = 6 + 16 * index
  directory.writeUInt8(sizes[index], entry)
  directory.writeUInt8(sizes[index], entry + 1)
  directory.writeUInt16LE(1, entry + 4)
  directory.writeUInt16LE(32, entry + 6)
  directory.writeUInt32LE(images[index].length, entry + 8)
  directory.writeUInt32LE(offset, entry + 12)
  offset += images[index].length
}
await writeFile(fileURLToPath(new URL('../src/app/favicon.ico', import.meta.url)), Buffer.concat([directory, ...images]))
console.log('Generated Paper Plane SVG, PNG, Apple touch icon, and 16/32/48px ICO assets.')
