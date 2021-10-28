const puppeteer = require('puppeteer');


async function createPdf(siteUrl, pdfName, locationPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(siteUrl, {
    waitUntil: 'networkidle2',
  });
  await page.pdf({ path: locationPath + "/" + pdfName + '.pdf', format: 'a4' });

  await browser.close();
}

module.exports = { createPdf };
