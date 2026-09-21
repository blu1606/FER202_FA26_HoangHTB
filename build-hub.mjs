import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

console.log('🚀 Starting FER202 Multi-project Build for Vercel...');

// 1. Clean dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Helper to copy directory recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 2. Build subprojects
const projects = [
  {
    name: 'Slot 5 - Lab 2 (ES6 & React Bootstrap)',
    dir: 'slot5/baitap-es6',
    output: 'slot5/baitap-es6',
  },
  {
    name: 'Slot 4 - Lab 1 Ex2 (Pizza ProductList)',
    dir: 'slot4/lab1-ex2',
    output: 'slot4/lab1-ex2',
  },
  {
    name: 'Slot 4 - Lab 1 (ProductInfo Card)',
    dir: 'slot4/lab1',
    output: 'slot4/lab1',
  },
];

for (const proj of projects) {
  const projPath = path.join(rootDir, proj.dir);
  if (fs.existsSync(projPath)) {
    console.log(`\n📦 Building [${proj.name}] in ${proj.dir}...`);
    try {
      execSync('pnpm run build -- --base=./', {
        cwd: projPath,
        stdio: 'inherit',
      });
      const projDist = path.join(projPath, 'dist');
      const targetDist = path.join(distDir, proj.output);
      if (fs.existsSync(projDist)) {
        copyDir(projDist, targetDist);
        console.log(`✅ Copied build output to dist/${proj.output}`);
      }
    } catch (err) {
      console.error(`❌ Failed to build ${proj.name}:`, err.message);
    }
  }
}

