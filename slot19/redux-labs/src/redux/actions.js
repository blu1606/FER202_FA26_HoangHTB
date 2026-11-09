import * as T from './actionTypes';

// id tạo ở action creator – KHÔNG tạo trong reducer (reducer phải là pure function)
export const addTodo = (text) => ({
  type: T.ADD_TODO,
  payload: { id: Date.now(), text, done: false },
});

export const toggleTodo = (id) => ({
  type: T.TOGGLE_TODO,
  payload: id,
});

export const deleteTodo = (id) => ({
  type: T.DELETE_TODO,
  payload: id,
});

export const editTodo = (id, text) => ({
  type: T.EDIT_TODO,
  payload: { id, text },
});

export const clearCompleted = () => ({
  type: T.CLEAR_COMPLETED,
});

export const setFilter = (filter) => ({
  type: T.SET_FILTER,
  payload: filter, // 'all' | 'active' | 'done'
});
