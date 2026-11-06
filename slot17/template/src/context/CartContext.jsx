import { createContext, useContext, useMemo, useReducer } from 'react';
import { CART_ACTIONS, cartReducer, getCartTotals, initialCart } from '../reducers/cartReducer';

/**
 * Giỏ hàng (lưu trong bộ nhớ) – CÓ SẴN, KHÔNG sửa file này.
 *   const { items, totalQuantity, totalPrice, addToCart, increase, decrease, remove, clear } = useCart();
 *   addToCart(car, quantity = 1)   car = 1 mẫu xe
 */
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  const value = useMemo(
    () => ({
      items: cart.items,
      ...getCartTotals(cart),
      addToCart: (car, quantity = 1) => dispatch({ type: CART_ACTIONS.ADD, payload: { car, quantity } }),
      increase: (id) => dispatch({ type: CART_ACTIONS.INCREASE, payload: id }),
      decrease: (id) => dispatch({ type: CART_ACTIONS.DECREASE, payload: id }),
      remove: (id) => dispatch({ type: CART_ACTIONS.REMOVE, payload: id }),
      clear: () => dispatch({ type: CART_ACTIONS.CLEAR }),
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart phải dùng bên trong CartProvider');
  return ctx;
};
