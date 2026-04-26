/**
 * Carousel Engine — Playwright HTML→PNG Renderer
 *
 * Usage:
 *   node src/render.mjs --data slides.json --template castelo-dos-lagos --out output/my-carousel
 *   node src/render.mjs --data slides.json --template castelo-dos-lagos --preview --slide 1
 */

import { chromium } from 'playwright';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    data: null,
    template: 'castelo-dos-lagos',
    out: null,
    preview: false,
    slide: null,
    width: 1080,
    height: 1350,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--data': opts.data = args[++i]; break;
      case '--template': opts.template = args[++i]; break;
      case '--out': opts.out = args[++i]; break;
      case '--preview': opts.preview = true; break;
      case '--slide': opts.slide = parseInt(args[++i], 10); break;
      case '--width': opts.width = parseInt(args[++i], 10); break;
      case '--height': opts.height = parseInt(args[++i], 10); break;
    }
  }

  return opts;
}

async function loadTemplate(templateName) {
  const templatePath = path.join(ROOT, 'templates', templateName, 'template.html');
  if (!existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }
  return readFile(templatePath, 'utf-8');
}

function buildSlideHTML(templateHTML, slideContent, imageDir) {
  let html = templateHTML.replace('{{SLIDE_CONTENT}}', slideContent);
  // Resolve relative image paths to absolute file:// paths
  if (imageDir) {
    html = html.replace(/url\((['"]?)(?!data:|https?:|file:)([^)'"]+)\1\)/g, (match, quote, imgPath) => {
      const absPath = path.resolve(imageDir, imgPath);
      // Encode path for file:// URL (spaces and special chars break otherwise)
      const fileUrl = 'file://' + absPath.split('/').map(s => encodeURIComponent(s)).join('/');
      return `url(${quote}${fileUrl}${quote})`;
    });
  }
  return html;
}

async function renderSlide(page, html, width, height, outputDir) {
  // Write HTML to temp file so file:// image paths resolve correctly
  const tmpHtml = path.join(outputDir, '_tmp_slide.html');
  await writeFile(tmpHtml, html);
  await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle' });
  // Wait for fonts to load
  await page.waitForFunction(() => document.fonts.ready);
  // Extra settle time for font + image rendering
  await page.waitForTimeout(500);

  const buffer = await page.screenshot({
    type: 'png',
    clip: { x: 0, y: 0, width, height },
  });

  // Clean up temp file
  const { unlink } = await import('fs/promises');
  await unlink(tmpHtml).catch(() => {});

  return buffer;
}

async function optimizeImage(buffer) {
  try {
    const sharp = (await import('sharp')).default;
    return sharp(buffer)
      .png({ quality: 90, compressionLevel: 9 })
      .toBuffer();
  } catch {
    // Sharp not installed — return raw buffer
    console.log('  (sharp not available — skipping optimization)');
    return buffer;
  }
}

async function main() {
  const opts = parseArgs();

  if (!opts.data) {
    console.error('Usage: node src/render.mjs --data <slides.json> [--template <name>] [--out <dir>]');
    process.exit(1);
  }

  // Load slide data
  const dataPath = path.resolve(opts.data);
  const slides = JSON.parse(await readFile(dataPath, 'utf-8'));

  console.log(`\n  Carousel Engine`);
  console.log(`  Template: ${opts.template}`);
  console.log(`  Slides: ${slides.length}`);
  console.log(`  Dimensions: ${opts.width}x${opts.height}`);
  console.log('');

  // Load template
  const templateHTML = await loadTemplate(opts.template);

  // Determine output directory
  const outDir = opts.out
    ? path.resolve(opts.out)
    : path.join(ROOT, 'output', `carousel-${Date.now()}`);

  await mkdir(outDir, { recursive: true });

  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: opts.width, height: opts.height },
    deviceScaleFactor: 2, // 2x for crisp text on retina
  });
  const page = await context.newPage();

  const slidesToRender = opts.slide != null
    ? [slides[opts.slide - 1]]
    : slides;

  const startSlideIndex = opts.slide != null ? opts.slide : 1;

  for (let i = 0; i < slidesToRender.length; i++) {
    const slide = slidesToRender[i];
    const slideNum = opts.slide != null ? opts.slide : i + 1;
    const paddedNum = String(slideNum).padStart(2, '0');

    console.log(`  Rendering slide ${paddedNum}/${slides.length}: ${slide.role || 'content'}...`);

    const html = buildSlideHTML(templateHTML, slide.html, outDir);
    const rawBuffer = await renderSlide(page, html, opts.width, opts.height, outDir);
    const optimized = await optimizeImage(rawBuffer);

    const filename = `slide-${paddedNum}-${slide.role || 'content'}.png`;
    await writeFile(path.join(outDir, filename), optimized);

    const sizeKB = Math.round(optimized.length / 1024);
    console.log(`  -> ${filename} (${sizeKB}KB)`);
  }

  // Write metadata
  const metadata = {
    template: opts.template,
    dimensions: { width: opts.width, height: opts.height },
    slideCount: slides.length,
    renderedAt: new Date().toISOString(),
    files: slidesToRender.map((s, i) => {
      const num = opts.slide != null ? opts.slide : i + 1;
      return `slide-${String(num).padStart(2, '0')}-${s.role || 'content'}.png`;
    }),
    caption: slides[0]?.caption || null,
  };
  await writeFile(path.join(outDir, 'metadata.json'), JSON.stringify(metadata, null, 2));

  await browser.close();

  console.log(`\n  Done! ${slidesToRender.length} slides rendered to:`);
  console.log(`  ${outDir}\n`);
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
