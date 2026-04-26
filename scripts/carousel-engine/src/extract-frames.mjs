/**
 * Extract best frames from video files using Playwright
 * Usage: node src/extract-frames.mjs --dir <video-dir> --out <output-dir>
 */

import { chromium } from 'playwright';
import { readdir, mkdir, writeFile } from 'fs/promises';
import path from 'path';

const videoDir = path.resolve(process.argv[3] || process.argv[2]);
const outDir = path.resolve(process.argv[5] || './extracted-frames');

await mkdir(outDir, { recursive: true });

const files = (await readdir(videoDir)).filter(f => /\.(mp4|mov|MP4|MOV)$/i.test(f));
console.log(`Found ${files.length} videos in ${videoDir}`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
const page = await context.newPage();

for (const file of files) {
  const videoPath = path.join(videoDir, file);
  const safeName = file.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.(mp4|MP4|mov|MOV)$/, '');

  console.log(`\nProcessing: ${file}`);

  const html = `<!DOCTYPE html>
<html><head><style>
  * { margin: 0; padding: 0; }
  body { background: #000; display: flex; align-items: center; justify-content: center; width: 1920px; height: 1080px; }
  video { max-width: 1920px; max-height: 1080px; object-fit: contain; }
</style></head><body>
  <video id="v" src="file://${videoPath.split('/').map(s => encodeURIComponent(s)).join('/')}" muted></video>
</body></html>`;

  const tmpHtml = path.join(outDir, '_tmp_video.html');
  await writeFile(tmpHtml, html);
  await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle' });

  // Wait for video to be loadable
  const duration = await page.evaluate(async () => {
    const v = document.getElementById('v');
    return new Promise((resolve, reject) => {
      v.onloadedmetadata = () => resolve(v.duration);
      v.onerror = () => reject('Video load error');
      setTimeout(() => reject('Timeout'), 10000);
    });
  }).catch(e => { console.log(`  Skipped: ${e}`); return null; });

  if (!duration) continue;
  console.log(`  Duration: ${duration.toFixed(1)}s`);

  // Extract frames at 25%, 50%, 75% of duration (best chance of good content)
  const timestamps = [
    duration * 0.15,
    duration * 0.35,
    duration * 0.5,
    duration * 0.7,
  ];

  for (let i = 0; i < timestamps.length; i++) {
    const t = timestamps[i];
    await page.evaluate(async (seekTo) => {
      const v = document.getElementById('v');
      v.currentTime = seekTo;
      return new Promise((resolve) => {
        v.onseeked = () => resolve();
        setTimeout(resolve, 2000);
      });
    }, t);

    await page.waitForTimeout(300);

    // Get video dimensions for tight crop
    const rect = await page.evaluate(() => {
      const v = document.getElementById('v');
      const r = v.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });

    const frameName = `${safeName}_frame${i + 1}.png`;
    await page.screenshot({
      path: path.join(outDir, frameName),
      clip: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) },
    });
    console.log(`  -> ${frameName} (${t.toFixed(1)}s)`);
  }
}

// Clean up
const { unlink } = await import('fs/promises');
await unlink(path.join(outDir, '_tmp_video.html')).catch(() => {});
await browser.close();
console.log(`\nDone! Frames saved to ${outDir}`);
