import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import CarCard from '../src/components/CarCard';
import { cars } from './fixtures';
import { renderWithProviders } from './utils';

const vios = cars[0]; //  giảm 5%
const city = cars[1]; //  không giảm
const camry = cars[2]; // hết xe

describe('TODO-04 – CarCard: tên, hãng xe, đời xe', () => {
  it('[TODO-04] tên là link tới /cars/{id}', () => {
    renderWithProviders(<CarCard car={vios} />);
    expect(screen.getByRole('link', { name: 'Toyota Vios G' })).toHaveAttribute('href', '/cars/1');
  });

  it('[TODO-04] hiện Badge hãng xe và "Đời 2024 · Xăng"', () => {
    renderWithProviders(<CarCard car={vios} />);
    expect(screen.getByText('Toyota')).toHaveClass('badge');
    expect(screen.getByText(/Đời\s*2024\s*·\s*Xăng/)).toBeInTheDocument();
  });

  it('[TODO-04-] không lỗi khi xe không có brand', () => {
    renderWithProviders(<CarCard car={{ ...city, brand: undefined }} />);
    expect(screen.getByRole('link', { name: 'Honda City RS' })).toBeInTheDocument();
  });
});

describe('TODO-05 – CarCard: giá và hết xe', () => {
  it('[TODO-05] giá sau giảm màu đỏ đậm', () => {
    renderWithProviders(<CarCard car={vios} />);
    const price = screen.getByText(/517\.750\.000/);
    expect(price).toHaveClass('text-danger', 'fw-bold');
  });

  it('[TODO-05] discount > 0: có giá gốc gạch ngang và "-5%"', () => {
    renderWithProviders(<CarCard car={vios} />);
    expect(screen.getByText(/545\.000\.000/)).toHaveClass('text-decoration-line-through');
    expect(screen.getByText('-5%')).toBeInTheDocument();
  });

  it('[TODO-05-] discount = 0: KHÔNG có giá gạch ngang', () => {
    const { container } = renderWithProviders(<CarCard car={city} />);
    expect(screen.getByText(/609\.000\.000/)).toHaveClass('text-danger');
    expect(container.querySelector('.text-decoration-line-through')).toBeNull();
  });

  it('[TODO-05] hết xe: Badge "Hết xe" + nút disabled', () => {
    const onAdd = vi.fn();
    renderWithProviders(<CarCard car={camry} onAddToCart={onAdd} />);
    expect(screen.getAllByText('Hết xe').some((el) => el.classList.contains('badge'))).toBe(true);
    expect(screen.getByRole('button', { name: 'Hết xe' })).toBeDisabled();
  });

  it('[TODO-05-] còn xe: nút "Thêm vào giỏ" bấm được', async () => {
    const onAdd = vi.fn();
    renderWithProviders(<CarCard car={city} onAddToCart={onAdd} />);
    await userEvent.click(screen.getByRole('button', { name: 'Thêm vào giỏ' }));
    expect(onAdd).toHaveBeenCalledWith(city);
  });
});
