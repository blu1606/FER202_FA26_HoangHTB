export const FAQS = [
  { id: 1, question: 'React là gì?', answer: 'Thư viện JavaScript để xây dựng giao diện người dùng theo component.' },
  { id: 2, question: 'State khác props thế nào?', answer: 'Props do cha truyền xuống và chỉ đọc; state do chính component quản lý và thay đổi được.' },
  { id: 3, question: 'Vì sao phải dùng setState?', answer: 'Vì chỉ khi gọi hàm set, React mới biết dữ liệu đổi để render lại giao diện.' },
];

export const STAR_RATING_LABELS = ['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời'];

export const classifyBmi = (bmi) => {
  if (bmi < 18.5) return { label: 'Thiếu cân', variant: 'info' };
  if (bmi < 23) return { label: 'Bình thường', variant: 'success' };
  if (bmi < 25) return { label: 'Thừa cân', variant: 'warning' };
  return { label: 'Béo phì', variant: 'danger' };
};

export const CITIES = ['Hà Nội', 'Đà Nẵng', 'TP.HCM', 'Cần Thơ'];

export const INITIAL_STUDENTS = [
  { id: 1, name: 'Nguyễn Văn An', score: 8.5, contact: { city: 'Hà Nội' } },
  { id: 2, name: 'Trần Thị Bình', score: 4.5, contact: { city: 'Đà Nẵng' } },
  { id: 3, name: 'Lê Minh Châu', score: 6.0, contact: { city: 'TP.HCM' } },
];

export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    text: 'Hook nào dùng để lưu trạng thái cục bộ?',
    options: ['useEffect', 'useState', 'useRef', 'useMemo'],
    answer: 1,
  },
  {
    id: 'q2',
    text: 'Gọi setCount(count + 1) ba lần trong một sự kiện, count tăng bao nhiêu?',
    options: ['1', '2', '3', '0'],
    answer: 0,
  },
  {
    id: 'q3',
    text: 'Cách đúng để thêm phần tử vào mảng state?',
    options: ['list.push(x)', 'setList(list.push(x))', 'setList([...list, x])', 'list[list.length] = x'],
    answer: 2,
  },
  {
    id: 'q4',
    text: 'Checkbox có điều khiển dùng prop nào?',
    options: ['value', 'checked', 'selected', 'defaultValue'],
    answer: 1,
  },
];

export const TABS_CONFIG = [
  { key: 'all', label: 'Tất cả bài tập' },
  { key: 'b1', label: 'Bài 1: FAQ Accordion' },
  { key: 'b2', label: 'Bài 2: Đánh giá sao' },
  { key: 'b3', label: 'Bài 3: Máy tính BMI' },
  { key: 'b4', label: 'Bài 4: Quản lý điểm SV' },
  { key: 'b5', label: 'Bài 5: Quiz trắc nghiệm' },
];

export const HOMEWORK_TABS_CONFIG = TABS_CONFIG;

