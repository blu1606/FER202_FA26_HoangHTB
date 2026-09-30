# Slot 7 - Bài Tập Về Nhà (BTVN): React Hook useState

Dự án thực hành 5 bài tập về nhà cho chủ đề `useState` trong môn **FER202** (Front-End Web Development) tại **FPT University**.

## Công nghệ sử dụng
- **React 19**
- **Vite 8**
- **React-Bootstrap 2.10** & **Bootstrap 5.3**
- **Oxlint**

## Danh sách 5 bài tập về nhà

| Bài | Tên bài | Kiến thức `useState` áp dụng | Mô tả chức năng |
| :---: | :--- | :--- | :--- |
| **1** | **FAQ Accordion** | Boolean state, Lifting State Up | Mở/đóng câu hỏi FAQ. Hỗ trợ 2 chế độ: mở độc lập hoặc chỉ mở 1 câu tại một thời điểm, nút "Đóng tất cả". |
| **2** | **Đánh giá sao & Nhận xét** | Controlled Component, Derived state | Đánh giá 1–5 sao với hiệu ứng hover mượt mà, form nhận xét (tối thiểu 5 ký tự), tính điểm trung bình dẫn xuất. |
| **3** | **Máy tính BMI** | Ô số lưu chuỗi, Dữ liệu dẫn xuất | Nhập chiều cao, cân nặng; tự động chuyển đổi đơn vị `cm` ↔ `m`; kiểm tra phạm vi hợp lệ và hiển thị Alert phân loại thể trạng theo chuẩn châu Á. |
| **4** | **Quản lý điểm SV** | Mảng Object lồng nhau (`contact.city`) | Bảng sinh viên với khả năng sửa điểm trực tiếp (kẹp 0–10), chọn thành phố lồng nhau, thêm/xóa sinh viên, sắp xếp A-Z / Điểm số, nút "+0.5 cả lớp" và thanh thống kê sĩ số / điểm TB / tỷ lệ đạt. |
| **5** | **Quiz trắc nghiệm** | Lazy Initializer, Reset qua `key` | Xáo trộn ngẫu nhiên câu hỏi bằng Fisher–Yates, lưu câu trả lời dạng object `answers`, điều hướng từng câu với Progress bar và reset toàn bộ state bằng cách thay đổi prop `key={attempt}`. |

## Hướng dẫn chạy dự án

```bash
# Di chuyển vào thư mục dự án
cd usestate-btvn

# Cài đặt thư viện (nếu chưa có)
pnpm install

# Khởi chạy dev server
pnpm dev

# Build kiểm tra sản phẩm
pnpm build
```
