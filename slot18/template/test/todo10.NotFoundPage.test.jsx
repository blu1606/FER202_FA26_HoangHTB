import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Route } from 'react-router-dom';
import NotFoundPage from '../src/pages/NotFoundPage';
import { renderWithProviders } from './utils';

const render404 = (path, opts = {}) => renderWithProviders(<NotFoundPage />, { route: path, path, ...opts });

describe('TODO-10 – NotFoundPage', () => {
  it('[TODO-10] hiện đường dẫn hiện tại trong thẻ <code>', () => {
    render404('/khong-ton-tai');
    expect(screen.getByText('/khong-ton-tai', { selector: 'code' })).toBeInTheDocument();
    expect(screen.getByText(/không tồn tại\./)).toHaveTextContent('Đường dẫn /khong-ton-tai không tồn tại.');
  });

  it('[TODO-10] dùng đường dẫn thật (không ghi cứng)', () => {
    render404('/menu/abc');
    expect(screen.getByText('/menu/abc', { selector: 'code' })).toBeInTheDocument();
  });

  it('[TODO-10] nút "Xem thực đơn" tới /dishes', () => {
    render404('/abc');
    expect(screen.getByRole('button', { name: 'Xem thực đơn' })).toHaveAttribute('href', '/dishes');
  });

  it('[TODO-10] nút "← Quay lại" về trang trước', async () => {
    render404('/abc', {
      entries: ['/dishes/1', '/abc'],
      extraRoutes: <Route path="/dishes/1" element={<p>Chi tiết</p>} />,
    });
    await userEvent.click(screen.getByRole('button', { name: '← Quay lại' }));
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/dishes\/1$/);
  });

  it('[TODO-10-] vẫn giữ tiêu đề 404 có sẵn', () => {
    render404('/abc');
    expect(screen.getByRole('heading', { name: 'Không tìm thấy trang' })).toBeInTheDocument();
  });
});
