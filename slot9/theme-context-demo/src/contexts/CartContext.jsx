import { createContext, useContext, useReducer } from 'react';
import { cartReducer, initialCart } from './cartReducer';

// 1. Tach 2 context rieng biet de toi uu re-render
export const CartStateContext = createContext(null);
export const CartDispatchContext = createContext(null);

// 2. Component CartProvider long 2 provider
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

// 3. Custom hook useCart de doc state gio hang
export function useCart() {
  const ctx = useContext(CartStateContext);
  if (ctx === null) {
    throw new Error('useCart phai nam ben trong <CartProvider>');
  }
  return ctx;
}

// 4. Custom hook useCartDispatch chi lay ham dispatch (khong gay re-render khi cart thay doi)
export function useCartDispatch() {
  const ctx = useContext(CartDispatchContext);
  if (ctx === null) {
    throw new Error('useCartDispatch phai nam ben trong <CartProvider>');
  }
  return ctx;
}
