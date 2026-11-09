import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import filterReducer from './filterReducer';

export default combineReducers({
  todos: todosReducer, // state.todos  : mảng
  filter: filterReducer, // state.filter : chuỗi
});
