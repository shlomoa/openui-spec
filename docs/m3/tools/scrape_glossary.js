// Scrape the Material 3 glossary into a JSON file.
//
// Usage: node scrape_glossary.js <output json>
//
// The glossary page is rendered by JavaScript, so this drives a headless Chromium
// through Playwright. Set PLAYWRIGHT_CHROMIUM to a Chromium executable when the
// Playwright default browser is not installed.
const { chromium } = require('playwright');
const fs = require('fs');

const URL = 'https://m3.material.io/foundations/glossary';

(async () => {
  const out = process.argv[2];
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM || undefined,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);
  const terms = await page.evaluate(() =>
    [...document.querySelectorAll('div.block[role=region]')]
      .map((block) => {
        const chunk = block.querySelector('.text-chunk');
        const heading = chunk && chunk.querySelector('h3');
        if (!heading) return null;
        const clean = (s) => s.replace(/ /g, ' ').replace(/[ \t]+\n/g, '\n').trim();
        return {
          term: clean(heading.innerText),
          anchor: block.id,
          description: [...chunk.children]
            .filter((c) => c !== heading)
            .map((c) => clean(c.innerText))
            .filter(Boolean),
          links: [...chunk.querySelectorAll('a')].map((a) => ({
            text: clean(a.innerText),
            href: new URL(a.getAttribute('href'), location.origin).href,
          })),
          media: block.querySelectorAll('img,picture,video').length,
        };
      })
      .filter(Boolean)
  );
  const title = await page.title();
  fs.writeFileSync(
    out,
    JSON.stringify({ url: URL, title, scrapedAt: new Date().toISOString(), terms }, null, 1) + '\n'
  );
  console.log(`${terms.length} terms -> ${out}`);
  await browser.close();
})();
