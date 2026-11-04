import { screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import orderApi from '../src/api/orderApi';
import AdminOrderPage from '../src/pages/admin/AdminOrderPage';
import { ADMIN, orders } from './fixtures';
import { renderWithProviders } from './utils';

vi.mock('../src/api/orderApi', () => ({
  default: { getAll: vi.fn(), create: vi.fn() },
}));

beforeEach(() => {
  orderApi.getAll.mockResolvedValue(orders.map((o) => ({ ...o })));
});

const renderPage = () =>
  renderWithProviders(<AdminOrderPage />, { route: '/admin/orders', path: '/admin/orders', user: ADMIN });

const bodyRows = () => within(screen.getAllByRole('rowgroup')[1]).getAllByRole('row');
const cells = (row) => within(row).getAllByRole('cell').map((c) => c.textContent.replace(/\s+/g, ' ').trim());

describe('TODO-11 – Quản lý đơn hàng', () => {
  it('[TODO-11] gọi orderApi.getAll() khi mở trang', async () => {
    renderPage();
    await screen.findByRole('heading', { name: /Đơn hàng/ });
    expect(orderApi.getAll).toHaveBeenCalled();
  });

  it('[TODO-11] hiện Loading "Đang tải đơn hàng..." khi đang tải', async () => {
    orderApi.getAll.mockImplementation(() => new Promise(() => {}));
    renderPage();
    expect(await screen.findByText('Đang tải đơn hàng...')).toBeInTheDocument();
  });

  it('[TODO-11] lỗi → hiện ErrorAlert với thông báo lỗi', async () => {
    orderApi.getAll.mockRejectedValue({ status: null, message: 'Không kết nối được máy chủ' });
    renderPage();
    const msg = await screen.findByText('Không kết nối được máy chủ');
    expect(msg.closest('.alert')).toHaveClass('alert-danger');
  });

  it('[TODO-11] tiêu đề "Đơn hàng (6)", đếm theo dữ liệu thật (2 đơn → "(2)")', async () => {
    const { unmount } = renderPage();
    expect(await screen.findByRole('heading', { name: 'Đơn hàng (6)' })).toBeInTheDocument();
    unmount();
    orderApi.getAll.mockResolvedValue(orders.slice(0, 2));
    renderPage();
    expect(await screen.findByRole('heading', { name: 'Đơn hàng (2)' })).toBeInTheDocument();
  });

  it('[TODO-11] bảng có 6 dòng; dòng đầu: "#6" · khách · tổng số phần · tổng tiền', async () => {
    renderPage();
    await screen.findByRole('heading', { name: 'Đơn hàng (6)' });
    const rows = bodyRows();
    expect(rows).toHaveLength(6);
    const c = cells(rows[0]);
    expect(c.slice(0, 3)).toEqual(['#6', 'Hoàng Văn Em', '3']);
    expect(c[3]).toMatch(/109\.500/);
  });

  it('[TODO-11] Badge trạng thái đúng nhãn + màu', async () => {
    renderPage();
    await screen.findByRole('heading', { name: 'Đơn hàng (6)' });
    const rows = bodyRows();
    expect(within(rows[0]).getByText('Chờ xác nhận')).toHaveClass('badge', 'bg-warning');
    expect(within(rows[1]).getByText('Đã hủy')).toHaveClass('badge', 'bg-secondary');
    expect(within(rows[2]).getByText('Đã giao')).toHaveClass('badge', 'bg-success');
    expect(within(rows[3]).getByText('Đã xác nhận')).toHaveClass('badge', 'bg-primary');
  });

  it('[TODO-11] doanh thu = tổng tiền các đơn "delivered" (281.400 ₫)', async () => {
    renderPage();
    await screen.findByRole('heading', { name: 'Đơn hàng (6)' });
    expect(screen.getByTestId('revenue')).toHaveTextContent(/281\.400/);
  });
});
