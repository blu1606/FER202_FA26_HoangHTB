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

/** Giá trị ban đầu của form đăng ký (có sẵn) */
export const EMPTY_REGISTER = { fullName: '', email: '', phone: '', password: '', confirmPassword: '', agree: false };

/**
 * Dùng cho RegisterPage (có sẵn)
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

/** Giá trị ban đầu của form đặt bàn (TODO-12) */
export const EMPTY_RESERVATION = { name: '', phone: '', date: '', time: '18:00', guests: '2', note: '' };

/** Các khung giờ nhận đặt bàn */
export const TIME_SLOTS = ['11:00', '11:30', '12:00', '12:30', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];

/** Ngày hôm nay dạng "YYYY-MM-DD" (theo giờ máy) */
export const todayISO = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

/**
 * Dùng cho ReservationPage (TODO-12)
 * | Trường | Quy tắc                                              |
 * | name   | bắt buộc, ít nhất 3 ký tự                             |
 * | phone  | bắt buộc, 10 số, bắt đầu bằng 0                       |
 * | date   | bắt buộc, không được trước hôm nay                    |
 * | time   | phải thuộc TIME_SLOTS                                 |
 * | guests | bắt buộc, số nguyên từ 1 đến 20                       |
 * | note   | không bắt buộc, tối đa 150 ký tự                      |
 */
export function validateReservation(values) {
  const errors = {};
  const name = values.name.trim();
  if (!name) errors.name = 'Vui lòng nhập tên người đặt';
  else if (name.length < 3) errors.name = 'Tên phải có ít nhất 3 ký tự';

  const phone = values.phone.trim();
  if (!phone) errors.phone = 'Vui lòng nhập số điện thoại';
  else if (!PHONE_REGEX.test(phone)) errors.phone = 'Số điện thoại gồm 10 số, bắt đầu bằng 0';

  if (!values.date) errors.date = 'Vui lòng chọn ngày';
  else if (values.date < todayISO()) errors.date = 'Không thể đặt bàn cho ngày đã qua';

  if (!TIME_SLOTS.includes(values.time)) errors.time = 'Vui lòng chọn khung giờ';

  const guests = String(values.guests).trim();
  if (!guests) errors.guests = 'Vui lòng nhập số khách';
  else if (!/^\d+$/.test(guests) || Number(guests) < 1 || Number(guests) > 20)
    errors.guests = 'Số khách từ 1 đến 20';

  if (values.note.length > 150) errors.note = 'Ghi chú tối đa 150 ký tự';
  return errors;
}
