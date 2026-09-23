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

// 2. Scan and Build Subprojects
const knownMeta = {
  'slot6/lab6': {
    title: 'Lab 2: Pizza House Website Interface',
    slotTag: 'Slot 6',
    desc: 'Xây dựng giao diện website Pizza House hoàn chỉnh bằng React 19 và Bootstrap 5: Header/Navbar, Hero Carousel, Our Menu với nhãn Sale/New và Form Book Your Table.',
    features: [
      'Navbar Pizza House kèm thanh tìm kiếm',
      'Hero Carousel Banner giới thiệu món nổi bật',
      'Lưới Our Menu 4 cột với nhãn Sale/New và giá khuyến mãi',
      'Form Book Your Table đặt bàn tiệc responsive',
    ],
  },
  'slot5/baitap-es6': {
    title: 'Lab 2: ES6 & React Bootstrap',
    slotTag: 'Slot 5',
    desc: 'Chuyên đề bài tập ES6 hiện đại kết hợp React-Bootstrap: Template literals, Destructuring, Nullish Coalescing, Lưới sản phẩm responsive map/key.',
    features: [
      'Bài 1: WelcomeCard viền đổi màu theo tuổi',
      'Bài 2: StudentCard destructuring sâu',
      'Bài 3: ProductCard an toàn dữ liệu (?., ??)',
      'Bài 4: Lưới sản phẩm Responsive 4 cột',
    ],
  },
  'slot4/lab1-ex2': {
    title: 'Lab 1 Ex2: Pizza Store',
    slotTag: 'Slot 4',
    desc: 'Ứng dụng danh sách Pizza tương tác với bố cục lưới chia cột responsive bằng Container, Row, Col và component thẻ món ăn.',
    features: [
      'Component ProductList responsive',
      'Tách nguồn dữ liệu pizzaData.js',
      'Hiển thị nhãn tag, giá tiền, ảnh Pizza',
      'Tích hợp React-Bootstrap Card',
    ],
  },
  'slot4/lab1': {
    title: 'Lab 1: ProductInfo Card',
    slotTag: 'Slot 4',
    desc: 'Khởi tạo và làm quen với thư viện React-Bootstrap thông qua component ProductInfo hiển thị thẻ sản phẩm cơ bản.',
    features: [
      'Cài đặt và cấu hình Bootstrap CSS',
      'Xây dựng Card sản phẩm mẫu',
      'Truyền dữ liệu tĩnh và render component',
    ],
  },
  'slot3/ex2-props': {
    title: 'Exercise 2: React Props & Data Flow',
    slotTag: 'Slot 3',
    desc: 'Thực hành truyền dữ liệu component qua Props, phân tách component con và xử lý hiển thị giao diện.',
    features: [
      'Component hóa giao diện người dùng',
      'Truyền Props giữa Component cha và con',
      'Quản lý dữ liệu người dùng và render',
    ],
  },
  'slot3/slot-3': {
    title: 'Slot 3: Intro Components & Assets',
    slotTag: 'Slot 3',
    desc: 'Tìm hiểu cấu trúc dự án React Vite, import hình ảnh tĩnh và xây dựng component About.',
    features: [
      'Cấu trúc dự án Vite + React',
      'Import tĩnh ảnh từ thư mục assets',
      'Component About hiển thị thông tin',
    ],
  },
  'slot1/test-prj': {
    title: 'Slot 1: React Setup & Environment',
    slotTag: 'Slot 1',
    desc: 'Làm quen môi trường phát triển Front-End React 19, cấu hình bundler Vite và kiểm tra render ban đầu.',
    features: [
      'Khởi tạo dự án với Vite và React 19',
      'Kiểm thử Hot Module Replacement (HMR)',
      'Cấu hình môi trường phát triển ban đầu',
    ],
  },
};

// Auto-discover all subprojects in slot* directories
const discoveredProjects = [];
const slotDirs = fs.readdirSync(rootDir).filter(d => d.startsWith('slot') && fs.statSync(path.join(rootDir, d)).isDirectory());

