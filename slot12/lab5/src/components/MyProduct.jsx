import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default function MyProduct({ product, ...props }) {
  // Hỗ trợ cả 2 cách truyền: <MyProduct product={item} /> hoặc <MyProduct {...item} />
  const currentProduct = product || props;
  const {
    id,
    name,
    description,
    price,
    discount,
    instock,
    rating,
    category
  } = currentProduct;

  // Tính giá sau giảm nếu có discount
  const hasDiscount = discount && Number(discount) > 0;
  const finalPrice = hasDiscount
    ? price - (price * discount) / 100
    : price;

  return (
    <Card className="h-100 shadow-sm border-0 position-relative">
      {/* Badge giảm giá ở góc nếu có */}
      {hasDiscount && (
        <Badge
          bg="danger"
          className="position-absolute top-0 end-0 m-2 px-2 py-1"
        >
          -{discount}%
        </Badge>
      )}

      <Card.Body className="d-flex flex-column">
        {/* Category & Rating */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Badge bg="secondary" className="text-uppercase">
            {category || 'Chung'}
          </Badge>
          <div className="text-warning small">
            <i className="bi bi-star-fill me-1"></i>
            <span>{rating || 5.0}</span>
          </div>
        </div>

        {/* Tên sản phẩm */}
        <Card.Title className="h6 fw-bold mb-1">{name}</Card.Title>

        {/* Mã sản phẩm */}
        <div className="text-muted small mb-2">Mã SP: #{id}</div>

        {/* Mô tả */}
        <Card.Text className="text-secondary small mb-3 flex-grow-1">
          {description}
        </Card.Text>

        {/* Giá & Tình trạng kho */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="fw-bold text-primary fs-5">
              {Number(finalPrice || 0).toLocaleString('vi-VN')} đ
            </span>
            {hasDiscount && (
              <span className="text-muted text-decoration-line-through ms-2 small">
                {Number(price || 0).toLocaleString('vi-VN')} đ
              </span>
            )}
          </div>

          <Badge bg={instock ? 'success' : 'danger'}>
            {instock ? 'Còn hàng' : 'Hết hàng'}
          </Badge>
        </div>

        {/* Nút hành động */}
        <Button variant="primary" size="sm" className="w-100" disabled={!instock}>
          <i className="bi bi-cart-plus me-1"></i>
          {instock ? 'Chọn mua' : 'Tạm hết'}
        </Button>
      </Card.Body>
    </Card>
  );
}