// 3. Generate Hub Portal Dashboard (dist/index.html)
const hubHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FER202 - Learning Hub | HoangHTB</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b0f19;
      --surface: #131b2e;
      --surface-hover: #1c2742;
      --border: #24304f;
      --primary: #f97316;
      --primary-light: #fb923c;
      --accent: #38bdf8;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --success: #22c55e;
      --card-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      line-height: 1.6;
    }

    header {
      background: rgba(19, 27, 46, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 50;
      padding: 1rem 1.5rem;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .brand-logo {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: linear-gradient(135deg, #f97316, #ea580c);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: white;
      font-size: 1.25rem;
      box-shadow: 0 4px 12px rgba(249, 115, 22, 0.4);
    }

    .brand-title h1 {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .brand-title p {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .header-links {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 600;
      background: rgba(56, 189, 248, 0.1);
      color: var(--accent);
      border: 1px solid rgba(56, 189, 248, 0.2);
      text-decoration: none;
      transition: all 0.2s;
    }

    .badge:hover {
      background: rgba(56, 189, 248, 0.2);
    }

    .badge.github {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
      border-color: rgba(255, 255, 255, 0.15);
    }

    .badge.github:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    main {
      flex: 1;
      max-width: 1200px;
      width: 100%;
      margin: 2rem auto;
      padding: 0 1.5rem;
    }

    .hero {
      text-align: center;
      padding: 2.5rem 1rem;
      margin-bottom: 2.5rem;
      background: radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.15), transparent 70%);
      border-radius: 20px;
      border: 1px solid rgba(249, 115, 22, 0.15);
    }

    .hero h2 {
      font-size: 2.25rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 0.75rem;
      background: linear-gradient(135deg, #ffffff 40%, var(--primary-light));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero p {
      color: var(--text-muted);
      font-size: 1.05rem;
      max-width: 650px;
      margin: 0 auto;
    }

    .slots-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: var(--card-shadow);
      display: flex;
      flex-direction: column;
      transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
      position: relative;
      overflow: hidden;
    }

    .card:hover {
      transform: translateY(-4px);
      border-color: rgba(249, 115, 22, 0.4);
      box-shadow: 0 16px 30px -8px rgba(249, 115, 22, 0.2);
    }

    .card-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      background: rgba(34, 197, 94, 0.15);
      color: var(--success);
      border: 1px solid rgba(34, 197, 94, 0.3);
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #fff;
    }

    .card-desc {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 1.25rem;
      flex: 1;
    }

    .card-features {
      list-style: none;
      margin-bottom: 1.5rem;
      font-size: 0.85rem;
    }

    .card-features li {
      margin-bottom: 0.4rem;
      color: #cbd5e1;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .card-features li::before {
      content: '✓';
      color: var(--primary);
      font-weight: bold;
    }

    .card-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: auto;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      padding: 0.65rem 1rem;
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary), #ea580c);
      color: white;
      flex: 1;
      box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
    }

    .btn-primary:hover {
      opacity: 0.95;
      transform: scale(1.02);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: var(--text);
      border: 1px solid var(--border);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.12);
    }

    /* Modal Iframe Preview */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      z-index: 100;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal-content {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      width: 100%;
      max-width: 1100px;
      height: 85vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }

    .modal-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      font-size: 1.1rem;
      font-weight: 700;
    }

    .modal-close {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.5rem;
      cursor: pointer;
      line-height: 1;
    }

    .modal-close:hover {
      color: white;
    }

    .modal-body {
      flex: 1;
      width: 100%;
      height: 100%;
      background: #fff;
    }

    .modal-body iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    footer {
      border-top: 1px solid var(--border);
      padding: 2rem 1.5rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-top: 3rem;
    }

    @media (max-width: 768px) {
      .hero h2 {
        font-size: 1.75rem;
      }
      .slots-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="header-container">
      <div class="brand">
        <div class="brand-logo">F</div>
        <div class="brand-title">
          <h1>FER202 - Learning Hub</h1>
          <p>FPT University • Sinh viên: HoangHTB (blu1606)</p>
        </div>
      </div>
      <div class="header-links">
        <a href="https://github.com/blu1606/FER202_FA26_HoangHTB" target="_blank" class="badge github">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub Repo
        </a>
      </div>
    </div>
  </header>

  <main>
    <section class="hero">
      <h2>Trung Tâm Bài Tập & Thực Hành FER202</h2>
      <p>Tổng hợp toàn bộ các bài tập thực hành trên lớp và lab theo từng Slot học phần FER202 - Lập trình Web Frontend với React tại Đại học FPT.</p>
    </section>

    <div class="slots-grid">
      <!-- SLOT 5 -->
      <div class="card">
        <span class="card-badge">Mới nhất</span>
        <h3 class="card-title">Slot 5: Lab 2 - ES6 & React Bootstrap</h3>
        <p class="card-desc">Chuyên đề bài tập ES6 hiện đại kết hợp React-Bootstrap: Template literals, Destructuring, Nullish Coalescing, Lưới sản phẩm responsive map/key.</p>
        <ul class="card-features">
          <li>Bài 1: WelcomeCard viền động theo tuổi</li>
          <li>Bài 2: StudentCard destructuring sâu</li>
          <li>Bài 3: ProductCard an toàn dữ liệu (?., ??)</li>
          <li>Bài 4: Lưới sản phẩm Responsive 4 cột</li>
        </ul>
        <div class="card-actions">
          <button onclick="openPreview('Slot 5 - Lab 2: ES6 & React Bootstrap', './slot5/baitap-es6/')" class="btn btn-secondary">🔍 Xem nhanh</button>
          <a href="./slot5/baitap-es6/" target="_blank" class="btn btn-primary">🚀 Mở Demo ↗</a>
        </div>
      </div>

      <!-- SLOT 4 - Lab 1 Ex2 -->
      <div class="card">
        <span class="card-badge" style="background: rgba(56, 189, 248, 0.15); color: var(--accent); border-color: rgba(56, 189, 248, 0.3);">Hoàn thành</span>
        <h3 class="card-title">Slot 4: Lab 1 Ex2 - Pizza Store</h3>
        <p class="card-desc">Ứng dụng danh sách Pizza tương tác với bố cục lưới chia cột responsive bằng Container, Row, Col và component thẻ món ăn đẹp mắt.</p>
        <ul class="card-features">
          <li>Component ProductList responsive</li>
          <li>Tách nguồn dữ liệu pizzaData.js</li>
          <li>Hiển thị nhãn tag, giá tiền, ảnh Pizza</li>
          <li>Tích hợp React-Bootstrap Card</li>
        </ul>
        <div class="card-actions">
          <button onclick="openPreview('Slot 4 - Lab 1 Ex2: Pizza Store', './slot4/lab1-ex2/')" class="btn btn-secondary">🔍 Xem nhanh</button>
          <a href="./slot4/lab1-ex2/" target="_blank" class="btn btn-primary">🚀 Mở Demo ↗</a>
        </div>
      </div>

      <!-- SLOT 4 - Lab 1 -->
      <div class="card">
        <span class="card-badge" style="background: rgba(56, 189, 248, 0.15); color: var(--accent); border-color: rgba(56, 189, 248, 0.3);">Hoàn thành</span>
        <h3 class="card-title">Slot 4: Lab 1 - ProductInfo Card</h3>
        <p class="card-desc">Khởi tạo và làm quen với thư viện React-Bootstrap thông qua component ProductInfo hiển thị thẻ sản phẩm cơ bản.</p>
        <ul class="card-features">
          <li>Cài đặt và cấu hình Bootstrap CSS</li>
          <li>Xây dựng Card sản phẩm mẫu</li>
          <li>Truyền dữ liệu tĩnh và render</li>
        </ul>
        <div class="card-actions">
          <button onclick="openPreview('Slot 4 - Lab 1: ProductInfo Card', './slot4/lab1/')" class="btn btn-secondary">🔍 Xem nhanh</button>
          <a href="./slot4/lab1/" target="_blank" class="btn btn-primary">🚀 Mở Demo ↗</a>
        </div>
      </div>
    </div>
  </main>

  <!-- Modal Preview -->
  <div id="previewModal" class="modal-overlay" onclick="closePreview(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h3 id="modalTitle" class="modal-title">Xem trước bài làm</h3>
        <button class="modal-close" onclick="closeModal()">×</button>
      </div>
      <div class="modal-body">
        <iframe id="previewFrame" src="" title="Preview"></iframe>
      </div>
    </div>
  </div>

  <footer>
    <p>© 2026 FER202 - Đại học FPT • Mã sinh viên / GitHub: blu1606 (HoangHTB)</p>
  </footer>

  <script>
    function openPreview(title, url) {
      document.getElementById('modalTitle').innerText = title;
      document.getElementById('previewFrame').src = url;
      document.getElementById('previewModal').classList.add('active');
    }

    function closeModal() {
      document.getElementById('previewModal').classList.remove('active');
      document.getElementById('previewFrame').src = '';
    }

    function closePreview(e) {
      if (e.target.id === 'previewModal') {
        closeModal();
      }
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(distDir, 'index.html'), hubHtml);
console.log('\n✨ Hub Dashboard created at dist/index.html');
console.log('🎉 Multi-project build finished successfully!');
