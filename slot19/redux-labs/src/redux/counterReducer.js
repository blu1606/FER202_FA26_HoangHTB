import {
  INCREMENT,
  DECREMENT,
  INCREMENT_BY_AMOUNT,
  RESET,
  DOUBLE,
} from './counterActions';

const initialState = { value: 0 };

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    case INCREMENT_BY_AMOUNT:
      return { ...state, value: state.value + (Number(action.payload) || 0) };
    case DOUBLE:
      return { ...state, value: state.value * 2 };
    case RESET:
      return initialState;
    default:
      return state;
  }
}

