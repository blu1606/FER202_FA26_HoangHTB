import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { formatVND, getFinalPrice } from '../utils/format';

const ProductCard = ({ product, onAddToCart }) => {
  const {
    name = 'Sản phẩm chưa đặt tên',
    price = 0,
    category,
    inStock = false,
    discount = 0,
    rating,
    image,
  } = product ?? {};

  const finalPrice = getFinalPrice({ price, discount });
  const categoryName = category?.name ?? 'Khác';
  const ratingText = rating?.rate != null ? `⭐ ${rating.rate} (${rating?.count ?? 0})` : 'Chưa có đánh giá';

  return (
    <Card className="h-100 shadow-sm border-0 d-flex flex-column">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={image ?? 'https://placehold.co/400x300?text=No+Image'}
          alt={name}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        {discount > 0 && (
          <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
            -{discount}%
          </Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <Badge bg="light" text="dark" className="border">
            {categoryName}
          </Badge>
          <small className={inStock ? 'text-success' : 'text-danger'}>
            {inStock ? '● Còn hàng' : '● Hết hàng'}
          </small>
        </div>

        <Card.Title className="fs-6 fw-semibold text-truncate mb-1" title={name}>
          {name}
        </Card.Title>

        <small className="text-warning mb-2">{ratingText}</small>

        <div className="mt-auto mb-3">
          {discount > 0 ? (
            <div className="d-flex align-items-baseline gap-2">
              <span className="fw-bold text-primary fs-5">{formatVND(finalPrice)}</span>
              <del className="text-muted small">{formatVND(price)}</del>
            </div>
          ) : (
            <span className="fw-bold text-primary fs-5">{formatVND(price)}</span>
          )}
        </div>

        <Button
          variant="primary"
          className="mt-auto"
          disabled={!inStock}
          onClick={() => onAddToCart?.(product)}
        >
          {inStock ? 'Thêm vào giỏ' : 'Tạm hết'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
