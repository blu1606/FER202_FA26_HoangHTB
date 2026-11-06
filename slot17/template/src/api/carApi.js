import axiosClient from './axiosClient';

/**
 * Endpoint xe & hãng xe – CÓ SẴN, KHÔNG sửa file này.
 *   carApi.getAll(signal)       → GET /cars?_expand=brand          → mảng xe
 *   carApi.getById(id, signal)  → GET /cars/:id?_expand=brand      → 1 xe (không có → lỗi 404)
 *   brandApi.getAll(signal)     → GET /brands                      → mảng hãng xe
 */
const carApi = {
  async getAll(signal) {
    const res = await axiosClient.get('/cars', { params: { _expand: 'brand' }, signal });
    return res.data;
  },

  async getById(id, signal) {
    const res = await axiosClient.get(`/cars/${id}`, { params: { _expand: 'brand' }, signal });
    return res.data;
  },
};

export const brandApi = {
  async getAll(signal) {
    const res = await axiosClient.get('/brands', { signal });
    return res.data;
  },
};

export default carApi;
