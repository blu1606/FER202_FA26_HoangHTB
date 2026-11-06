import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userApi from '../src/api/userApi';
import RegisterPage from '../src/pages/RegisterPage';
import { renderWithProviders } from './utils';

vi.mock('../src/api/userApi', () => ({
  default: { getAll: vi.fn(), register: vi.fn() },
}));

beforeEach(() => {
  userApi.register.mockImplementation(async (data) => ({ id: 99, role: 'customer', active: true, ...data }));
});

const renderPage = () => renderWithProviders(<RegisterPage />, { route: '/register', path: '/register' });

const fillValid = async ({ email = 'mai@autoshop.vn' } = {}) => {
  await userEvent.type(screen.getByLabelText(/Họ tên/), '  Ngô Thị Mai ');
  await userEvent.type(screen.getByLabelText(/^Email/), email);
  await userEvent.type(screen.getByLabelText(/^Mật khẩu/), 'mai12345');
  await userEvent.type(screen.getByLabelText(/Nhập lại mật khẩu/), 'mai12345');
  await userEvent.click(screen.getByLabelText('Tôi đồng ý với điều khoản'));
};

describe('TODO-12 – Form đăng ký', () => {
  it('[TODO-12] có ô Email (register-email, type email)', () => {
    renderPage();
    const email = screen.getByLabelText(/^Email/);
    expect(email).toHaveAttribute('id', 'register-email');
    expect(email).toHaveAttribute('type', 'email');
    expect(email).toHaveAttribute('name', 'email');
  });

  it('[TODO-12] có ô Mật khẩu (register-password, type password)', () => {
    renderPage();
    const pw = screen.getByLabelText(/^Mật khẩu/);
    expect(pw).toHaveAttribute('id', 'register-password');
    expect(pw).toHaveAttribute('type', 'password');
    expect(pw).toHaveAttribute('name', 'password');
  });

  it('[TODO-12] email sai định dạng → "Email không đúng định dạng" (sau khi rời ô)', async () => {
    renderPage();
    const email = screen.getByLabelText(/^Email/);
    await userEvent.type(email, 'abc');
    await userEvent.tab();
    expect(email).toHaveClass('is-invalid');
    expect(screen.getByText('Email không đúng định dạng')).toBeInTheDocument();
  });

  it('[TODO-12] mật khẩu thiếu số → "Mật khẩu phải có cả chữ và số"', async () => {
    renderPage();
    await userEvent.type(screen.getByLabelText(/^Mật khẩu/), 'abcdefgh');
    await userEvent.tab();
    expect(screen.getByText('Mật khẩu phải có cả chữ và số')).toBeInTheDocument();
  });

  it('[TODO-12] submit form trống → hiện lỗi và KHÔNG gọi API', async () => {
    renderPage();
    await userEvent.click(screen.getByRole('button', { name: 'Đăng ký' }));
    expect(screen.getByText(/Còn \d+ mục chưa hợp lệ/)).toBeInTheDocument();
    expect(screen.getByText('Vui lòng nhập họ tên')).toBeInTheDocument();
    expect(userApi.register).not.toHaveBeenCalled();
  });

  it('[TODO-12] đăng ký hợp lệ → gọi API (đã trim), toast, chuyển /login', async () => {
    renderPage();
    await fillValid();
    await userEvent.click(screen.getByRole('button', { name: 'Đăng ký' }));
    expect(userApi.register).toHaveBeenCalledWith({
      fullName: 'Ngô Thị Mai',
      email: 'mai@autoshop.vn',
      phone: '',
      password: 'mai12345',
    });
    expect(await screen.findByText('Đăng ký thành công, vui lòng đăng nhập')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/login');
  });

  it('[TODO-12] email trùng → Alert đỏ "Email đã được sử dụng"', async () => {
    userApi.register.mockRejectedValue({ message: 'Email đã được sử dụng' });
    renderPage();
    await fillValid({ email: 'khach@autoshop.vn' });
    await userEvent.click(screen.getByRole('button', { name: 'Đăng ký' }));
    const alert = await screen.findByText('Email đã được sử dụng');
    expect(alert.closest('.alert')).toHaveClass('alert-danger');
    expect(screen.getByTestId('location')).toHaveTextContent('/register');
    expect(screen.getByRole('button', { name: 'Đăng ký' })).toBeEnabled();
  });
});
