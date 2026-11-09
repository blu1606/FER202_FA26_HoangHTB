import axios from 'axios';
import * as T from './userTypes';

const API = 'https://jsonplaceholder.typicode.com';

// ----- Action creators thường (trả về object) -----
const fetchUsersRequest = () => ({ type: T.FETCH_USERS_REQUEST });
const fetchUsersSuccess = (users) => ({
  type: T.FETCH_USERS_SUCCESS,
  payload: users,
});
const fetchUsersFailure = (error) => ({
  type: T.FETCH_USERS_FAILURE,
  payload: error,
});

export const selectUser = (id) => ({ type: T.SELECT_USER, payload: id });

// ----- Thunk (trả về HÀM bất đồng bộ) -----
export const fetchUsers = () => async (dispatch, getState) => {
  // Dùng getState: đã có dữ liệu thì không gọi lại API
  if (getState().users?.items?.length > 0) return;

  dispatch(fetchUsersRequest());
  try {
    const res = await axios.get(`${API}/users`);
    dispatch(fetchUsersSuccess(res.data));
  } catch (err) {
    dispatch(fetchUsersFailure(err.message));
  }
};

// Thunk có tham số + dispatch nhiều action
export const fetchPostsByUser = (userId) => async (dispatch) => {
  dispatch(selectUser(userId));
  dispatch({ type: T.FETCH_POSTS_REQUEST });
  try {
    const res = await axios.get(`${API}/posts`, { params: { userId } });
    dispatch({ type: T.FETCH_POSTS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: T.FETCH_POSTS_FAILURE, payload: err.message });
  }
};
