import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Route } from 'react-router-dom';
import ForbiddenPage from '../src/pages/ForbiddenPage';
import { CUSTOMER, users } from './fixtures';
import { renderWithProviders } from './utils';

describe('TODO-10 – ForbiddenPage', () => {
  it('[TODO-10] đã đăng nhập: hiện email và vai trò', () => {
    renderWithProviders(<ForbiddenPage />, { route: '/403', path: '/403', user: CUSTOMER });
    expect(
      screen.getByText('Bạn đang đăng nhập với tài khoản khach@autoshop.vn (vai trò: customer)')
    ).toBeInTheDocument();
  });

  it('[TODO-10] dùng dữ liệu thật của user (không ghi cứng)', () => {
    renderWithProviders(<ForbiddenPage />, { route: '/403', path: '/403', user: users[2] });
    expect(screen.getByText(/binh@autoshop\.vn \(vai trò: customer\)/)).toBeInTheDocument();
  });

  it('[TODO-10] nút "Về danh sách xe" tới /cars', () => {
    renderWithProviders(<ForbiddenPage />, { route: '/403', path: '/403', user: CUSTOMER });
    expect(screen.getByRole('button', { name: 'Về danh sách xe' })).toHaveAttribute('href', '/cars');
  });

  it('[TODO-10] nút "← Quay lại" về trang trước', async () => {
    renderWithProviders(<ForbiddenPage />, {
      entries: ['/cars/1', '/403'],
      path: '/403',
      user: CUSTOMER,
      extraRoutes: <Route path="/cars/1" element={<p>Chi tiết</p>} />,
    });
    await userEvent.click(screen.getByRole('button', { name: '← Quay lại' }));
    expect(screen.getByTestId('location')).toHaveTextContent('/cars/1');
  });

  it('[TODO-10-] chưa đăng nhập: KHÔNG hiện dòng thông tin tài khoản', () => {
    renderWithProviders(<ForbiddenPage />, { route: '/403', path: '/403' });
    expect(screen.queryByText(/Bạn đang đăng nhập/)).not.toBeInTheDocument();
  });
});
