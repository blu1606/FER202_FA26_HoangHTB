/** CÓ SẴN, KHÔNG sửa file này */
export const formatVND = (n) =>
  n === null || n === undefined ? '' : n.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

/** Giá sau giảm: getFinalPrice({ price: 545000000, discount: 5 }) → 517750000 */
export const getFinalPrice = ({ price = 0, discount = 0 }) => Math.round(price * (1 - discount / 100));

/** formatDate('2026-09-10T10:00:00Z') → "10/09/2026" */
export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
