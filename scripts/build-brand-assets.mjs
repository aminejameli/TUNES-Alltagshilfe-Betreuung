// Derives favicons and raster logos from the Figma-exported SVGs in src/assets/brand.
// Usage: node scripts/build-brand-assets.mjs
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const brand = "src/assets/brand";
const mark = await readFile(`${brand}/logo-mark.svg`, "utf8");
const lockup = await readFile(`${brand}/logo-lockup.svg`, "utf8");

// Favicon SVG: same geometry, lighter house outline when the browser UI is dark.
const iconSvg = mark
  .replace("<svg ", "<svg ")
  .replace(
    /(<svg[^>]*>)/,
    `$1\n<style>@media (prefers-color-scheme: dark){.ink{stroke:#EEF3F6}}</style>`,
  )
  .replace('stroke="#174B70"', 'class="ink" stroke="#174B70"');
await writeFile("src/app/icon.svg", iconSvg);

const onWarmWhite = (svg, size, pad) =>
  sharp({
    create: { width: size, height: size, channels: 4, background: "#F7F8F4" },
  }).composite([
    { input: Buffer.from(svg.replace(/width="\d+" height="\d+"/, `width="${size - pad * 2}" height="${size - pad * 2}"`)), top: pad, left: pad },
  ]);

await onWarmWhite(mark, 180, 18).png().toFile("src/app/apple-icon.png");

// favicon.ico containing a single 32×32 PNG (ICO allows embedded PNG data).
const png32 = await sharp(Buffer.from(mark.replace(/width="\d+" height="\d+"/, 'width="32" height="32"')))
  .png()
  .toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png32.length, 8);
entry.writeUInt32LE(22, 12);
await writeFile("src/app/favicon.ico", Buffer.concat([header, entry, png32]));

// Logo files for structured data and press use.
await writeFile("public/brand/tunes-logo.svg", lockup);
await writeFile("public/brand/tunes-mark.svg", mark);
await sharp(Buffer.from(lockup.replace('width="398" height="88"', 'width="796" height="176"')))
  .flatten({ background: "#FFFFFF" })
  .extend({ top: 40, bottom: 40, left: 40, right: 40, background: "#FFFFFF" })
  .png()
  .toFile("public/brand/tunes-logo.png");

console.log("Brand assets written.");