// Sort slot folders in ascending order (Slot 1, Slot 3, Slot 4, Slot 5...)
slotDirs.sort((a, b) => {
  const numA = parseInt(a.replace(/\D/g, '')) || 0;
  const numB = parseInt(b.replace(/\D/g, '')) || 0;
  return numA - numB;
});

for (const sDir of slotDirs) {
  const sPath = path.join(rootDir, sDir);
  const subEntries = fs.readdirSync(sPath, { withFileTypes: true });
  for (const sub of subEntries) {
    if (sub.isDirectory()) {
      const relPath = `${sDir}/${sub.name}`.replace(/\\/g, '/');
      const pkgPath = path.join(sPath, sub.name, 'package.json');
      if (fs.existsSync(pkgPath)) {
        const meta = knownMeta[relPath] || {
          title: `${sDir.toUpperCase()}: ${sub.name}`,
          slotTag: sDir.toUpperCase(),
          desc: `Dự án thực hành tại thư mục ${relPath}`,
          features: ['Dự án React Vite độc lập', 'Tự động phát hiện và đóng gói'],
        };
        discoveredProjects.push({
          dir: relPath,
          output: relPath,
          ...meta,
        });
      }
    }
  }
}

console.log(`\n🔍 Auto-discovered ${discoveredProjects.length} projects across slots:`);
discoveredProjects.forEach(p => console.log(`   • [${p.slotTag}] ${p.title} (${p.dir})`));

