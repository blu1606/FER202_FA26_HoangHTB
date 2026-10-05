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

  const port = 4190;
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

    // 1. Overview
    await page.screenshot({
      path: path.join(screenshotsDir, 'overview.png'),
      fullPage: true,
    });
    console.log('Captured overview.png');

    // 2. ThemeSwitcher
    const el1 = await page.$('#exercise-1');
    if (el1) {
      await el1.screenshot({ path: path.join(screenshotsDir, 'theme-switcher.png') });
      console.log('Captured theme-switcher.png');
    }

    // 3. CartManager
    const el2 = await page.$('#exercise-2');
    if (el2) {
      await el2.screenshot({ path: path.join(screenshotsDir, 'cart-manager.png') });
      console.log('Captured cart-manager.png');
    }

    // 4. AuthManager
    const el3 = await page.$('#exercise-3');
    if (el3) {
      await el3.screenshot({ path: path.join(screenshotsDir, 'auth-manager.png') });
      console.log('Captured auth-manager.png');
    }

    // 5. LanguageSwitcher
    const el4 = await page.$('#exercise-4');
    if (el4) {
      await el4.screenshot({ path: path.join(screenshotsDir, 'language-switcher.png') });
      console.log('Captured language-switcher.png');
    }

    // 6. NotificationToast
    const el5 = await page.$('#exercise-5');
    if (el5) {
      await el5.screenshot({ path: path.join(screenshotsDir, 'notification-toast.png') });
      console.log('Captured notification-toast.png');
    }

    console.log('All available screenshots captured successfully!');
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
