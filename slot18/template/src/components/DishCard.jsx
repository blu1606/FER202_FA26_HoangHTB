import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatVND, getFinalPrice } from '../utils/format';
import { BEST_SELLER_MIN } from '../utils/filterDishes';

/**
 * ===================== DishCard – TODO-04 (1.0) · TODO-05 (1.0) =====================
 * Props: dish = { id, name, image, price, discount, available, spicy, prepTime, sold, rating, category? }, onAddToCart
 * ĐÃ CÓ SẴN: Card + ảnh, tên món (chữ thường), biến soldOut, bestSeller, nút "Thêm vào giỏ".
 * Kiểm tra ở /dishes: Cơm tấm (giảm 10%, bán chạy), Cơm gà (không giảm, cay 1), Bún bò Huế (cay 3), Mì Quảng (tạm hết).
 *
 * TODO-04  Tên là <Link to={`/dishes/${id}`}>{name}</Link>;
 *          có category → <Badge bg="success">{category.name}</Badge>;
 *          spicy > 0 → <Badge bg="danger">Cay cấp {spicy}</Badge>;
 *          thời gian <small className="text-muted">⏱ {prepTime} phút</small>.
 * TODO-05  Giá sau giảm <span className="text-danger fw-bold">{formatVND(getFinalPrice(dish))}</span>;
 *          discount > 0 → giá gốc trong thẻ <del className="text-muted ms-2 small"> + <Badge bg="warning" text="dark">Giảm {discount}%</Badge>;
 *          bestSeller → <Badge bg="info">Bán chạy</Badge>;
 *          soldOut → <Badge bg="secondary">Tạm hết</Badge>, nút disabled và đổi chữ thành "Tạm hết".
 * =====================================================================================
 */
export default function DishCard({ dish, onAddToCart }) {
  const { id, name, image, price, discount, available, spicy, prepTime, sold, category } = dish;
  const soldOut = available === false;
  const bestSeller = sold >= BEST_SELLER_MIN;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={image} alt={name} style={{ height: '180px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        {/* TODO-04: đổi tên món thành Link tới /dishes/{id} */}
        <Card.Title as="h6"> <Link to={`/dishes/${id}`}>{name}</Link></Card.Title>

        <div className="mb-2 d-flex flex-wrap gap-1 align-items-center">
          {/* TODO-04: Badge danh mục (nếu có), Badge "Cay cấp n" (nếu spicy > 0), "⏱ {prepTime} phút" */}
          {category && (<Badge bg="success">{category.name}</Badge>)}
          {spicy > 0 && (<Badge bg="danger">Cay cấp {spicy}</Badge>)}
          <small className="text-muted">⏱ {prepTime} phút</small>
          {/* TODO-05: Badge "Bán chạy" khi bestSeller; Badge "Tạm hết" khi soldOut */}
          {bestSeller && <Badge bg="info">Bán chạy</Badge>}
          {soldOut && <Badge bg="secondary">Tạm hết</Badge>}
        </div>

        <div className="mt-auto">
          {/* TODO-05: giá sau giảm; discount > 0 → giá gốc trong <del> + Badge "Giảm {discount}%" */}
          <span className="text-danger fw-bold">{formatVND(getFinalPrice(dish))}</span>
          {discount > 0 && (
            <>
              <del className="text-muted ms-2 small">{formatVND(price)}</del>
              <Badge bg="warning" text="dark" className="ms-2">Giảm {discount}%</Badge>
            </>
          )}
          {/* TODO-05: disabled={soldOut}, chữ "Tạm hết" khi soldOut */}
          <Button variant="success" className="w-100 mt-2" disabled={soldOut} onClick={() => onAddToCart?.(dish)}>
            {soldOut ? "Tạm hết" : "Thêm vào giỏ"}
          </Button>
        </div>
      </Card.Body>
    </Card >
  );
}
