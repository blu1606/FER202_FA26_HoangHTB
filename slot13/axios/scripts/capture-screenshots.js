import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const screenshotsDir = path.join(projectRoot, 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function capture() {
  console.log('Launching browser to capture screenshots...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });

  try {
    const url = 'http://localhost:5173';
    console.log(`Connecting to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

    // Đảm bảo tab 'advanced' đang active
    await page.waitForTimeout(1500);

    const items = [
      { id: 'nc2', file: 'nc2-axios-client.png' },
      { id: 'nc3', file: 'nc3-parallel-requests.png' },
      { id: 'nc4', file: 'nc4-abort-controller.png' },
      { id: 'nc5', file: 'nc5-bootstrap-validation.png' },
      { id: 'nc6', file: 'nc6-router-crud.png' },
      { id: 'nc7', file: 'nc7-json-server.png' },
      { id: 'nc8', file: 'nc8-use-axios-hook.png' },
      { id: 'nc9', file: 'nc9-debounce-search.png' },
      { id: 'nc10', file: 'nc10-bulk-optimistic.png' },
    ];

    for (const item of items) {
      const el = page.locator(`#${item.id}`);
      if (await el.count() > 0) {
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const filePath = path.join(screenshotsDir, item.file);
        await el.screenshot({ path: filePath });
        console.log(`Saved screenshot: ${item.file}`);
      } else {
        console.warn(`Element #${item.id} not found`);
      }
    }

    // Chụp toàn cảnh Overview
    const overviewPath = path.join(screenshotsDir, 'nc-advanced-overview.png');
    await page.screenshot({ path: overviewPath, fullPage: true });
    console.log('Saved overview screenshot: nc-advanced-overview.png');

    console.log('Capture completed successfully!');
  } catch (error) {
    console.error('Error during capture:', error);
  } finally {
    await browser.close();
  }
}

capture();
