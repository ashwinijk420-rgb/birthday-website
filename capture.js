const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('Navigating...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    console.log('Waiting for stability...');
    await new Promise(r => setTimeout(r, 5000));

    console.log('Capturing JPEG...');
    await page.screenshot({
      path: '/home/gourish/birthday-website/backup.jpg',
      type: 'jpeg',
      fullPage: true,
      quality: 100
    });
    console.log('JPEG saved.');

    console.log('Capturing PDF with long timeout...');
    // The default timeout for page.pdf() is also 30s. Let's try to set it globally if possible or just be fast.
    await page.setDefaultNavigationTimeout(60000);
    
    await page.pdf({
      path: '/home/gourish/birthday-website/backup.pdf',
      format: 'A4',
      printBackground: true,
      timeout: 60000 // Specifically set for PDF
    });
    console.log('PDF saved.');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();
