import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import carApi, { brandApi } from '../src/api/carApi';
import CarListPage from '../src/pages/CarListPage';
import { brands, cars } from './fixtures';
import { renderWithProviders } from './utils';

vi.mock('../src/api/carApi', () => ({
  default: { getAll: vi.fn(), getById: vi.fn() },
  brandApi: { getAll: vi.fn() },
}));

beforeEach(() => {
  carApi.getAll.mockResolvedValue(cars.map((c) => ({ ...c })));
  brandApi.getAll.mockResolvedValue(brands);
});

const renderPage = async () => {
  renderWithProviders(<CarListPage />, { route: '/cars' });
  await screen.findAllByRole('img');
};
const cardNames = () => screen.getAllByRole('heading', { level: 6 }).map((h) => h.textContent.trim());

describe('TODO-06 – Ô tìm theo tên + select hãng xe', () => {
  it('[TODO-06] gõ "toyota" → còn 3 xe', async () => {
    await renderPage();
    const search = screen.getByRole('searchbox', { name: 'Tìm theo tên' });
    await userEvent.type(search, 'toyota');
    expect(search).toHaveValue('toyota');
    expect(cardNames()).toEqual(['Toyota Vios G', 'Toyota Camry 2.5Q', 'Toyota Corolla Cross HEV']);
  });

  it('[TODO-06] select hãng xe có "Tất cả hãng xe" + 4 hãng từ API', async () => {
    await renderPage();
    const select = screen.getByRole('combobox', { name: 'Hãng xe' });
    const options = within(select).getAllByRole('option');
    expect(options[0]).toHaveTextContent('Tất cả hãng xe');
    expect(options[0]).toHaveValue('');
    expect(options.slice(1).map((o) => o.textContent)).toEqual(brands.map((b) => b.name));
  });

  it('[TODO-06] chọn "VinFast" → còn 3 xe', async () => {
    await renderPage();
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Hãng xe' }), 'VinFast');
    expect(cardNames()).toEqual(['VinFast VF 8 Plus', 'VinFast VF 5 Plus', 'VinFast VF 6']);
  });

  it('[TODO-06] bấm "Xóa lọc" → 2 ô trở về trống', async () => {
    await renderPage();
    const search = screen.getByRole('searchbox', { name: 'Tìm theo tên' });
    const select = screen.getByRole('combobox', { name: 'Hãng xe' });
    await userEvent.type(search, 'rs');
    await userEvent.selectOptions(select, 'Honda');
    await userEvent.click(screen.getByRole('button', { name: 'Xóa lọc' }));
    expect(search).toHaveValue('');
    expect(select).toHaveValue('');
    expect(cardNames()).toHaveLength(12);
  });
});

describe('TODO-07 – Dòng đếm kết quả + thông báo rỗng', () => {
  it('[TODO-07] hiện "Tìm thấy 12/12 mẫu xe"', async () => {
    await renderPage();
    expect(screen.getByTestId('result-count')).toHaveTextContent('Tìm thấy 12/12 mẫu xe');
  });

  it('[TODO-07] bật "Còn xe" → "Tìm thấy 10/12 mẫu xe"', async () => {
    await renderPage();
    await userEvent.click(screen.getByLabelText('Còn xe')); // switch có sẵn
    expect(screen.getByTestId('result-count')).toHaveTextContent('Tìm thấy 10/12 mẫu xe');
  });

  it('[TODO-07] không còn xe phù hợp → Alert vàng thay cho lưới', async () => {
    carApi.getAll.mockResolvedValue([{ ...cars[2] }, { ...cars[4] }]); // 2 xe hết hàng
    renderWithProviders(<CarListPage />, { route: '/cars' });
    await screen.findAllByRole('img');
    await userEvent.click(screen.getByLabelText('Còn xe')); // switch có sẵn
    const alert = screen.getByText('Không có mẫu xe phù hợp');
    expect(alert.closest('.alert')).toHaveClass('alert-warning');
    expect(screen.getByTestId('result-count')).toHaveTextContent('Tìm thấy 0/2 mẫu xe');
  });
});
