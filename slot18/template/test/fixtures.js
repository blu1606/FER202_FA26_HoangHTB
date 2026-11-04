/** Dữ liệu giả lập dùng trong test (giống db.json) */
export const categories = [{"id": 1, "name": "Cơm"}, {"id": 2, "name": "Bún – Phở"}, {"id": 3, "name": "Đồ uống"}, {"id": 4, "name": "Tráng miệng"}];

const cat = (id) => categories.find((c) => c.id === id);
const d = (id, name, categoryId, price, discount, available, spicy, prepTime, sold, rating, description = '') => ({
  id, name, categoryId, price, discount, available, spicy, prepTime, sold, rating, description,
  image: `https://placehold.co/400x300?text=Dish+${id}`,
  category: cat(categoryId),
});

export const dishes = [
  d(1, "Cơm tấm sườn bì chả", 1, 55000, 10, true, 0, 10, 320, 4.7, "Sườn nướng than hoa, bì, chả trứng, mỡ hành."),
  d(2, "Cơm gà xối mỡ", 1, 50000, 0, true, 1, 12, 95, 4.4, "Gà chiên giòn rụm, cơm chiên nghệ."),
  d(3, "Phở bò tái", 2, 60000, 0, true, 0, 8, 410, 4.8, "Nước dùng hầm xương 12 tiếng."),
  d(4, "Bún bò Huế", 2, 65000, 20, true, 3, 10, 150, 4.6, "Bún bò cay nồng chuẩn vị cố đô."),
  d(5, "Mì Quảng gà", 2, 55000, 0, false, 1, 15, 60, 4.3, "Mì Quảng gà ta, bánh tráng mè."),
  d(6, "Trà đào cam sả", 3, 39000, 0, true, 0, 5, 500, 4.5, "Trà đào thơm mát, cam tươi, sả."),
  d(7, "Cà phê sữa đá", 3, 29000, 10, true, 0, 3, 100, 4.9, "Cà phê phin truyền thống."),
  d(8, "Sinh tố bơ", 3, 45000, 0, false, 0, 6, 80, 4.2, "Bơ sáp Đắk Lắk xay cùng sữa đặc."),
  d(9, "Chè khúc bạch", 4, 35000, 15, true, 0, 5, 70, 4.6, "Khúc bạch hạnh nhân, nhãn, vải."),
  d(10, "Bánh flan", 4, 20000, 0, true, 0, 2, 220, 4.4, "Flan caramel mềm mịn."),
  d(11, "Cơm chiên hải sản cay", 1, 70000, 5, true, 2, 15, 45, 4.1, "Tôm, mực, sa tế cay."),
  d(12, "Bún chả Hà Nội", 2, 60000, 0, true, 0, 12, 99, 4.5, "Chả nướng than, nước chấm chua ngọt."),
];

export const users = [
  {"id": 1, "email": "admin@fpt.edu.vn", "fullName": "Quản trị viên", "role": "admin", "active": true, "createdAt": "2026-01-05T08:00:00Z"},
  {"id": 2, "email": "sv@fpt.edu.vn", "fullName": "Nguyễn Văn An", "role": "customer", "active": true, "createdAt": "2026-02-10T08:00:00Z"},
  {"id": 3, "email": "binh@fpt.edu.vn", "fullName": "Trần Thị Bình", "role": "customer", "active": true, "createdAt": "2026-03-12T08:00:00Z"},
  {"id": 4, "email": "cuong@fpt.edu.vn", "fullName": "Lê Văn Cường", "role": "customer", "active": false, "createdAt": "2026-04-20T08:00:00Z"},
  {"id": 5, "email": "dung@fpt.edu.vn", "fullName": "Phạm Thị Dung", "role": "admin", "active": true, "createdAt": "2026-05-15T08:00:00Z"},
  {"id": 6, "email": "em@fpt.edu.vn", "fullName": "Hoàng Văn Em", "role": "customer", "active": true, "createdAt": "2026-06-01T08:00:00Z"},
];

export const ADMIN = users[0];
export const CUSTOMER = users[1];

/** Đơn hàng mẫu (mới nhất trước, giống orderApi.getAll) */
export const orders = [
  {"id": 6, "userId": 6, "receiver": "Hoàng Văn Em", "items": [{"dishId": 9, "quantity": 2, "price": 29750}, {"dishId": 2, "quantity": 1, "price": 50000}], "total": 109500, "status": "pending", "createdAt": "2026-10-06T20:10:00Z"},
  {"id": 5, "userId": 3, "receiver": "Trần Thị Bình", "items": [{"dishId": 12, "quantity": 1, "price": 60000}], "total": 60000, "status": "cancelled", "createdAt": "2026-10-05T19:30:00Z"},
  {"id": 4, "userId": 6, "receiver": "Hoàng Văn Em", "items": [{"dishId": 7, "quantity": 4, "price": 26100}], "total": 104400, "status": "delivered", "createdAt": "2026-10-04T08:15:00Z"},
  {"id": 3, "userId": 2, "receiver": "Nguyễn Văn An", "items": [{"dishId": 4, "quantity": 3, "price": 52000}, {"dishId": 10, "quantity": 3, "price": 20000}], "total": 216000, "status": "confirmed", "createdAt": "2026-10-03T18:40:00Z"},
  {"id": 2, "userId": 3, "receiver": "Trần Thị Bình", "items": [{"dishId": 3, "quantity": 1, "price": 60000}], "total": 60000, "status": "pending", "createdAt": "2026-10-02T12:05:00Z"},
  {"id": 1, "userId": 2, "receiver": "Nguyễn Văn An", "items": [{"dishId": 1, "quantity": 2, "price": 49500}, {"dishId": 6, "quantity": 2, "price": 39000}], "total": 177000, "status": "delivered", "createdAt": "2026-10-01T11:20:00Z"},
];
