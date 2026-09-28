import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../../../../');
const projectDir = path.join(rootDir, 'slot7/usestate-exercises');
const distDir = path.join(projectDir, 'dist');
const screenshotsDir = path.join(projectDir, 'screenshots');

const require = createRequire(path.join(projectDir, 'package.json'));
const { chromium } = require('playwright');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Simple static file server for dist
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

async function main() {
  const PORT = 4173;
  server.listen(PORT, async () => {
    console.log(`🌐 Local static server running on http://localhost:${PORT}`);

    try {
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();

      await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle' });

      // 1. Overview Screenshot (All tabs view)
      console.log('📸 Capturing overview.png...');
      await page.screenshot({
        path: path.join(screenshotsDir, 'overview.png'),
        fullPage: true,
      });

      // 2. Bài 1: Counter
      console.log('📸 Capturing counter.png...');
      await page.click('[data-rr-ui-event-key="ex1"]');
      await page.waitForTimeout(300);
      try {
        await page.click('#exercise-1 button.btn-primary');
        await page.click('#exercise-1 button.btn-primary');
      } catch (e) {}
      await page.waitForTimeout(200);
      const card1 = await page.$('#exercise-1');
      if (card1) {
        await card1.screenshot({ path: path.join(screenshotsDir, 'counter.png') });
      }

      // 3. Bài 2: Controlled Input
      console.log('📸 Capturing controlled-input.png...');
      await page.click('[data-rr-ui-event-key="ex2"]');
      await page.waitForTimeout(300);
      try {
        await page.fill('#exercise-2 input', 'Xin chào React 19 và Hook useState!');
      } catch (e) {}
      await page.waitForTimeout(200);
      const card2 = await page.$('#exercise-2');
      if (card2) {
        await card2.screenshot({ path: path.join(screenshotsDir, 'controlled-input.png') });
      }

      // 4. Bài 3: Toggle Visibility
      console.log('📸 Capturing toggle-visibility.png...');
      await page.click('[data-rr-ui-event-key="ex3"]');
      await page.waitForTimeout(300);
      try {
        await page.click('#exercise-3 button');
      } catch (e) {}
      await page.waitForTimeout(200);
      const card3 = await page.$('#exercise-3');
      if (card3) {
        await card3.screenshot({ path: path.join(screenshotsDir, 'toggle-visibility.png') });
      }

      // 5. Bài 4: Todo List
      console.log('📸 Capturing todo-list.png...');
      await page.click('[data-rr-ui-event-key="ex4"]');
      await page.waitForTimeout(300);
      try {
        await page.fill('#exercise-4 input', 'Chụp ảnh giao diện và cập nhật GitHub Issue');
        await page.click('#exercise-4 button[type="submit"]');
      } catch (e) {}
      await page.waitForTimeout(200);
      const card4 = await page.$('#exercise-4');
      if (card4) {
        await card4.screenshot({ path: path.join(screenshotsDir, 'todo-list.png') });
      }

      // 6. Bài 5: Color Switcher
      console.log('📸 Capturing color-switcher.png...');
      await page.click('[data-rr-ui-event-key="ex5"]');
      await page.waitForTimeout(300);
      try {
        await page.selectOption('#exercise-5 select', '#6f42c1');
      } catch (e) {}
      await page.waitForTimeout(300);
      const card5 = await page.$('#exercise-5');
      if (card5) {
        await card5.screenshot({ path: path.join(screenshotsDir, 'color-switcher.png') });
      }

      // 7. Bài 6: Search Filter
      console.log('📸 Capturing search-filter.png...');
      await page.click('[data-rr-ui-event-key="ex6"]');
      await page.waitForTimeout(300);
      try {
        await page.fill('#exercise-6 input', 'React');
      } catch (e) {}
      await page.waitForTimeout(200);
      const card6 = await page.$('#exercise-6');
      if (card6) {
        await card6.screenshot({ path: path.join(screenshotsDir, 'search-filter.png') });
      }

      // 8. Bài 7: Drag & Drop
      console.log('📸 Capturing drag-drop-list.png...');
      await page.click('[data-rr-ui-event-key="ex7"]');
      await page.waitForTimeout(300);
      const card7 = await page.$('#exercise-7');
      if (card7) {
        await card7.screenshot({ path: path.join(screenshotsDir, 'drag-drop-list.png') });
      }

      await browser.close();
      console.log('✨ All 8 screenshots captured successfully!');
    } catch (err) {
      console.error('❌ Screenshot capture error:', err);
    } finally {
      server.close();
      process.exit(0);
    }
  });
}

main();
