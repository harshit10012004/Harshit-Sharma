// postbuild.js
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function fixHtmlFiles() {
  // Files to process (source in root, destination in dist)
  const files = [
    { src: 'about.html', dest: 'dist/about.html' },
    { src: 'experience.html', dest: 'dist/experience.html' },
  ]

  // Find the actual hashed CSS file in dist/assets
  const assetsDir = path.join(__dirname, 'dist', 'assets')
  let cssPath = 'style.css' // fallback (unlikely to work)
  try {
    const assetFiles = await fs.readdir(assetsDir)
    const cssFile = assetFiles.find(f => f.startsWith('index-') && f.endsWith('.css'))
    if (cssFile) {
      cssPath = 'assets/' + cssFile
    } else {
      console.warn('⚠️ No hashed CSS file found in dist/assets – using style.css')
    }
  } catch (err) {
    console.warn('⚠️ Could not read assets folder – using style.css')
  }

  for (const file of files) {
    const srcPath = path.join(__dirname, file.src)
    const destPath = path.join(__dirname, file.dest)

    try {
      // Check if source HTML exists
      await fs.access(srcPath)

      // Read the original HTML
      let html = await fs.readFile(srcPath, 'utf-8')

      // Replace the stylesheet link (adjust if your link tag is different)
      // This regex matches <link rel="stylesheet" href="style.css"> (with optional quotes)
      const linkRegex = /<link\s+rel=["']stylesheet["']\s+href=["']style\.css["']\s*>/i
      const newLink = `<link rel="stylesheet" href="/${cssPath}">`

      if (linkRegex.test(html)) {
        html = html.replace(linkRegex, newLink)
        console.log(`✅ Updated CSS link in ${file.src}`)
      } else {
        console.warn(`⚠️ Could not find standard CSS link in ${file.src} – leaving unchanged`)
      }

      // Write the modified HTML to dist
      await fs.writeFile(destPath, html, 'utf-8')
      console.log(`✅ Copied and updated ${file.src} -> ${file.dest}`)

    } catch (err) {
      if (err.code === 'ENOENT') {
        console.warn(`⚠️ Warning: ${file.src} not found – skipping.`)
      } else {
        console.error(`❌ Error processing ${file.src}:`, err)
      }
    }
  }
}

fixHtmlFiles()