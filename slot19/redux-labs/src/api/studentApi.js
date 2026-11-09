import axios from 'axios';

const http = axios.create({ baseURL: 'http://localhost:9999' });

export const studentApi = {
  getAll: () => http.get('/students').then((r) => r.data),
  create: (data) => http.post('/students', data).then((r) => r.data),
  update: (id, data) => http.put(`/students/${id}`, data).then((r) => r.data),
  remove: (id) => http.delete(`/students/${id}`).then(() => id),
};

