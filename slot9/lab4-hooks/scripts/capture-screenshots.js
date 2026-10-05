import { chromium } from 'playwright';
import { spawn } from 'child_process';
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

const targetEx = process.argv[2] ? parseInt(process.argv[2], 10) : null;

async function capture() {
  console.log('Building project...');
  const buildProcess = spawn('pnpm', ['run', 'build'], {
    cwd: projectRoot,
    shell: true,
    stdio: 'inherit',
  });

  await new Promise((resolve, reject) => {
    buildProcess.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Build failed with code ${code}`));
    });
  });

  const port = 4195;
  console.log(`Starting preview server on port ${port}...`);
  const server = spawn('pnpm', ['run', 'preview', '--port', `${port}`], {
    cwd: projectRoot,
    shell: true,
    stdio: 'pipe',
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 960 } });

  try {
    await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle' });
    console.log('Page loaded. Capturing screenshots...');

    const exList = [
      { id: 1, key: 'ex1', file: 'bai-1-quantity-picker-minicart.png' },
      { id: 2, key: 'ex2', file: 'bai-2-profile-preview.png' },
      { id: 3, key: 'ex3', file: 'bai-3-product-filter.png' },
      { id: 4, key: 'ex4', file: 'bai-4-register-form.png' },
      { id: 5, key: 'ex5', file: 'bai-5-validated-register-form.png' },
      { id: 6, key: 'ex6', file: 'bai-6-todo-list.png' },
      { id: 7, key: 'ex7', file: 'bai-7-cart-reducer.png' },
      { id: 8, key: 'ex8', file: 'bai-8-login-reducer.png' },
      { id: 9, key: 'ex9', file: 'bai-9-theme-auth-context.png' },
      { id: 10, key: 'ex10', file: 'bai-10-shop-mini-store.png' },
    ];

    for (const ex of exList) {
      if (targetEx && ex.id !== targetEx) continue;

      // Click tab button
      const tabBtn = await page.$(`#tab-btn-${ex.id}`);
      if (tabBtn) {
        await tabBtn.click();
        await page.waitForTimeout(500);
      }

      const container = await page.$(`#exercise-${ex.id}`);
      if (container) {
        await container.screenshot({ path: path.join(screenshotsDir, ex.file) });
        console.log(`✅ Captured ${ex.file}`);
      } else {
        // Fallback full page
        await page.screenshot({ path: path.join(screenshotsDir, ex.file), fullPage: true });
        console.log(`✅ Captured (fullpage) ${ex.file}`);
      }
    }

    if (!targetEx) {
      await page.screenshot({ path: path.join(screenshotsDir, 'overview.png'), fullPage: true });
      console.log('✅ Captured overview.png');
    }
  } finally {
    await browser.close();
    server.kill();
    process.exit(0);
  }
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
