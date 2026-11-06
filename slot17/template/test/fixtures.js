/** Dữ liệu giả lập dùng trong test (giống db.json) */
export const brands = [
  { id: 1, name: 'Toyota' },
  { id: 2, name: 'Honda' },
  { id: 3, name: 'Hyundai' },
  { id: 4, name: 'VinFast' },
];

const brandOf = (id) => brands.find((b) => b.id === id);
const c = (id, name, brandId, price, discount, stock, year, fuel, description = '') => ({
  id, name, brandId, price, discount, stock, year, fuel, description,
  image: `https://placehold.co/600x400?text=${id}`,
  brand: brandOf(brandId),
});

export const cars = [
  c(1, 'Toyota Vios G', 1, 545000000, 5, 6, 2024, 'Xăng', 'Sedan hạng B, số tự động CVT, 7 túi khí.'),
  c(2, 'Honda City RS', 2, 609000000, 0, 4, 2024, 'Xăng', 'Sedan thể thao, động cơ 1.5L i-VTEC, Honda Sensing.'),
  c(3, 'Toyota Camry 2.5Q', 1, 1460000000, 10, 0, 2023, 'Xăng', 'Sedan hạng D cao cấp, ghế da chỉnh điện, cửa sổ trời.'),
  c(4, 'VinFast VF 8 Plus', 4, 1199000000, 15, 3, 2024, 'Điện'),
  c(5, 'Hyundai Tucson', 3, 919000000, 0, 0, 2023, 'Dầu'),
  c(6, 'Honda CR-V e:HEV', 2, 1259000000, 5, 2, 2024, 'Hybrid'),
  c(7, 'Hyundai Accent', 3, 439000000, 8, 10, 2024, 'Xăng'),
  c(8, 'VinFast VF 5 Plus', 4, 529000000, 0, 12, 2024, 'Điện'),
  c(9, 'Toyota Corolla Cross HEV', 1, 955000000, 12, 4, 2024, 'Hybrid', 'SUV đô thị động cơ hybrid, tiết kiệm nhiên liệu.'),
  c(10, 'Hyundai Santa Fe', 3, 1365000000, 10, 3, 2023, 'Dầu'),
  c(11, 'Honda Civic RS', 2, 999000000, 0, 5, 2024, 'Xăng'),
  c(12, 'VinFast VF 6', 4, 765000000, 20, 7, 2024, 'Điện'),
];

export const users = [
  { id: 1, email: 'admin@autoshop.vn', fullName: 'Quản trị viên', role: 'admin', active: true },
  { id: 2, email: 'khach@autoshop.vn', fullName: 'Nguyễn Văn An', role: 'customer', active: true },
  { id: 3, email: 'binh@autoshop.vn', fullName: 'Trần Thị Bình', role: 'customer', active: true },
  { id: 4, email: 'cuong@autoshop.vn', fullName: 'Lê Văn Cường', role: 'customer', active: false },
  { id: 5, email: 'dung@autoshop.vn', fullName: 'Phạm Thị Dung', role: 'admin', active: true },
  { id: 6, email: 'em@autoshop.vn', fullName: 'Hoàng Văn Em', role: 'customer', active: true },
];

export const ADMIN = users[0];
export const CUSTOMER = users[1];
