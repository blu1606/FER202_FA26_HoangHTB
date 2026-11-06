import { getFinalPrice } from './format';

/** CÓ SẴN, KHÔNG sửa file này */
export const SORT_OPTIONS = {
  default: 'Mặc định',
  price_asc: 'Giá tăng dần',
  price_desc: 'Giá giảm dần',
  year_desc: 'Đời mới nhất',
};

const SORTERS = {
  price_asc: (a, b) => getFinalPrice(a) - getFinalPrice(b),
  price_desc: (a, b) => getFinalPrice(b) - getFinalPrice(a),
  year_desc: (a, b) => b.year - a.year,
};

/**
 * Lọc + sắp xếp, trả về MẢNG MỚI (không đổi mảng gốc).
 *   filterCars(cars, { keyword: 'toyota', brandId: '1', inStockOnly: true, sortBy: 'price_desc' })
 */
export function filterCars(cars, { keyword = '', brandId = '', inStockOnly = false, sortBy = 'default' } = {}) {
  const text = keyword.trim().toLowerCase();
  const result = cars
    .filter((c) => !text || c.name.toLowerCase().includes(text))
    .filter((c) => !brandId || c.brandId === Number(brandId))
    .filter((c) => !inStockOnly || c.stock > 0);
  return SORTERS[sortBy] ? result.sort(SORTERS[sortBy]) : result;
}
