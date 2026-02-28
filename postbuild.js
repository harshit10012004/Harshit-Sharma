// postbuild.js
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function copyHtmlFiles() {
  const files = [
    { src: 'about.html', dest: 'dist/about.html' },
    { src: 'experience.html', dest: 'dist/experience.html' },
  ]

  for (const file of files) {
    const srcPath = path.join(__dirname, file.src)
    const destPath = path.join(__dirname, file.dest)

    try {
      // Check if source exists
      await fs.access(srcPath)
      // Copy file
      await fs.copyFile(srcPath, destPath)
      console.log(`✅ Copied ${file.src} to ${file.dest}`)
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.warn(`⚠️  Warning: ${file.src} not found – skipping.`)
      } else {
        console.error(`❌ Error copying ${file.src}:`, err)
      }
    }
  }
}

copyHtmlFiles()