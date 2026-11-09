// 1. Action types (hằng số tránh gõ sai chuỗi)
export const INCREMENT = 'counter/increment';
export const DECREMENT = 'counter/decrement';
export const INCREMENT_BY_AMOUNT = 'counter/incrementByAmount';
export const RESET = 'counter/reset';
export const DOUBLE = 'counter/double';

// 2. Action creators
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const incrementByAmount = (amount) => ({
  type: INCREMENT_BY_AMOUNT,
  payload: amount,
});
export const reset = () => ({ type: RESET });
export const double = () => ({ type: DOUBLE });

