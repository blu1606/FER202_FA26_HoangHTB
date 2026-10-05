# Slot 9 - React Hook: useContext Demo

Dự án thực hành chuyên sâu các bài tập về `useContext` trong môn **FER202** (Front-End Web Development) tại **FPT University**.

## Công nghệ sử dụng
- **React 19**
- **Vite 8**
- **React-Bootstrap 2.10** & **Bootstrap 5.3**
- **Playwright** (Tự động chụp screenshot giao diện)

## Danh sách 5 bài tập

| STT | Tên bài tập / Ví dụ | File chính | Kiến thức trọng tâm |
| :---: | :--- | :--- | :--- |
| **VD 1** | **ThemeContext — Đổi giao diện Sáng / Tối** | `src/contexts/ThemeContext.jsx`<br>`src/components/ThemeSwitcher.jsx` | Khắc phục Prop Drilling; Cú pháp 3 bước Create - Provide - Consume; Tối ưu re-render với `useMemo` & `useCallback`. |
| **VD 2** | **CartContext — Giỏ hàng tách State & Dispatch** | `src/contexts/CartContext.jsx`<br>`src/contexts/cartReducer.js`<br>`src/components/CartManager.jsx` | Kết hợp `useContext` + `useReducer`; Tách `CartStateContext` và `CartDispatchContext` giúp component chỉ gửi action không bị re-render thừa. |
| **VD 3** | **AuthContext — Xác thực & Bảo vệ nội dung** | `src/contexts/AuthContext.jsx`<br>`src/components/AuthManager.jsx` | Quản lý phiên đăng nhập/đăng xuất; Lưu trữ `localStorage` với lazy initialization; Bảo vệ component/nội dung nội bộ. |
| **BT 1** | **LanguageContext — Đa ngôn ngữ (i18n)** | `src/contexts/LanguageContext.jsx`<br>`src/components/LanguageSwitcher.jsx` | Quản lý từ điển `vi`/`en`; Cung cấp hàm dịch `t(key)` và `switchLang()`; Cập nhật tức thì Navbar, Content, Footer. |
| **BT 2** | **ToastContext — Thông báo nổi toàn cục tự ẩn 3s** | `src/contexts/ToastContext.jsx`<br>`src/components/NotificationToast.jsx` | Quản lý danh sách toast nổi bằng `ToastContainer`; Hàm `showToast(msg, variant)` gọi từ mọi component; Tự động ẩn sau 3 giây (`autohide`). |

## Hướng dẫn chạy dự án

```bash
# Di chuyển vào thư mục dự án
cd slot9/theme-context-demo

# Cài đặt dependencies
pnpm install

# Khởi chạy dev server
pnpm dev

# Build kiểm tra sản phẩm
pnpm build

# Chụp ảnh tự động
node scripts/capture-screenshots.js
```
