import axiosClient from './axiosClient';

/**
 * Endpoint đơn đặt món – CÓ SẴN, KHÔNG sửa file này.
 *   orderApi.getAll(signal) → GET /orders?_sort=id&_order=desc → mảng đơn (mới nhất trước)
 *     mỗi đơn: { id, userId, receiver, items: [{ dishId, quantity, price }], total, status, createdAt }
 *     status ∈ 'pending' | 'confirmed' | 'delivered' | 'cancelled'
 *   orderApi.create(data)   → POST /orders → đơn vừa tạo (status 'pending')
 */
const orderApi = {
  async getAll(signal) {
    const res = await axiosClient.get('/orders', { params: { _sort: 'id', _order: 'desc' }, signal });
    return res.data;
  },

  async create(data) {
    const res = await axiosClient.post('/orders', {
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    return res.data;
  },
};

export default orderApi;
