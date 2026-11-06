import { screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userApi from '../src/api/userApi';
import AdminUserPage from '../src/pages/admin/AdminUserPage';
import { ADMIN, users } from './fixtures';
import { renderWithProviders } from './utils';

vi.mock('../src/api/userApi', () => ({
  default: { getAll: vi.fn(), register: vi.fn() },
}));

beforeEach(() => {
  userApi.getAll.mockResolvedValue(users.map((u) => ({ ...u })));
});

const renderPage = () =>
  renderWithProviders(<AdminUserPage />, { route: '/admin/users', path: '/admin/users', user: ADMIN });

const bodyRows = () => within(screen.getAllByRole('rowgroup')[1]).getAllByRole('row');

describe('TODO-11 – Danh sách người dùng', () => {
  it('[TODO-11] gọi userApi.getAll() khi mở trang', async () => {
    renderPage();
    await screen.findByText('Hoàng Văn Em');
    expect(userApi.getAll).toHaveBeenCalled();
  });

  it('[TODO-11] hiện Loading khi đang tải', async () => {
    userApi.getAll.mockImplementation(() => new Promise(() => {}));
    renderPage();
    expect(await screen.findByText('Đang tải người dùng...')).toBeInTheDocument();
  });

  it('[TODO-11] lỗi → hiện ErrorAlert với thông báo lỗi', async () => {
    userApi.getAll.mockRejectedValue({ status: null, message: 'Không kết nối được máy chủ' });
    renderPage();
    const msg = await screen.findByText('Không kết nối được máy chủ');
    expect(msg.closest('.alert')).toHaveClass('alert-danger');
  });

  it('[TODO-11] tiêu đề "Quản lý người dùng (6)"', async () => {
    renderPage();
    expect(await screen.findByRole('heading', { name: 'Quản lý người dùng (6)' })).toBeInTheDocument();
  });

  it('[TODO-11] tiêu đề đếm theo dữ liệu thật (3 user)', async () => {
    userApi.getAll.mockResolvedValue(users.slice(0, 3));
    renderPage();
    expect(await screen.findByRole('heading', { name: 'Quản lý người dùng (3)' })).toBeInTheDocument();
  });

  it('[TODO-11] bảng có 6 dòng, đủ ID · Họ tên · Email', async () => {
    renderPage();
    await screen.findByText('Hoàng Văn Em');
    const rows = bodyRows();
    expect(rows).toHaveLength(6);
    const cells = within(rows[1]).getAllByRole('cell').map((c) => c.textContent.trim());
    expect(cells.slice(0, 3)).toEqual(['2', 'Nguyễn Văn An', 'khach@autoshop.vn']);
  });

  it('[TODO-11] Badge vai trò và trạng thái đúng', async () => {
    renderPage();
    await screen.findByText('Hoàng Văn Em');
    const rows = bodyRows();
    expect(within(rows[0]).getByText('Admin')).toHaveClass('bg-danger');
    expect(within(rows[1]).getByText('Khách hàng')).toHaveClass('bg-secondary');
    expect(within(rows[3]).getByText('Đã khoá')).toHaveClass('bg-dark');
    expect(within(rows[0]).getByText('Hoạt động')).toHaveClass('bg-success');
  });
});
