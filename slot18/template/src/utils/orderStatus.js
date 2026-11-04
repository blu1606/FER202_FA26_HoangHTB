/**
 * Nhãn + màu Badge cho trạng thái đơn – CÓ SẴN, KHÔNG sửa file này.
 *   getOrderStatus('pending') → { bg: 'warning', label: 'Chờ xác nhận' }
 *   Trạng thái lạ → { bg: 'dark', label: <giữ nguyên chuỗi> }
 */
export const ORDER_STATUS = {
  pending: { bg: 'warning', label: 'Chờ xác nhận' },
  confirmed: { bg: 'primary', label: 'Đã xác nhận' },
  delivered: { bg: 'success', label: 'Đã giao' },
  cancelled: { bg: 'secondary', label: 'Đã hủy' },
};

export const getOrderStatus = (status) => ORDER_STATUS[status] ?? { bg: 'dark', label: status };