for (const proj of discoveredProjects) {
  const projPath = path.join(rootDir, proj.dir);
  console.log(`\n📦 Building [${proj.title}] in ${proj.dir}...`);
  try {
    if (!fs.existsSync(path.join(projPath, 'node_modules'))) {
      console.log(`   ⚙️ Installing dependencies for ${proj.dir}...`);
      execSync('pnpm install', { cwd: projPath, stdio: 'inherit' });
    }
    execSync('pnpm exec vite build --base=./', {
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
    console.error(`❌ Failed to build ${proj.title}:`, err.message);
  }
}


// 3. Generate Flat Design Hub Portal Dashboard (dist/index.html)
const cardsHtml = discoveredProjects.map(proj => `
      <div class="card">
        <div class="card-top">
          <span class="card-tag">${proj.slotTag}</span>
          <span class="card-status">Sẵn sàng</span>
        </div>
        <h4 class="card-title">${proj.title}</h4>
        <p class="card-desc">${proj.desc}</p>
        <ul class="card-list">
          ${proj.features.map(f => `
          <li>
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ${f}
          </li>`).join('')}
        </ul>
        <div class="card-actions">
          <button onclick="openPreview('${proj.title.replace(/'/g, "\\'")}', './${proj.output}/')" class="btn btn-secondary">Xem trước</button>
          <a href="./${proj.output}/" target="_blank" class="btn btn-primary">Mở Demo ↗</a>
        </div>
      </div>`).join('\n');

const hubHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FER202</title>
  <link rel="icon" type="image/svg+xml" href="./favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --border: #e2e8f0;
      --border-focus: #94a3b8;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --text-sub: #334155;
      --primary: #0f172a;
      --primary-hover: #1e293b;
      --accent: #2563eb;
      --accent-soft: #eff6ff;
      --accent-border: #bfdbfe;
      --success: #166534;
      --success-bg: #f0fdf4;
      --success-border: #bbf7d0;
      --radius: 8px;
      --radius-sm: 6px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    body {
      background-color: var(--bg);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    header {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 40;
    }

    .header-container {
      max-width: 1140px;
      margin: 0 auto;
      padding: 0.875rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .brand-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--primary);
      color: #ffffff;
      font-weight: 700;
      font-size: 0.875rem;
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius-sm);
      letter-spacing: 0.05em;
    }

    .brand-info h1 {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-main);
      letter-spacing: -0.01em;
    }

    .brand-info p {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.625rem;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.625rem;
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      font-weight: 500;
      background: var(--success-bg);
      color: var(--success);
      border: 1px solid var(--success-border);
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #16a34a;
    }

    .btn-link {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.75rem;
      border-radius: var(--radius-sm);
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--text-main);
      background: var(--surface);
      border: 1px solid var(--border);
      text-decoration: none;
      transition: background-color 0.15s, border-color 0.15s;
    }

    .btn-link:hover {
      background: #f1f5f9;
      border-color: var(--border-focus);
    }

    main {
      flex: 1;
      max-width: 1140px;
      width: 100%;
      margin: 0 auto;
      padding: 2.25rem 1.5rem;
    }

    .hero {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .hero-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-main);
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
    }

    .hero-desc {
      font-size: 0.9375rem;
      color: var(--text-muted);
      max-width: 720px;
      margin-bottom: 1.25rem;
    }

    .hero-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      padding: 0.2rem 0.55rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
      background: #f1f5f9;
      color: var(--text-sub);
      border: 1px solid var(--border);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .section-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-main);
    }

    .slots-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
      gap: 1.25rem;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.375rem;
      display: flex;
      flex-direction: column;
      transition: border-color 0.15s;
    }

    .card:hover {
      border-color: var(--border-focus);
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
      gap: 0.5rem;
    }

    .card-tag {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      background: var(--accent-soft);
      color: var(--accent);
      border: 1px solid var(--accent-border);
    }

    .card-status {
      font-size: 0.7rem;
      font-weight: 500;
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
      background: var(--success-bg);
      color: var(--success);
      border: 1px solid var(--success-border);
    }

    .card-title {
      font-size: 1.0625rem;
      font-weight: 600;
      color: var(--text-main);
      margin-bottom: 0.5rem;
    }

    .card-desc {
      font-size: 0.84375rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 1.125rem;
      flex: 1;
    }

    .card-list {
      list-style: none;
      border-top: 1px solid var(--border);
      padding-top: 0.875rem;
      margin-bottom: 1.25rem;
      font-size: 0.8125rem;
    }

    .card-list li {
      margin-bottom: 0.375rem;
      color: var(--text-sub);
      display: flex;
      align-items: flex-start;
      gap: 0.45rem;
    }

    .card-list li svg {
      width: 14px;
      height: 14px;
      color: #16a34a;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .card-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
      padding: 0.5rem 0.875rem;
      border-radius: var(--radius-sm);
      font-size: 0.8125rem;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background-color 0.15s, border-color 0.15s;
    }

    .btn-primary {
      background: var(--primary);
      color: #ffffff;
      flex: 1;
      border-color: var(--primary);
    }

    .btn-primary:hover {
      background: var(--primary-hover);
      border-color: var(--primary-hover);
    }

    .btn-secondary {
      background: var(--surface);
      color: var(--text-main);
      border-color: var(--border);
    }

    .btn-secondary:hover {
      background: #f1f5f9;
      border-color: var(--border-focus);
    }

    /* Modal Flat Preview */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      z-index: 100;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal-container {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      width: 100%;
      max-width: 1100px;
      height: 86vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .modal-header {
      padding: 0.875rem 1.25rem;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fafafa;
    }

    .modal-title-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .modal-title {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--text-main);
    }

    .modal-url {
      font-size: 0.75rem;
      font-family: monospace;
      color: var(--text-muted);
      background: #f1f5f9;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      border: 1px solid var(--border);
    }

    .modal-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .modal-btn-open {
      font-size: 0.75rem;
      color: var(--accent);
      text-decoration: none;
      font-weight: 500;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      border: 1px solid var(--accent-border);
      background: var(--accent-soft);
    }

    .modal-close {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.25rem;
      cursor: pointer;
      line-height: 1;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
    }

    .modal-close:hover {
      color: var(--text-main);
      background: #e2e8f0;
    }

    .modal-body {
      flex: 1;
      width: 100%;
      height: 100%;
      background: #ffffff;
    }

    .modal-body iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    footer {
      border-top: 1px solid var(--border);
      background: var(--surface);
      padding: 1.5rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.8125rem;
      margin-top: 3rem;
    }

    @media (max-width: 768px) {
      .header-container {
        flex-direction: column;
        align-items: flex-start;
      }
      .header-actions {
        width: 100%;
        justify-content: space-between;
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
        <span class="brand-badge">FER202</span>
        <div class="brand-info">
          <h1>FER202</h1>
          <p>Front-End Web Development with React • FPT University</p>
        </div>
      </div>
      <div class="header-actions">
        <span class="status-pill">
          <span class="status-dot"></span>
          Vercel CI/CD Active
        </span>
        <a href="https://github.com/blu1606/FER202_FA26_HoangHTB" target="_blank" class="btn-link">
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          Repository
        </a>
      </div>
    </div>
  </header>

  <main>
    <section class="hero">
      <h2 class="hero-title">FER202</h2>
      <p class="hero-desc">Hệ thống thực hành và bài tập môn Lập trình Web Front-End với React. Danh sách dự án độc lập được cấu hình tích hợp tự động triển khai.</p>
      <div class="hero-tags">
        <span class="tag">React 19</span>
        <span class="tag">React-Bootstrap 2.x</span>
        <span class="tag">Vite 8</span>
        <span class="tag">ES6+ Modules</span>
        <span class="tag">Monorepo Workspace</span>
      </div>
    </section>

    <div class="section-header">
      <h3 class="section-title">Danh sách bài thực hành</h3>
    </div>

    <div class="slots-grid">
${cardsHtml}
    </div>
  </main>

  <!-- Modal Flat Preview -->
  <div id="previewModal" class="modal-overlay" onclick="closePreview(event)">
    <div class="modal-container" onclick="event.stopPropagation()">
      <div class="modal-header">
        <div class="modal-title-group">
          <h3 id="modalTitle" class="modal-title">Xem trước bài làm</h3>
          <span id="modalUrl" class="modal-url"></span>
        </div>
        <div class="modal-actions">
          <a id="modalExternalLink" href="#" target="_blank" class="modal-btn-open">Mở tab mới ↗</a>
          <button class="modal-close" onclick="closeModal()" aria-label="Đóng">✕</button>
        </div>
      </div>
      <div class="modal-body">
        <iframe id="previewFrame" src="" title="Preview"></iframe>
      </div>
    </div>
  </div>

  <footer>
    <p>© 2026 FER202 • Lập trình Web Frontend với React • Đại học FPT</p>
  </footer>

  <script>
    function openPreview(title, url) {
      document.getElementById('modalTitle').innerText = title;
      document.getElementById('modalUrl').innerText = url;
      document.getElementById('modalExternalLink').href = url;
      document.getElementById('previewFrame').src = url;
      document.getElementById('previewModal').classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      document.getElementById('previewModal').classList.remove('active');
      document.getElementById('previewFrame').src = '';
      document.body.style.overflow = '';
    }

    function closePreview(e) {
      if (e.target.id === 'previewModal') {
        closeModal();
      }
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(distDir, 'index.html'), hubHtml);

// 4. Generate SVG Favicon
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0f172a"/>
  <circle cx="32" cy="32" r="4.5" fill="#38bdf8"/>
  <ellipse cx="32" cy="32" rx="22" ry="8.5" fill="none" stroke="#38bdf8" stroke-width="2.5" transform="rotate(30 32 32)"/>
  <ellipse cx="32" cy="32" rx="22" ry="8.5" fill="none" stroke="#38bdf8" stroke-width="2.5" transform="rotate(90 32 32)"/>
  <ellipse cx="32" cy="32" rx="22" ry="8.5" fill="none" stroke="#38bdf8" stroke-width="2.5" transform="rotate(150 32 32)"/>
</svg>`;
fs.writeFileSync(path.join(distDir, 'favicon.svg'), faviconSvg);

console.log('\n✨ Hub Dashboard created at dist/index.html');
console.log('✨ Favicon generated at dist/favicon.svg');
console.log('🎉 Multi-project build finished successfully!');

