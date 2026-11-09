import { SET_FILTER } from '../actionTypes';

export default function filterReducer(state = 'all', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
}
