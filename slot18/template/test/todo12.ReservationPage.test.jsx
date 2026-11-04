import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import reservationApi from '../src/api/reservationApi';
import ReservationPage from '../src/pages/ReservationPage';
import { CUSTOMER } from './fixtures';
import { renderWithProviders } from './utils';

vi.mock('../src/api/reservationApi', () => ({
  default: { create: vi.fn() },
}));

beforeEach(() => {
  reservationApi.create.mockImplementation(async (data) => ({ id: 15, status: 'booked', ...data }));
});

const renderPage = (opts = {}) =>
  renderWithProviders(<ReservationPage />, { route: '/reservation', path: '/reservation', ...opts });

const dateInput = () => screen.getByLabelText(/^Ngày/);
const guestsInput = () => screen.getByLabelText(/^Số khách/);
const setDate = (value) => {
  fireEvent.change(dateInput(), { target: { value } });
  fireEvent.blur(dateInput());
};
const setGuests = async (value) => {
  await userEvent.clear(guestsInput());
  if (value !== '') await userEvent.type(guestsInput(), value);
  await userEvent.tab();
};

describe('TODO-12 – Form đặt bàn', () => {
  it('[TODO-12] có ô Ngày (reservation-date, type date)', () => {
    renderPage();
    expect(dateInput()).toHaveAttribute('id', 'reservation-date');
    expect(dateInput()).toHaveAttribute('type', 'date');
    expect(dateInput()).toHaveAttribute('name', 'date');
  });

  it('[TODO-12] có ô Số khách (reservation-guests, type number), mặc định 2', () => {
    renderPage();
    expect(guestsInput()).toHaveAttribute('id', 'reservation-guests');
    expect(guestsInput()).toHaveAttribute('type', 'number');
    expect(guestsInput()).toHaveValue(2);
  });

  it('[TODO-12] ngày đã qua → "Không thể đặt bàn cho ngày đã qua"', () => {
    renderPage();
    setDate('2020-01-01');
    expect(dateInput()).toHaveClass('is-invalid');
    expect(screen.getByText('Không thể đặt bàn cho ngày đã qua')).toBeInTheDocument();
  });

  it('[TODO-12] số khách 25 → "Số khách từ 1 đến 20"', async () => {
    renderPage();
    await setGuests('25');
    expect(guestsInput()).toHaveClass('is-invalid');
    expect(screen.getByText('Số khách từ 1 đến 20')).toBeInTheDocument();
  });

  it('[TODO-12] bấm "Xác nhận đặt bàn" khi form trống → hiện lỗi, KHÔNG gọi API', async () => {
    renderPage();
    await userEvent.click(screen.getByRole('button', { name: 'Xác nhận đặt bàn' }));
    expect(screen.getByText('Còn 3 mục chưa hợp lệ')).toBeInTheDocument();
    expect(screen.getByText('Vui lòng chọn ngày')).toBeInTheDocument();
    expect(reservationApi.create).not.toHaveBeenCalled();
  });

  it('[TODO-12] hợp lệ (đã đăng nhập) → gọi API đúng payload, toast, form trở về ban đầu', async () => {
    renderPage({ user: CUSTOMER });
    await userEvent.type(screen.getByLabelText(/^Số điện thoại/), ' 0912345678 ');
    setDate('2099-12-31');
    await setGuests('4');
    await userEvent.click(screen.getByRole('button', { name: 'Xác nhận đặt bàn' }));
    expect(reservationApi.create).toHaveBeenCalledWith({
      userId: 2,
      name: 'Nguyễn Văn An',
      phone: '0912345678',
      date: '2099-12-31',
      time: '18:00',
      guests: 4,
      note: '',
    });
    expect(await screen.findByText('Đặt bàn thành công cho 4 khách')).toBeInTheDocument();
    expect(screen.getByTestId('booking-result')).toHaveTextContent('Mã đặt bàn #15');
    expect(screen.getByLabelText(/^Số điện thoại/)).toHaveValue('');
    expect(dateInput()).toHaveValue('');
  });

  it('[TODO-12] lỗi server → Alert đỏ hiện thông báo lỗi, giữ nguyên dữ liệu đã nhập', async () => {
    reservationApi.create.mockRejectedValue({ message: 'Máy chủ đang gặp sự cố' });
    renderPage({ user: CUSTOMER });
    await userEvent.type(screen.getByLabelText(/^Số điện thoại/), '0912345678');
    setDate('2099-12-31');
    await userEvent.click(screen.getByRole('button', { name: 'Xác nhận đặt bàn' }));
    const alert = await screen.findByText('Máy chủ đang gặp sự cố');
    expect(alert.closest('.alert')).toHaveClass('alert-danger');
    expect(screen.getByLabelText(/^Số điện thoại/)).toHaveValue('0912345678');
    expect(screen.getByRole('button', { name: 'Xác nhận đặt bàn' })).toBeEnabled();
  });
});
