import { getFinalPrice } from './format';

/** CÓ SẴN, KHÔNG sửa file này */
export const SORT_OPTIONS = {
  default: 'Mặc định',
  price_asc: 'Giá tăng dần',
  price_desc: 'Giá giảm dần',
  best_seller: 'Bán chạy nhất',
};

const SORTERS = {
  price_asc: (a, b) => getFinalPrice(a) - getFinalPrice(b),
  price_desc: (a, b) => getFinalPrice(b) - getFinalPrice(a),
  best_seller: (a, b) => b.sold - a.sold,
};

/** Món được coi là "bán chạy" khi đã bán từ 100 phần trở lên */
export const BEST_SELLER_MIN = 100;

/**
 * Lọc + sắp xếp, trả về MẢNG MỚI (không đổi mảng gốc).
 * keyword tìm trong TÊN MÓN, không phân biệt hoa thường.
 *   filterDishes(dishes, { keyword: 'bún', categoryId: '2', availableOnly: true, sortBy: 'price_asc' })
 */
export function filterDishes(dishes, { keyword = '', categoryId = '', availableOnly = false, sortBy = 'default' } = {}) {
  const text = keyword.trim().toLowerCase();
  const result = dishes
    .filter((d) => !text || d.name.toLowerCase().includes(text))
    .filter((d) => !categoryId || d.categoryId === Number(categoryId))
    .filter((d) => !availableOnly || d.available);
  return SORTERS[sortBy] ? result.sort(SORTERS[sortBy]) : result;
}
