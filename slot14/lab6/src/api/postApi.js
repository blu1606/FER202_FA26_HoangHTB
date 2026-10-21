import axiosClient from "./axiosClient";

const postApi = {
    getAll: (params = {}, signal) => axiosClient.get("/posts", { params, signal }),
    getById: (id, signal) => axiosClient.get(`/posts/${id}`, { signal }),
    getComments: (id, signal) => axiosClient.get(`/posts/${id}/comments`, { signal }),
    create: (data) => axiosClient.post("/posts", data),
    update: (id, data) => axiosClient.put(`/posts/${id}`, data),
    patch: (id, partial) => axiosClient.patch(`/posts/${id}`, partial),
    remove: (id) => axiosClient.delete(`/posts/${id}`),
}

export const userApi = {
    getAll: (signal) => axiosClient.get("/users", { signal }),
    getById: (id, signal) => axiosClient.get(`/users/${id}`, { signal }),
};

export default postApi