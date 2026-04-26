import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import fs from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const targets = [
  { html: 'cover-square.html',   png: 'agentes-ia-cover-1080x1080.png', w: 1080, h: 1080 },
  { html: 'cover-vertical.html', png: 'agentes-ia-cover-1080x1350.png', w: 1080, h: 1350 },
];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

for (const t of targets) {
  const ctx = await browser.newContext({
    viewport: { width: t.w, height: t.h },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const url = pathToFileURL(path.join(__dirname, t.html)).href;
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);

  const out = path.join(__dirname, t.png);
  await page.screenshot({
    path: out,
    type: 'png',
    omitBackground: false,
    clip: { x: 0, y: 0, width: t.w, height: t.h },
  });

  const stat = await fs.stat(out);
  console.log(`OK ${t.png} -> ${(stat.size/1024).toFixed(1)} KB (${t.w}x${t.h} @2x)`);
  await ctx.close();
}

await browser.close();
