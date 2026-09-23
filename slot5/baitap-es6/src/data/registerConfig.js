export const fields = [
  {
    id: 'fullName',
    name: 'fullName',
    label: 'Họ và tên',
    type: 'text',
    placeholder: 'Nguyễn Văn An',
    required: true,
  },
  {
    id: 'email',
    name: 'email',
    label: 'Địa chỉ Email',
    type: 'email',
    placeholder: 'an.nguyen@fpt.edu.vn',
    required: true,
    helpText: 'Chúng tôi cam kết bảo mật thông tin cá nhân của bạn.',
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Số điện thoại',
    type: 'tel',
    placeholder: '0901234567',
    required: true,
  },
  {
    id: 'password',
    name: 'password',
    label: 'Mật khẩu',
    type: 'password',
    placeholder: '••••••••',
    required: true,
  },
  {
    id: 'confirmPassword',
    name: 'confirmPassword',
    label: 'Xác nhận mật khẩu',
    type: 'password',
    placeholder: '••••••••',
    required: true,
  },
];

export const genders = ['Nam', 'Nữ', 'Khác'];

export const majors = [
  'Kỹ thuật phần mềm',
  'An toàn thông tin',
  'Trí tuệ nhân tạo',
  'Thiết kế mỹ thuật số',
  'Quản trị kinh doanh',
];
