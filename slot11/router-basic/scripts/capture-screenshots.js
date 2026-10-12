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
  console.log('Building project before capturing screenshots...');
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

  const port = 4198;
  console.log(`Starting preview server on port ${port}...`);
  const server = spawn('pnpm', ['run', 'preview', '--port', `${port}`], {
    cwd: projectRoot,
    shell: true,
    stdio: 'pipe',
  });

  // Give server 2.5s to start
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  try {
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle' });
    console.log('App loaded successfully in browser.');

    // 1. Bài 1: Portfolio
    console.log('Capturing Bài 1...');
    await page.click('#tab-btn-1');
    await page.waitForTimeout(400);
    const ex1 = await page.$('#exercise-1');
    if (ex1) {
      await ex1.screenshot({ path: path.join(screenshotsDir, 'bai-1-portfolio.png') });
      console.log('✅ Captured bai-1-portfolio.png');
    }

    // 2. Bài 2: Thư viện FPT
    console.log('Capturing Bài 2...');
    await page.click('#tab-btn-2');
    await page.waitForTimeout(400);
    // Click vào Hướng dẫn
    const helpLink = await page.$('a[href="/help"]');
    if (helpLink) await helpLink.click();
    await page.waitForTimeout(400);
    const ex2 = await page.$('#exercise-2');
    if (ex2) {
      await ex2.screenshot({ path: path.join(screenshotsDir, 'bai-2-fpt-library.png') });
      console.log('✅ Captured bai-2-fpt-library.png');
    }

    // 3. Bài 3: Danh sách môn học
    console.log('Capturing Bài 3...');
    await page.click('#tab-btn-3');
    await page.waitForTimeout(500);
    const ex3 = await page.$('#exercise-3');
    if (ex3) {
      await ex3.screenshot({ path: path.join(screenshotsDir, 'bai-3-courses.png') });
      console.log('✅ Captured bai-3-courses.png');
    }

    // 4. Bài 4: Đăng ký sự kiện
    console.log('Capturing Bài 4...');
    await page.click('#tab-btn-4');
    await page.waitForTimeout(400);
    // Click vào Đăng ký ngay
    const registerBtn = await page.$('button:has-text("Đăng ký tham gia ngay")');
    if (registerBtn) await registerBtn.click();
    await page.waitForTimeout(400);
    const ex4 = await page.$('#exercise-4');
    if (ex4) {
      await ex4.screenshot({ path: path.join(screenshotsDir, 'bai-4-event-registration.png') });
      console.log('✅ Captured bai-4-event-registration.png');
    }

    // 5. Bài 5: Danh bạ sinh viên
    console.log('Capturing Bài 5...');
    await page.click('#tab-btn-5');
    await page.waitForTimeout(400);
    // Gõ tìm kiếm 'anh'
    const searchInput = await page.$('input[placeholder*="anh"]');
    if (searchInput) {
      await searchInput.fill('anh');
      await page.waitForTimeout(300);
    }
    const ex5 = await page.$('#exercise-5');
    if (ex5) {
      await ex5.screenshot({ path: path.join(screenshotsDir, 'bai-5-student-directory.png') });
      console.log('✅ Captured bai-5-student-directory.png');
    }

    // Overview screenshot
    await page.screenshot({ path: path.join(screenshotsDir, 'overview.png'), fullPage: true });
    console.log('✅ Captured overview.png');
  } catch (err) {
    console.error('Error taking screenshots:', err);
  } finally {
    await browser.close();
    server.kill();
    console.log('Screenshot capture process finished.');
  }
}

capture().catch((e) => {
  console.error(e);
  process.exit(1);
});
