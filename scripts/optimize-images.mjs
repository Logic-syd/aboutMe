import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const images = path.join(root, 'public/images');
const originals = (await readdir(path.join(images, 'personal')))
  .filter(name => /\.(jpe?g|png)$/i.test(name)).map(name => `personal/${name}`);
for (const name of await readdir(images)) {
  if (/\.png$/i.test(name) && (await stat(path.join(images, name))).size >= 256 * 1024) originals.push(name);
}

// Display copies only: originals, existing links and privacy redactions stay intact.
const manifest = {};
for (const name of originals.sort()) {
  const source = path.join(images, name);
  const displayName = `optimized/${name.replace(/\.[^.]+$/, '.webp')}`;
  const destination = path.join(images, displayName);
  await mkdir(path.dirname(destination), { recursive: true });
  const result = await sharp(source).autoOrient()
    .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86, effort: 6 }).toFile(destination);
  manifest[`/images/${name}`] = `/images/${displayName}`;
  console.log(`${name}: ${Math.round((await stat(source)).size / 1024)} → ${Math.round(result.size / 1024)} KiB (${result.width}×${result.height})`);
}
await writeFile(path.join(root, 'lib/optimized-images.json'), JSON.stringify(manifest, null, 2) + '\n');
