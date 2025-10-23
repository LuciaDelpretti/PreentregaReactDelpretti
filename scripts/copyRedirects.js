import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.resolve(__dirname, '..', 'public', '_redirects');
const destDir = path.resolve(__dirname, '..', 'dist');
const dest = path.join(destDir, '_redirects');

try {
  if (!fs.existsSync(src)) {
    console.warn('[copyRedirects] source _redirects not found, skipping copy.');
    process.exit(0);
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(src, dest);
  console.log('[copyRedirects] copied _redirects to', dest);
} catch (err) {
  console.error('[copyRedirects] error copying _redirects:', err);
  process.exit(1);
}
