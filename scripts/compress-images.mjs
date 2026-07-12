import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'

const ARTIFACTS_DIR = './public/artifacts'
const QUALITY = 75
const MAX_WIDTH = 800

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)))
    } else if (['.jpg', '.jpeg', '.png'].includes(extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }
  return files
}

async function compress() {
  const files = await getFiles(ARTIFACTS_DIR)
  console.log(`Found ${files.length} images to compress...`)

  for (const file of files) {
    const before = (await stat(file)).size
    await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, progressive: true })
      .toFile(file + '.tmp')

    // Replace original
    const { rename } = await import('fs/promises')
    await rename(file + '.tmp', file)

    const after = (await stat(file)).size
    const saved = Math.round((1 - after / before) * 100)
    console.log(`✓ ${file.split('/').pop()} — ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB (${saved}% smaller)`)
  }

  console.log('\nDone! All images compressed.')
}

compress().catch(console.error)
