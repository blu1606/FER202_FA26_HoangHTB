import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com';

const axiosClient = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: log method + url, gắn Bearer token nếu có
axiosClient.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: new Date() };

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: đo thời gian xử lý, việt hóa thông báo lỗi
axiosClient.interceptors.response.use(
  (response) => {
    const elapsed = new Date() - response.config.metadata.startTime;
    response.duration = elapsed;
    console.log(`[API Response] ${response.status} in ${elapsed}ms:`, response.config.url);
    return response;
  },
  (error) => {
    let viMessage = 'Có lỗi xảy ra, vui lòng thử lại.';

    if (error.code === 'ECONNABORTED') {
      viMessage = 'Yêu cầu quá thời gian chờ (Timeout).';
    } else if (!error.response) {
      viMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng hoặc json-server.';
    } else {
      const status = error.response.status;
      if (status === 400) viMessage = 'Dữ liệu gửi lên không hợp lệ (400).';
      else if (status === 401) viMessage = 'Chưa xác thực, vui lòng đăng nhập (401).';
      else if (status === 403) viMessage = 'Bạn không có quyền thực hiện thao tác này (403).';
      else if (status === 404) viMessage = 'Không tìm thấy dữ liệu yêu cầu (404).';
      else if (status >= 500) viMessage = 'Máy chủ đang gặp sự cố nội bộ (5xx).';
    }

    error.viMessage = viMessage;
    return Promise.reject(error);
  }
);

export default axiosClient;
