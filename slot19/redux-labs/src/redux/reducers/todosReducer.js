import * as T from '../actionTypes';

const initialState = [
  { id: 1, text: 'Học Redux cơ bản', done: true },
  { id: 2, text: 'Làm bài tập Todo', done: false },
];

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case T.ADD_TODO:
      return [...state, action.payload]; // thêm phần tử mới

    case T.TOGGLE_TODO:
      return state.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      ); // sửa trường done

    case T.EDIT_TODO:
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, text: action.payload.text } : t
      );

    case T.DELETE_TODO:
      return state.filter((t) => t.id !== action.payload); // xóa phần tử

    case T.CLEAR_COMPLETED:
      return state.filter((t) => !t.done);

    default:
      return state;
  }
}
