const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1200, height: 800 });

  const filePath = 'file://' + path.resolve(__dirname, 'contrato-permuta.html');
  await page.goto(filePath, { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for fonts to load
  await page.waitForTimeout(3000);

  // Fix sticky bar for PDF
  await page.evaluate(() => {
    const bar = document.querySelector('.confidential-bar');
    if (bar) bar.style.position = 'relative';
  });

  const outputPath = path.resolve(process.env.HOME, 'Downloads/contratos/contrato-permuta-castelo-dos-lagos.pdf');

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '15mm', bottom: '15mm', left: '15mm' },
    scale: 0.85
  });

  const fs = require('fs');
  const stats = fs.statSync(outputPath);
  console.log('PDF gerado:', outputPath);
  console.log('Tamanho:', (stats.size / 1024).toFixed(0), 'KB');

  await browser.close();
})();
