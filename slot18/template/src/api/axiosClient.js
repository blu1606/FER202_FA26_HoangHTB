import axios from 'axios';

/** axios instance dùng chung – CÓ SẴN, KHÔNG sửa file này */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

// Chuẩn hoá lỗi thành { status, message } tiếng Việt; lỗi hủy request giữ nguyên
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);
    const status = error.response?.status ?? null;
    let message;
    if (!error.response) message = 'Không kết nối được máy chủ. Kiểm tra json-server đã chạy chưa?';
    else if (status === 404) message = 'Không tìm thấy dữ liệu';
    else if (status >= 500) message = 'Máy chủ đang gặp sự cố';
    else message = `Có lỗi xảy ra (mã ${status})`;
    return Promise.reject({ status, message });
  }
);

export const isCancel = axios.isCancel;
export const getErrorMessage = (err) => err?.message || 'Có lỗi xảy ra, vui lòng thử lại';

export default axiosClient;
