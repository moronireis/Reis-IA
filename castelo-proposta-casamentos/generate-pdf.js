const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Higher resolution for sharp photos
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // CRITICAL: Force "screen" media so @media print rules are IGNORED
  // This keeps dark backgrounds, colors, and full photo quality
  await page.emulateMedia({ media: 'screen' });
  
  await page.goto('https://castelo-proposta-casamentos.vercel.app', { 
    waitUntil: 'networkidle',
    timeout: 60000 
  });
  
  // Wait for fonts + images to fully load
  await page.waitForTimeout(5000);
  
  // Force all elements visible + fix fixed-position elements for PDF
  await page.evaluate(() => {
    // Make all IntersectionObserver animated elements visible
    document.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.opacity) < 0.5 && !el.classList.contains('noise')) {
        el.style.opacity = '1';
      }
    });
    document.querySelectorAll('section:not(.hero) .container > *, .dm-transition .container > *').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'none';
    });
    
    // Force lazy images to load
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.loading = 'eager';
    });
    
    // Convert fixed-position elements to static (fixed = bad in PDF)
    const confBar = document.querySelector('.conf-bar');
    if (confBar) {
      confBar.style.position = 'relative';
      confBar.style.zIndex = 'auto';
    }
    
    // Remove scroll progress bar entirely
    const scrollProg = document.querySelector('#scroll-progress');
    if (scrollProg) scrollProg.remove();
    
    // Remove body padding-top (was for fixed conf-bar)
    document.body.style.paddingTop = '0';
    
    // Disable hover transforms that might interfere
    document.querySelectorAll('.card, .suite, .reason, .partner-dm, .cardapio-card').forEach(el => {
      el.style.transition = 'none';
    });
  });
  
  // Wait for forced image loads
  await page.waitForTimeout(3000);
  
  // Generate PDF — screen media preserves all dark backgrounds + colors
  await page.pdf({
    path: 'Castelo-dos-Lagos-Proposta-Casamento.pdf',
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    scale: 0.62
  });
  
  const fs = require('fs');
  const stats = fs.statSync('Castelo-dos-Lagos-Proposta-Casamento.pdf');
  console.log('PDF generated: Castelo-dos-Lagos-Proposta-Casamento.pdf');
  console.log('Size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');
  
  await browser.close();
})();
