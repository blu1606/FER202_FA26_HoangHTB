import http from 'http';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../../../../');
const projectDir = path.join(rootDir, 'slot7/usestate-exercises');
const distDir = path.join(projectDir, 'dist');
const hwDir = path.join(projectDir, 'screenshots');
const require = createRequire(path.join(projectDir, 'package.json'));
const { chromium } = require('playwright');

if (!fs.existsSync(hwDir)) {
  fs.mkdirSync(hwDir, { recursive: true });
}

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

const server = http.createServer((req, res) => {
  const cleanUrl = req.url.split('?')[0].replace(/^\/+/, '');
  const filePath = path.join(distDir, cleanUrl === '' ? 'index.html' : cleanUrl);
  const ext = path.extname(filePath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3456, '127.0.0.1', async () => {
  console.log('Server started on http://127.0.0.1:3456');
  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: 2,
    });
    await page.goto('http://127.0.0.1:3456/', { waitUntil: 'networkidle' });

    console.log('Switching to Homework section...');
    await page.click('button:has-text("Bài tập về nhà")');
    await page.waitForTimeout(400);

    console.log('Capturing hw-faq-accordion.png...');
    const hw1 = await page.$('#homework-1');
    if (hw1) await hw1.screenshot({ path: path.join(hwDir, 'hw-faq-accordion.png') });

    console.log('Capturing hw-review-form.png...');
    const hw2 = await page.$('#homework-2');
    if (hw2) await hw2.screenshot({ path: path.join(hwDir, 'hw-review-form.png') });

    console.log('Capturing hw-bmi-calculator.png...');
    try {
      await page.fill('#homework-3 input[placeholder*="170"]', '170');
      await page.fill('#homework-3 input[placeholder*="65"]', '65');
      await page.waitForTimeout(200);
    } catch (e) {}
    const hw3 = await page.$('#homework-3');
    if (hw3) await hw3.screenshot({ path: path.join(hwDir, 'hw-bmi-calculator.png') });

    console.log('Capturing hw-student-manager.png...');
    const hw4 = await page.$('#homework-4');
    if (hw4) await hw4.screenshot({ path: path.join(hwDir, 'hw-student-manager.png') });

    console.log('Capturing hw-quiz-app.png...');
    const hw5 = await page.$('#homework-5');
    if (hw5) await hw5.screenshot({ path: path.join(hwDir, 'hw-quiz-app.png') });

    console.log('SUCCESS! All 5 homework screenshots captured!');
    await browser.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
