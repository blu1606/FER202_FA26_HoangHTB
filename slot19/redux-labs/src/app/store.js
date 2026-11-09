import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counterReducer';
import todosReducer from '../redux/reducers/todosReducer';
import filterReducer from '../redux/reducers/filterReducer';
import userReducer from '../redux/users/userReducer';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import studentsReducer from '../features/students/studentsSlice';

// Đọc giỏ hàng đã lưu từ localStorage
function loadCart() {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? { items: JSON.parse(saved) } : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    filter: filterReducer,
    users: userReducer,
    cart: cartReducer,
    products: productsReducer,
    students: studentsReducer,
  },
  preloadedState: {
    cart: loadCart() ?? { items: [] },
  },
});

// Ghi giỏ hàng mỗi khi state thay đổi
store.subscribe(() => {
  try {
    const state = store.getState();
    if (state.cart?.items) {
      localStorage.setItem('cart', JSON.stringify(state.cart.items));
    }
  } catch {
    // Ignore localStorage errors
  }
});
