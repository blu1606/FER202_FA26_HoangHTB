import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

const ProductCard = ({ product }) => {
  const {
    name = 'Sản phẩm chưa đặt tên',
    price,
    image,
    rating,
    category,
  } = product;

  const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';
  const categoryName = category?.name ?? 'Chưa phân loại';
  const ratingRate = rating?.rate ?? 'Chưa có';
  const ratingCount = rating?.count ?? 0;
  const formattedPrice =
    price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) ?? 'Liên hệ';

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={imageSrc} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Badge bg="secondary" className="mb-2">
          {categoryName}
        </Badge>
        <Card.Text>
          <strong>Giá:</strong> {formattedPrice} <br />
          <small className="text-muted">
            Đánh giá: {ratingRate} ({ratingCount} lượt)
          </small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
