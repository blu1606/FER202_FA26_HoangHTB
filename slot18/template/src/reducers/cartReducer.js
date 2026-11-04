import { getFinalPrice } from '../utils/format';

/** Reducer giỏ món – CÓ SẴN, KHÔNG sửa file này */
export const MAX_QUANTITY = 10;

export const CART_ACTIONS = {
  ADD: 'cart/add', // payload: { dish, quantity }
  INCREASE: 'cart/increase', // payload: id
  DECREASE: 'cart/decrease', // payload: id
  REMOVE: 'cart/remove', // payload: id
  CLEAR: 'cart/clear',
};

export const initialCart = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD: {
      const { dish, quantity = 1 } = action.payload;
      if (dish.available === false) return state; // món tạm hết → không thêm
      const existing = state.items.find((item) => item.id === dish.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === dish.id ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + quantity) } : item
          ),
        };
      }
      const newItem = {
        id: dish.id,
        name: dish.name,
        image: dish.image,
        price: getFinalPrice(dish),
        quantity: Math.min(MAX_QUANTITY, quantity),
      };
      return { ...state, items: [...state.items, newItem] };
    }
    case CART_ACTIONS.INCREASE:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1) } : item
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
