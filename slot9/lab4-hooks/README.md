# BTVN Lab 4: React Hooks (useState, useReducer, useContext)

> 🌐 **Khóa học:** FER202 - Front-End Web Development with React (FPT University)  
> 📦 **Công nghệ:** React 19, React-Bootstrap 2.10, Vite 8, Bootstrap 5.3  
> 📌 **Vị trí:** `slot9/lab4-hooks`

---

## 📋 Danh sách 10 bài tập thực hành

| Bài | Hook / Kỹ thuật chính | Thành phần giao diện | Trạng thái |
|:---:|---|---|:---:|
| **Bài 1** | `useState`: state số, state mảng, functional update | Bộ chọn số lượng `QuantityPicker`, giỏ hàng mini `MiniCart` | ✅ Hoàn thành (#43) |
| **Bài 2** | Controlled input, `onChange`, `onKeyDown` (Esc), `onFocus`/`onBlur` | Form hồ sơ xem trước trực tiếp `ProfilePreview` (Live Preview) | ✅ Hoàn thành (#44) |
| **Bài 3** | Nhiều state, derived state (dữ liệu dẫn xuất) | Tìm kiếm, lọc danh mục, công tắc còn hàng, sắp xếp `ProductFilter` | ✅ Hoàn thành (#45) |
| **Bài 4** | State object, computed property `[name]`, `noValidate`, feedback | Form đăng ký có điều khiển `RegisterForm` | ✅ Hoàn thành (#46) |
| **Bài 5** | Validation thuần, `touched`, `isInvalid`, Regex SĐT/Email | Form đăng ký kiểm tra hợp lệ `ValidatedRegisterForm` | ✅ Hoàn thành (#47) |
| **Bài 6** | State mảng bất biến, thêm/sửa trực tiếp/xóa, phím Enter/Esc | Quản lý công việc `TodoList` | ✅ Hoàn thành (#48) |
| **Bài 7** | `useReducer` cơ bản, action, dispatch, selector tổng | Giỏ hàng `cartReducer`, `CartSummary`, `CartDemoPage` | ✅ Hoàn thành (#49) |
| **Bài 8** | `useReducer` form, validation, trạng thái gửi, async mock API | Form đăng nhập giả lập API `LoginForm`, `loginReducer` | ✅ Hoàn thành (#50) |
| **Bài 9** | `useContext`: `ThemeContext`, `AuthContext`, custom hook, `data-bs-theme` | Đổi giao diện Sáng/Tối và đăng nhập toàn cục `Header`, `Layout` | ✅ Hoàn thành (#51) |
| **Bài 10** | Tổng hợp: Context + useReducer + form checkout + Toast | Cửa hàng mini `MiniStoreApp` (`ShopPage`, `CartPage`, `CheckoutPage`) | ✅ Hoàn thành (#52) |

---

## 📸 Hình ảnh minh họa giao diện

### Bài 1: useState Cơ bản
![Bài 1 - QuantityPicker & MiniCart](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot9/lab4-hooks/screenshots/bai-1-quantity-picker-minicart.png)

### Bài 2: Controlled Input & Live Preview
![Bài 2 - ProfilePreview](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot9/lab4-hooks/screenshots/bai-2-profile-preview.png)

### Bài 3: Tìm kiếm, lọc và sắp xếp sản phẩm
![Bài 3 - ProductFilter](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot9/lab4-hooks/screenshots/bai-3-product-filter.png)

### Bài 4: Form đăng ký có điều khiển
![Bài 4 - RegisterForm](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot9/lab4-hooks/screenshots/bai-4-register-form.png)

### Bài 5: Form đăng ký có validation
![Bài 5 - ValidatedRegisterForm](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot9/lab4-hooks/screenshots/bai-5-validated-register-form.png)

### Bài 6: Todo list
![Bài 6 - TodoList](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot9/lab4-hooks/screenshots/bai-6-todo-list.png)

### Bài 7: Giỏ hàng với useReducer
![Bài 7 - CartReducer](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot9/lab4-hooks/screenshots/bai-7-cart-reducer.png)

### Bài 8: Form đăng nhập với useReducer
![Bài 8 - LoginReducer](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot9/lab4-hooks/screenshots/bai-8-login-reducer.png)

### Bài 9: Theme sáng/tối và đăng nhập với useContext
![Bài 9 - Theme & Auth Context](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot9/lab4-hooks/screenshots/bai-9-theme-auth-context.png)

### Bài 10: Cửa hàng mini tổng hợp
![Bài 10 - Mini Store](https://raw.githubusercontent.com/blu1606/FER202_FA26_HoangHTB/main/slot9/lab4-hooks/screenshots/bai-10-shop-mini-store.png)

---

## 💻 Hướng dẫn chạy cục bộ

```bash
# Cài đặt thư viện
pnpm install

# Khởi chạy máy chủ phát triển
pnpm dev

# Kiểm tra bản đóng gói sản phẩm
pnpm build
```
