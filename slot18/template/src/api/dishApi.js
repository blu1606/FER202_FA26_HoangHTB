import axiosClient from './axiosClient';

/**
 * Endpoint món ăn & danh mục – CÓ SẴN, KHÔNG sửa file này.
 *   dishApi.getAll(signal)       → GET /dishes?_expand=category        → mảng món
 *   dishApi.getById(id, signal)  → GET /dishes/:id?_expand=category    → 1 món (không có → lỗi 404)
 *   categoryApi.getAll(signal)   → GET /categories                     → mảng danh mục
 */
const dishApi = {
  async getAll(signal) {
    const res = await axiosClient.get('/dishes', { params: { _expand: 'category' }, signal });
    return res.data;
  },

  async getById(id, signal) {
    const res = await axiosClient.get(`/dishes/${id}`, { params: { _expand: 'category' }, signal });
    return res.data;
  },
};

export const categoryApi = {
  async getAll(signal) {
    const res = await axiosClient.get('/categories', { signal });
    return res.data;
  },
};

export default dishApi;
