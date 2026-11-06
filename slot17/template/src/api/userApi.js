import axiosClient from './axiosClient';

/** Bỏ trường password trước khi trả về giao diện */
// eslint-disable-next-line no-unused-vars
const withoutPassword = ({ password, ...user }) => user;

/**
 * Endpoint người dùng – CÓ SẴN, KHÔNG sửa file này.
 *   userApi.getAll(signal)   → GET /users?_sort=id&_order=asc   → mảng user (không có password)
 *   userApi.register(data)   → kiểm tra trùng email rồi POST /users
 *                              data = { fullName, email, password, phone }
 *                              trùng email → throw { message: 'Email đã được sử dụng' }
 */
const userApi = {
  async getAll(signal) {
    const res = await axiosClient.get('/users', { params: { _sort: 'id', _order: 'asc' }, signal });
    return res.data.map(withoutPassword);
  },

  async register({ fullName, email, password, phone = '' }) {
    const existed = await axiosClient.get('/users', { params: { email } });
    if (existed.data.length > 0) throw { message: 'Email đã được sử dụng' };
    const res = await axiosClient.post('/users', {
      fullName,
      email,
      password,
      phone,
      role: 'customer',
      active: true,
      createdAt: new Date().toISOString(),
    });
    return withoutPassword(res.data);
  },
};

export default userApi;
