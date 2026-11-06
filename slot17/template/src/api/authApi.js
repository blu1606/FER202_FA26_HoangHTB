import axiosClient from './axiosClient';

/**
 * Đăng nhập giả lập – CÓ SẴN, KHÔNG sửa file này.
 *   authApi.login(email, password) → { user, token }   (user KHÔNG có password)
 *   Sai tài khoản → throw { message: 'Email hoặc mật khẩu không đúng' }
 *   Tài khoản bị khoá (active = false) → throw { message: 'Tài khoản đã bị khoá' }
 */
const authApi = {
  async login(email, password) {
    const res = await axiosClient.get('/users', { params: { email, password } });
    if (res.data.length === 0) throw { message: 'Email hoặc mật khẩu không đúng' };
    // eslint-disable-next-line no-unused-vars
    const { password: _pw, ...user } = res.data[0];
    if (user.active === false) throw { message: 'Tài khoản đã bị khoá' };
    return { user, token: btoa(`${user.id}:${Date.now()}`) };
  },
};

export default authApi;
