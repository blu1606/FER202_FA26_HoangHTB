/**
 * Hàm kiểm tra dữ liệu form – CÓ SẴN, KHÔNG sửa file này.
 * Mỗi hàm nhận object values và trả về object lỗi (hợp lệ → {}).
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^0\d{9}$/;

/** Dùng cho LoginPage (có sẵn) */
export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = 'Vui lòng nhập email';
  else if (!EMAIL_REGEX.test(email.trim())) errors.email = 'Email không đúng định dạng';
  if (!password) errors.password = 'Vui lòng nhập mật khẩu';
  else if (password.length < 8) errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
  return errors;
}

/** Giá trị ban đầu của form đăng ký (TODO-12) */
export const EMPTY_REGISTER = { fullName: '', email: '', phone: '', password: '', confirmPassword: '', agree: false };

/**
 * Dùng cho RegisterPage (TODO-12)
 * | Trường          | Quy tắc                                       |
 * | fullName        | bắt buộc, ít nhất 3 ký tự                      |
 * | email           | bắt buộc, đúng định dạng                       |
 * | phone           | không bắt buộc; nếu nhập: 10 số, bắt đầu bằng 0 |
 * | password        | bắt buộc, ≥ 8 ký tự, có cả chữ và số           |
 * | confirmPassword | trùng password                                 |
 * | agree           | phải tích (true)                               |
 */
export function validateRegister(values) {
  const errors = {};
  const fullName = values.fullName.trim();
  if (!fullName) errors.fullName = 'Vui lòng nhập họ tên';
  else if (fullName.length < 3) errors.fullName = 'Họ tên phải có ít nhất 3 ký tự';

  if (!values.email.trim()) errors.email = 'Vui lòng nhập email';
  else if (!EMAIL_REGEX.test(values.email.trim())) errors.email = 'Email không đúng định dạng';

  if (values.phone.trim() && !PHONE_REGEX.test(values.phone.trim()))
    errors.phone = 'Số điện thoại gồm 10 số, bắt đầu bằng 0';

  if (!values.password) errors.password = 'Vui lòng nhập mật khẩu';
  else if (values.password.length < 8) errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
  else if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password))
    errors.password = 'Mật khẩu phải có cả chữ và số';

  if (!values.confirmPassword) errors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
  else if (values.confirmPassword !== values.password) errors.confirmPassword = 'Mật khẩu nhập lại không khớp';

  if (!values.agree) errors.agree = 'Bạn cần đồng ý điều khoản';
  return errors;
}
