/**
 * Compress and resize frames from /frames/ to /public/video-frames/
 * as small WebP images for the canvas-based video player.
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join } from 'path';

const INPUT_DIR = './frames';
const OUTPUT_DIR = './public/video-frames';
const TARGET_WIDTH = 800; // Resize to 800px wide for web
const QUALITY = 75; // WebP quality

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await readdir(INPUT_DIR))
    .filter(f => f.endsWith('.png'))
    .sort();

  console.log(`Processing ${files.length} frames...`);

  for (let i = 0; i < files.length; i++) {
    const inputPath = join(INPUT_DIR, files[i]);
    const outputName = `frame_${String(i + 1).padStart(4, '0')}.webp`;
    const outputPath = join(OUTPUT_DIR, outputName);

    await sharp(inputPath)
      .resize(TARGET_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    if ((i + 1) % 20 === 0 || i === files.length - 1) {
      console.log(`  Processed ${i + 1}/${files.length}`);
    }
  }

  console.log(`\nDone! ${files.length} frames saved to ${OUTPUT_DIR}`);
}

main().catch(console.error);
