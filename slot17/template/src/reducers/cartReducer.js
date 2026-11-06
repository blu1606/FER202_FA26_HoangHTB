import { getFinalPrice } from '../utils/format';

/** Reducer giỏ hàng – CÓ SẴN, KHÔNG sửa file này */
export const MAX_QUANTITY = 10;

export const CART_ACTIONS = {
  ADD: 'cart/add', // payload: { car, quantity }
  INCREASE: 'cart/increase', // payload: id
  DECREASE: 'cart/decrease', // payload: id
  REMOVE: 'cart/remove', // payload: id
  CLEAR: 'cart/clear',
};

export const initialCart = { items: [] };

const limitOf = (stock) => Math.min(MAX_QUANTITY, stock);

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      const { car, quantity = 1 } = action.payload;
      if (car.stock === 0) return state;
      const limit = limitOf(car.stock);
      const existing = state.items.find((item) => item.id === car.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === car.id ? { ...item, quantity: Math.min(limit, item.quantity + quantity) } : item
          ),
        };
      }
      const newItem = {
        id: car.id,
        name: car.name,
        image: car.image,
        price: getFinalPrice(car),
        stock: car.stock,
        quantity: Math.min(limit, quantity),
      };
      return { ...state, items: [...state.items, newItem] };
    }
    case CART_ACTIONS.INCREASE:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: Math.min(limitOf(item.stock), item.quantity + 1) } : item
        ),
      };
    case CART_ACTIONS.DECREASE:
      return {
        ...state,
        items: state.items
          .map((item) => (item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0),
      };
    case CART_ACTIONS.REMOVE:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    case CART_ACTIONS.CLEAR:
      return initialCart;
    default:
      return state;
  }
}

export function getCartTotals(state) {
  return state.items.reduce(
    (acc, item) => ({
      totalQuantity: acc.totalQuantity + item.quantity,
      totalPrice: acc.totalPrice + item.price * item.quantity,
    }),
    { totalQuantity: 0, totalPrice: 0 }
  );
}
