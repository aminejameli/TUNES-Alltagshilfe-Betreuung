// Resizes source photos (e.g. freshly generated or client-supplied) into src/assets/images.
// Usage: node scripts/optimize-images.mjs <input-dir>
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inputDir = process.argv[2];
if (!inputDir) {
  console.error("Usage: node scripts/optimize-images.mjs <input-dir>");
  process.exit(1);
}
const outputDir = path.resolve("src/assets/images");

for (const file of await readdir(inputDir)) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const name = file.replace(/\.(png|webp|jpeg)$/i, ".jpg");
  const info = await sharp(path.join(inputDir, file))
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(outputDir, name));
  console.log(`${name}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`);
}
