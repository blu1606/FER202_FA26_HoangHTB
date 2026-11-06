# Test tự kiểm tra – AutoShop Mini (FER202)

Chạy test (không cần `npm start`, API đã được giả lập):

```bash
npm test                 # chạy tất cả
npm test -- todo06       # chỉ chạy file test có tên chứa "todo06" (todo01-03, todo04-05, todo06-07, todo08-09, todo10, todo11, todo12)
npm run test:watch       # tự chạy lại mỗi khi lưu file
```

| File test | TODO |
| --- | --- |
| `todo01-03.AppNavbar.test.jsx` | TODO-01, 02, 03 |
| `todo04-05.CarCard.test.jsx` | TODO-04, 05 |
| `todo06-07.CarListPage.test.jsx` | TODO-06, 07 |
| `todo08-09.CarDetailPage.test.jsx` | TODO-08, 09 |
| `todo10.ForbiddenPage.test.jsx` | TODO-10 |
| `todo11.AdminUserPage.test.jsx` | TODO-11 |
| `todo12.RegisterPage.test.jsx` | TODO-12 |
| `app.HomeRoute.test.jsx` | Yêu cầu chung: trang chủ `/` chỉ có Navbar (có sẵn, không tính điểm) |

- Mỗi test gắn mã TODO, ví dụ `[TODO-06]`. Nhìn `✓` / `×` là biết TODO nào đã đạt.
- Mã có dấu `-` (ví dụ `[TODO-05-]`) là test phụ, kiểm tra điều **không** được xảy ra. Bản khởi đầu có thể đã đạt một số test phụ.
- Khi chấm, giảng viên dùng **dữ liệu khác**. Đạt hết test chưa chắc được điểm tối đa nếu ghi cứng dữ liệu mẫu.
- **KHÔNG sửa** thư mục `test/`.
