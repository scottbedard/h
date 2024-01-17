import { fileURLToPath } from 'url'
import exec from 'child_process'
import fs from 'fs'
import path from 'path'
import pkg from '../package.json' assert { type: 'json' }

const indexPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/index.ts')

function cli() {
  const src = String(fs.readFileSync(indexPath)).replace('x.y.z', pkg.version)

  fs.writeFileSync(indexPath, src)

  exec.execSync('npm run build && npm publish')
}

cli()
