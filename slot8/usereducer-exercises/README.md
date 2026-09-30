# Slot 8 - React Hook: useReducer Exercises

Dự án thực hành chuyên sâu 5 bài tập về `useReducer` trong môn **FER202** (Front-End Web Development) tại **FPT University**.

## Công nghệ sử dụng
- **React 19**
- **Vite 8**
- **React-Bootstrap 2.10** & **Bootstrap 5.3**
- **Oxlint** & **Playwright**

## Danh sách 5 bài tập

| Bài | Tên bài tập | File Component | Kiến thức chính |
| :---: | :--- | :--- | :--- |
| **1** | **Bộ đếm có bước nhảy & Lịch sử** | `src/components/StepCounter.jsx` | Chuyển từ nhiều `useState` sang 1 reducer, hằng số action, kẹp `0–100`, ghi 5 lịch sử gần nhất. |
| **2** | **Theo dõi trạng thái đơn hàng** | `src/components/OrderTracker.jsx` | Máy trạng thái (State Machine) với bảng `TRANSITIONS`, validation lý do hủy, mốc thời gian qua `action.at`. |
| **3** | **Bảng Kanban** | `src/components/KanbanBoard.jsx`<br>`src/components/taskReducer.js` | Reducer tách file riêng (thuần JS), action creators, `nextId` trong state, phối hợp `useState` cho filter/input. |
| **4** | **Đăng ký khóa học nhiều bước** | `src/components/CourseWizard.jsx`<br>`src/components/wizardReducer.js` | Hàm `init(initialCourseId)` (tham số thứ 3 của `useReducer`), validation theo từng bước, ghi nhớ `maxVisited`. |
| **5** | **Bảng ghi chú có Hoàn tác / Làm lại** | `src/components/NotesBoard.jsx`<br>`src/components/undoable.js`<br>`src/components/notesReducer.js` | Higher-order reducer `undoable(reducer)`, quản lý `past/present/future` (tối đa 20 bước), phím tắt `Ctrl+Z` / `Ctrl+Y`. |

## Hướng dẫn chạy dự án

```bash
# Di chuyển vào thư mục dự án
cd slot8/usereducer-exercises

# Cài đặt thư viện
pnpm install

# Khởi chạy dev server
pnpm dev

# Build kiểm tra
pnpm build

# Chụp ảnh tự động
node scripts/capture-screenshots.js
```
