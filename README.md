# FER202 - Front-End Web Development with React

> **Kho lưu trữ mã nguồn học phần FER202 - Lập trình Web Front-End với React**  
> **Trường Đại học FPT** • Học kỳ: Fall 2026  
> **Sinh viên:** Hoàng Hồng Thái Bảo (HoangHTB)  
> **GitHub:** [@blu1606](https://github.com/blu1606)

---

## 🌐 Live Demo Hub (Vercel)

Dự án được cấu hình multi-project tự động build và triển khai trên **Vercel** thông qua trang **FER202 Learning Hub**. Giảng viên và người chấm có thể bấm trực tiếp vào từng bài để xem và trải nghiệm:

- 🚀 **Trang tổng hợp (Learning Hub):** [https://fer202-fa26-hoanghtb.vercel.app](https://fer202-fa26-hoanghtb.vercel.app) *(cập nhật sau khi kết nối Vercel)*
- 🍕 **Slot 4 - Lab 1 Ex2 (Pizza Store):** `/slot4/lab1-ex2/`
- ⚡ **Slot 5 - Lab 2 (ES6 & React Bootstrap):** `/slot5/baitap-es6/`

---

## 📋 Danh Sách Bài Tập & Tiến Độ Theo Slot

| Slot / Bài tập | Nội dung chi tiết | Công nghệ / Trọng tâm | Live Demo | GitHub Issue |
|---|---|---|:---:|:---:|
| **Slot 4: Lab 1** | `ProductInfo` Card component | React, React-Bootstrap Card | [Xem Demo](/slot4/lab1/) | [#2](https://github.com/blu1606/FER202_FA26_HoangHTB/issues/2) |
| **Slot 4: Lab 1 Ex2** | `ProductList` Pizza Store | Container, Row, Col responsive | [Xem Demo](/slot4/lab1-ex2/) | [#3](https://github.com/blu1606/FER202_FA26_HoangHTB/issues/3) |
| **Slot 5: Lab 2 (Bài 1)** | `WelcomeCard` viền đổi màu | Template literals, const/let, giờ thực tế | [Xem Demo](/slot5/baitap-es6/) | [#4](https://github.com/blu1606/FER202_FA26_HoangHTB/issues/4) |
| **Slot 5: Lab 2 (Bài 2)** | `StudentCard` thẻ sinh viên | Arrow function, destructuring sâu props | [Xem Demo](/slot5/baitap-es6/) | [#5](https://github.com/blu1606/FER202_FA26_HoangHTB/issues/5) |
| **Slot 5: Lab 2 (Bài 3)** | `ProductCard` an toàn dữ liệu | Default params, Optional chaining (`?.`), Nullish (`??`) | [Xem Demo](/slot5/baitap-es6/) | [#6](https://github.com/blu1606/FER202_FA26_HoangHTB/issues/6) |
| **Slot 5: Lab 2 (Bài 4)** | `ProductList` lưới sản phẩm | `map()`, `key`, `Set` lọc danh mục, Row/Col | [Xem Demo](/slot5/baitap-es6/) | [#7](https://github.com/blu1606/FER202_FA26_HoangHTB/issues/7) |
| **Slot 5: Lab 2 (Bài 5 - 10)** | Badge trạng thái, AppButton, CartTable, Form, Layout, Mini Shop | 11 chuyên đề ES6 nâng cao | *Đang cập nhật* | [#8 - #13](https://github.com/blu1606/FER202_FA26_HoangHTB/issues) |

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Frontend Core:** React 19, JavaScript (ES6+)
- **UI Framework:** React-Bootstrap 2.x, Bootstrap 5.3
- **Build Tool:** Vite 8.x
- **Package Manager:** PNPM
- **Code Quality:** ESLint 10.x
- **Deployment:** Vercel Multi-Project Hub
- **Git Workflow:** Conventional Commits with scope (`feat(scope)`, `chore(scope)`, `refactor(scope)`, `docs(scope)`)

---

## 📂 Cấu Trúc Thư Mục (Project Structure)

```text
code/
├── build-hub.mjs              # Script build gom toàn bộ các Slot vào dist/ cho Vercel
├── package.json               # Root package.json điều phối build
├── README.md                  # Tài liệu hướng dẫn & báo cáo tiến độ
├── slot1/                     # Mã nguồn Slot 1
├── slot2/                     # Mã nguồn Slot 2
├── slot3/                     # Mã nguồn Slot 3
├── slot4/
│   ├── lab1/                  # Bài tập Lab 1: ProductInfo Card
│   └── lab1-ex2/              # Bài tập Lab 1 Ex2: Pizza ProductList
└── slot5/
    └── baitap-es6/            # Bài tập Lab 2: ES6 & React-Bootstrap (Bài 1 - 10)
        ├── screenshots/       # Ảnh chụp màn hình kết quả thực tế
        ├── src/
        │   ├── components/    # WelcomeCard, StudentCard, ProductCard, ProductList...
        │   ├── data/          # students.js, sampleProducts.js, products.js...
        │   ├── App.jsx
        │   └── main.jsx
        └── package.json
```

---

## 💻 Hướng Dẫn Chạy Cục Bộ (Local Development)

### 1. Chạy một bài tập cụ thể (Ví dụ Slot 5):
```bash
cd slot5/baitap-es6
pnpm install
pnpm run dev
```
Mở trình duyệt tại `http://localhost:5173/`.

### 2. Build toàn bộ các Slot thành trang Hub tổng hợp:
```bash
# Đứng tại thư mục gốc của repository
node build-hub.mjs
```
Kết quả build hoàn chỉnh của tất cả các bài tập sẽ được xuất ra thư mục `dist/`.

---

## 🚀 Hướng Dẫn Kết Nối Lên Vercel

1. Truy cập [Vercel](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
2. Bấm **Add New...** ➡️ **Project**.
3. Chọn repository: **`blu1606/FER202_FA26_HoangHTB`**.
4. Cấu hình cài đặt:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./` (để mặc định thư mục gốc)
   - **Build Command:** `pnpm run build` hoặc `node build-hub.mjs`
   - **Output Directory:** `dist`
5. Bấm **Deploy**. Vercel sẽ tự động build toàn bộ các project con và cung cấp 1 đường link duy nhất!
