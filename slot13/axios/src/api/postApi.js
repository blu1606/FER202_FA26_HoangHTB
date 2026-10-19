import axiosClient from './axiosClient';

const postApi = {
  getAll: (params = {}, signal) => {
    return axiosClient.get('/posts', { params, signal });
  },

  getById: (id, signal) => {
    return axiosClient.get(`/posts/${id}`, { signal });
  },

  create: (data) => {
    return axiosClient.post('/posts', data);
  },

  update: (id, data) => {
    return axiosClient.put(`/posts/${id}`, data);
  },

  patch: (id, data) => {
    return axiosClient.patch(`/posts/${id}`, data);
  },

  remove: (id) => {
    return axiosClient.delete(`/posts/${id}`);
  },

  getCommentsByPostId: (postId, signal) => {
    return axiosClient.get(`/posts/${postId}/comments`, { signal });
  },

  getUserById: (userId, signal) => {
    return axiosClient.get(`/users/${userId}`, { signal });
  },
};

export default postApi;
