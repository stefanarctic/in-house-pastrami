import sharp from "sharp";
import { readdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ASSETS_DIR = "src/assets";
const QUALITY = 85;
const MAX_DIMENSION = 2000;
const IMAGE_EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"]);

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    if (IMAGE_EXTENSIONS.has(extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function convertFile(filePath) {
  const before = (await stat(filePath)).size;
  const input = await readFile(filePath);
  const metadata = await sharp(input).metadata();

  if (metadata.format === "webp") {
    return { filePath, skipped: true, before, after: before };
  }

  let pipeline = sharp(input);

  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  const longestSide = Math.max(width, height);

  if (longestSide > MAX_DIMENSION) {
    pipeline = pipeline.resize({
      width: width >= height ? MAX_DIMENSION : undefined,
      height: height > width ? MAX_DIMENSION : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const targetPath = filePath.replace(/\.(jpe?g|png|webp)$/i, ".webp");
  const tempPath = `${targetPath}.converting`;

  const buffer = await pipeline
    .webp({
      quality: QUALITY,
      effort: 4,
      smartSubsample: true,
    })
    .toBuffer();

  await writeFile(tempPath, buffer);

  if (targetPath !== filePath) {
    await unlink(filePath).catch(() => {});
  } else {
    await unlink(filePath).catch(() => {});
  }

  await rename(tempPath, targetPath);

  const after = buffer.length;
  return { filePath: targetPath, skipped: false, before, after, width, height };
}

const files = await collectFiles(ASSETS_DIR);
let converted = 0;
let skipped = 0;
let failed = 0;
let totalBefore = 0;
let totalAfter = 0;

console.log(`Found ${files.length} image files in ${ASSETS_DIR}\n`);

for (const file of files) {
  try {
    const result = await convertFile(file);

    totalBefore += result.before;
    totalAfter += result.after;

    if (result.skipped) {
      skipped++;
      console.log(`SKIP  ${result.filePath} (already WebP)`);
      continue;
    }

    converted++;
    const saved = result.before - result.after;
    const pct = result.before > 0 ? ((saved / result.before) * 100).toFixed(1) : "0.0";
    console.log(
      `OK    ${result.filePath} | ${formatBytes(result.before)} -> ${formatBytes(result.after)} (-${pct}%)`,
    );
  } catch (error) {
    failed++;
    console.error(`FAIL  ${file}: ${error.message}`);
  }
}

console.log("\n--- Summary ---");
console.log(`Converted: ${converted}`);
console.log(`Skipped:   ${skipped}`);
console.log(`Failed:    ${failed}`);
console.log(`Before:    ${formatBytes(totalBefore)}`);
console.log(`After:     ${formatBytes(totalAfter)}`);
console.log(
  `Saved:     ${formatBytes(totalBefore - totalAfter)} (${totalBefore > 0 ? (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1) : "0.0"}%)`,
);
