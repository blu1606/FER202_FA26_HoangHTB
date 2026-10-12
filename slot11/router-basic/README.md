# Thực hành React Router Cơ Bản (Slot 11)

> 🌐 **Khóa học:** FER202 - Front-End Web Development with React (FPT University)  
> 📦 **Công nghệ:** React 19, React Router 7, React-Bootstrap 2.10, Bootstrap 5.3, Vite 8  
> 📌 **Vị trí:** `slot11/router-basic`

---

## 📋 Danh sách 5 bài tập thực hành React Router

| Bài | Kỹ thuật chính | Mô tả chức năng | Issue GitHub |
|:---:|---|---|:---:|
| **Bài 1** | `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink` + `end`, trang 404 | Portfolio cá nhân (Trang chủ, Kỹ năng, Dự án, Liên hệ, 404 Not Found) | [#53](https://github.com/blu1606/FER202_FA26_HoangHTB/issues/53) |
| **Bài 2** | Layout route, `<Outlet />`, `index`, relative links, `<Navigate replace />` | Thư viện FPT: Layout đa tầng, Sách, Hướng dẫn (FAQ & Nội quy) lồng 2 cấp | [#54](https://github.com/blu1606/FER202_FA26_HoangHTB/issues/54) |
| **Bài 3** | Dynamic route `:code`, `useParams`, xử lý thực thể không tồn tại | Danh sách môn học FPT và trang chi tiết môn học, tự động redirect sang `/courses` | [#55](https://github.com/blu1606/FER202_FA26_HoangHTB/issues/55) |
| **Bài 4** | `useNavigate` (path, `-1`, `replace`, `state`), `useLocation`, `<Navigate />` | Đăng ký sự kiện FPTU Tech Day 2026, truyền state ngầm an toàn, chặn direct link | [#56](https://github.com/blu1606/FER202_FA26_HoangHTB/issues/56) |
| **Bài 5** | `useSearchParams` (URL as State), derived state, query params | Danh bạ sinh viên, tìm kiếm tên/MSSV và lọc lớp học đồng bộ trực tiếp lên URL | [#57](https://github.com/blu1606/FER202_FA26_HoangHTB/issues/57) |

---

## 📸 Hình ảnh minh họa giao diện

### Tổng quan ứng dụng (Overview)
![Tổng quan ứng dụng](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot11/router-basic/screenshots/overview.png)

### Bài 1: Portfolio cá nhân
![Bài 1 - Portfolio cá nhân](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot11/router-basic/screenshots/bai-1-portfolio.png)

### Bài 2: Thư viện FPT
![Bài 2 - Thư viện FPT](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot11/router-basic/screenshots/bai-2-fpt-library.png)

### Bài 3: Danh sách môn học
![Bài 3 - Danh sách môn học](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot11/router-basic/screenshots/bai-3-courses.png)

### Bài 4: Đăng ký sự kiện
![Bài 4 - Đăng ký sự kiện](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot11/router-basic/screenshots/bai-4-event-registration.png)

### Bài 5: Danh bạ sinh viên
![Bài 5 - Danh bạ sinh viên](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot11/router-basic/screenshots/bai-5-student-directory.png)

---

## 💻 Hướng dẫn chạy cục bộ

### 1. Cài đặt các gói phụ thuộc:
```bash
cd slot11/router-basic
pnpm install
```

### 2. Khởi chạy máy chủ phát triển (Dev Server):
```bash
pnpm run dev
```
Truy cập `http://localhost:5173` để trải nghiệm ứng dụng. Thanh điều hướng ở đầu trang cho phép chuyển đổi nhanh giữa Bài 1, Bài 2, Bài 3, Bài 4 và Bài 5.

### 3. Kiểm tra bản dựng (Build):
```bash
pnpm run build
```

### 4. Tự động chụp lại ảnh màn hình:
```bash
pnpm run screenshots
```
