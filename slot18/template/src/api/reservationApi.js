import axiosClient from './axiosClient';

/**
 * Endpoint đặt bàn – CÓ SẴN, KHÔNG sửa file này.
 *   reservationApi.create(data) → POST /reservations → phiếu đặt bàn vừa tạo (có id, status, createdAt)
 *     data = { userId, name, phone, date, time, guests, note }
 */
const reservationApi = {
  async create(data) {
    const res = await axiosClient.post('/reservations', {
      ...data,
      status: 'booked',
      createdAt: new Date().toISOString(),
    });
    return res.data;
  },
};

export default reservationApi;
