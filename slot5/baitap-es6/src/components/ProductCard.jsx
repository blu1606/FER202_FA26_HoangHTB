import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const ProductCard = ({ product }) => {
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
    inStock = true,
    discount = 0,
  } = product ?? {};

  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';
  const categoryName = category?.name ?? 'Chưa phân loại';
  const ratingRate = rating?.rate ?? 'Chưa có';
  const ratingCount = rating?.count ?? 0;
  const isBestSeller = (rating?.rate ?? 0) >= 4.5;
  const finalPrice = discount > 0 && price != null ? price * (1 - discount / 100) : price;

  const formattedOriginalPrice =
    price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ?? 'Liên hệ';
  const formattedFinalPrice =
    finalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ?? 'Liên hệ';

  return (
    <Card className={`h-100 position-relative shadow-sm ${inStock ? '' : 'opacity-50'}`}>
      {discount > 0 && (
        <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
          -{discount}%
        </Badge>
      )}
      <Card.Img
        variant="top"
        src={imageSrc}
        alt={name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80';
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <div className="mb-2 d-flex flex-wrap gap-1 align-items-center">
          <Badge bg="secondary">{categoryName}</Badge>
          <Badge bg={inStock ? 'success' : 'secondary'}>
            {inStock ? 'Còn hàng' : 'Hết hàng'}
          </Badge>
          {isBestSeller && (
            <Badge bg="warning" text="dark">
              Bán chạy
            </Badge>
          )}
        </div>
        <Card.Text className="mb-3">
          <strong>Giá: </strong>
          {discount > 0 && price != null ? (
            <>
              <span className="text-danger fw-bold me-2">{formattedFinalPrice}</span>
              <del className="text-muted small">{formattedOriginalPrice}</del>
            </>
          ) : (
            <span>{formattedOriginalPrice}</span>
          )}
          <br />
          <small className="text-muted">
            Đánh giá: {ratingRate} ({ratingCount} lượt)
          </small>
        </Card.Text>
        <div className="mt-auto">
          <Button
            variant={inStock ? 'primary' : 'secondary'}
            disabled={!inStock}
            className="w-100"
          >
            {inStock ? 'Mua ngay' : 'Không khả dụng'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
