# Test tự kiểm tra – FPT Food Mini (FER202 FA26 · Đề 3)

Chạy test (không cần `npm start`, API đã được giả lập):

```bash
npm test                 # chạy tất cả
npm test -- todo06       # chỉ chạy file test có tên chứa "todo06" (todo01-03, todo04-05, todo06-07, todo08-09, todo10, todo11, todo12)
npm run test:watch       # tự chạy lại mỗi khi lưu file
```

| File test | TODO |
| --- | --- |
| `todo01-03.AppNavbar.test.jsx` | TODO-01, 02, 03 |
| `todo04-05.DishCard.test.jsx` | TODO-04, 05 |
| `todo06-07.DishListPage.test.jsx` | TODO-06, 07 |
| `todo08-09.DishDetailPage.test.jsx` | TODO-08, 09 |
| `todo10.NotFoundPage.test.jsx` | TODO-10 |
| `todo11.AdminOrderPage.test.jsx` | TODO-11 |
| `todo12.ReservationPage.test.jsx` | TODO-12 |
| `app.HomeRoute.test.jsx` | Yêu cầu chung: trang chủ `/` chỉ có Navbar (có sẵn, không tính điểm) |

- Mỗi test gắn mã TODO, ví dụ `[TODO-06]`. Nhìn `✓` / `×` là biết TODO nào đã đạt.
- Mã có dấu `-` (ví dụ `[TODO-05-]`) là test phụ. Bản khởi đầu đã đạt sẵn các test phụ.
- Khi chấm, giảng viên dùng thêm **dữ liệu khác**. Đạt hết test chưa chắc được điểm tối đa nếu ghi cứng dữ liệu mẫu.
- **KHÔNG sửa** thư mục `test/`.
