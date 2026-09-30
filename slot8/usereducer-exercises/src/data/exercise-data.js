// Cấu hình tabs điều hướng
export const TABS_CONFIG = [
  { key: 'all', label: 'Tất cả bài tập' },
  { key: 'ex1', label: 'Bài 1: StepCounter' },
  { key: 'ex2', label: 'Bài 2: OrderTracker' },
  { key: 'ex3', label: 'Bài 3: KanbanBoard' },
  { key: 'ex4', label: 'Bài 4: CourseWizard' },
  { key: 'ex5', label: 'Bài 5: NotesBoard' },
];

// Bài 1: StepCounter
export const COUNTER_MIN = 0;
export const COUNTER_MAX = 100;
export const INITIAL_COUNTER_STATE = { count: 0, step: 1, history: [] };

// Bài 2: OrderTracker (State Machine)
export const ORDER_TRANSITIONS = {
  pending: { CONFIRM: 'confirmed', CANCEL: 'cancelled' },
  confirmed: { SHIP: 'shipping', CANCEL: 'cancelled' },
  shipping: { DELIVER: 'delivered' },
  delivered: {},
  cancelled: {},
};

export const ORDER_STATUS_INFO = {
  pending: { label: 'Chờ xác nhận', bg: 'secondary' },
  confirmed: { label: 'Đã xác nhận', bg: 'primary' },
  shipping: { label: 'Đang giao', bg: 'warning' },
  delivered: { label: 'Đã giao', bg: 'success' },
  cancelled: { label: 'Đã hủy', bg: 'danger' },
};

export const ORDER_EVENT_LABELS = {
  CONFIRM: 'Xác nhận',
  SHIP: 'Giao hàng',
  DELIVER: 'Đã nhận hàng',
  CANCEL: 'Hủy đơn',
};

export const INITIAL_ORDER_STATE = {
  status: 'pending',
  cancelReason: '',
  error: '',
  timeline: [{ status: 'pending', at: '08:00' }],
};

// Bài 3: KanbanBoard
export const KANBAN_COLUMNS = [
  { key: 'todo', title: 'Cần làm' },
  { key: 'doing', title: 'Đang làm' },
  { key: 'done', title: 'Hoàn thành' },
];

export const INITIAL_KANBAN_STATE = {
  nextId: 4,
  tasks: [
    { id: 1, title: 'Đọc lý thuyết useReducer', priority: 'high', column: 'done' },
    { id: 2, title: 'Làm bài Kanban', priority: 'high', column: 'doing' },
    { id: 3, title: 'Ôn lại spread operator', priority: 'low', column: 'todo' },
  ],
};

// Bài 4: CourseWizard
export const COURSES = [
  { id: 'react', name: 'ReactJS cơ bản', fee: 2500000 },
  { id: 'node', name: 'NodeJS & Express', fee: 3000000 },
  { id: 'fullstack', name: 'Fullstack MERN', fee: 5000000 },
];

export const SCHEDULES = ['Sáng 2-4-6', 'Tối 3-5-7', 'Cuối tuần'];

export const WIZARD_STEPS = ['Thông tin', 'Khóa học', 'Xác nhận'];

// Bài 5: NotesBoard
export const NOTE_COLORS = ['#fff3a3', '#c8f7c5', '#cfe8ff', '#ffd6e0'];

export const INITIAL_NOTES = {
  nextId: 3,
  items: [
    { id: 1, text: 'Reducer phải là hàm thuần', color: NOTE_COLORS[0], pinned: true },
    { id: 2, text: 'Không sửa trực tiếp state', color: NOTE_COLORS[2], pinned: false },
  ],
};
