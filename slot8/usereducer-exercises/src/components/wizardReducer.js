import {
  COURSES,
  SCHEDULES,
  WIZARD_STEPS as STEPS,
} from '../data/exercise-data';

export { COURSES, SCHEDULES, STEPS };

// Danh sách trường theo từng bước
const STEP_FIELDS = [
  ['fullName', 'email', 'phone'],
  ['courseId', 'schedule'],
  ['agree'],
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateField = (name, values) => {
  const v = values[name];
  switch (name) {
    case 'fullName':
      return v && v.trim().length >= 3 ? '' : 'Họ tên ít nhất 3 ký tự';
    case 'email':
      return v && EMAIL_REGEX.test(v) ? '' : 'Email không đúng định dạng';
    case 'phone':
      return v && /^0\d{9}$/.test(v) ? '' : 'Số điện thoại gồm 10 số, bắt đầu bằng 0';
    case 'courseId':
      return v ? '' : 'Vui lòng chọn một khóa học';
    case 'schedule':
      return v ? '' : 'Vui lòng chọn lịch học';
    case 'agree':
      return v ? '' : 'Bạn cần xác nhận thông tin trước khi nộp';
    default:
      return '';
  }
};

export const validateStep = (step, values) =>
  STEP_FIELDS[step].reduce((errors, name) => {
    const message = validateField(name, values);
    return message ? { ...errors, [name]: message } : errors;
  }, {});

// Hàm init (tham số thứ 3 của useReducer): Dựng state ban đầu từ đối số
export const initWizard = (initialCourseId = 'react') => ({
  step: 0,
  maxVisited: 0,
  values: {
    fullName: '',
    email: '',
    phone: '',
    courseId: initialCourseId,
    schedule: '',
    agree: false,
  },
  errors: {},
  submitted: false,
});

export const wizardReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE': {
      const { name, value } = action.payload;
      const values = { ...state.values, [name]: value };
      // Nếu trường này đã bị báo lỗi thì kiểm tra lại ngay khi người dùng gõ
      const errors = state.errors[name]
        ? { ...state.errors, [name]: validateField(name, values) }
        : state.errors;
      return { ...state, values, errors };
    }
    case 'NEXT': {
      const errors = validateStep(state.step, state.values);
      if (Object.keys(errors).length > 0) return { ...state, errors };
      const step = Math.min(state.step + 1, STEPS.length - 1);
      return {
        ...state,
        step,
        maxVisited: Math.max(state.maxVisited, step),
        errors: {},
      };
    }
    case 'BACK':
      return { ...state, step: Math.max(state.step - 1, 0), errors: {} };
    case 'GO_TO':
      // Chỉ cho phép nhảy đến các bước đã từng đi qua
      return action.payload <= state.maxVisited
        ? { ...state, step: action.payload, errors: {} }
        : state;
    case 'SUBMIT': {
      const errors = validateStep(state.step, state.values);
      if (Object.keys(errors).length > 0) return { ...state, errors };
      return { ...state, submitted: true };
    }
    case 'RESET':
      return initWizard(action.payload);
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`);
  }
};
