import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function MyProduct({ product }) {
  const { id, name, description, price, discount, instock, rating, category } = product;

  // Format số tiền (VND)
  const formattedPrice = Number(price || 0).toLocaleString('vi-VN') + ' đ';
  
  // Kiểm tra điều kiện giảm giá
  const hasDiscount = discount && Number(discount) > 0;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {category} - ID: {id}
        </Card.Subtitle>
        <Card.Text className="flex-grow-1">{description}</Card.Text>

        <p className="mb-1">
          <strong>Giá:</strong> {formattedPrice}
        </p>
        <p className="mb-1">
          <strong>Giảm giá:</strong> {hasDiscount ? `${discount}%` : 'Không có'}
        </p>
        <p className="mb-1">
          <strong>Đánh giá:</strong> {rating} ⭐
        </p>
        <p className="mb-2">
          <strong>Trạng thái:</strong> {instock ? 'Còn hàng' : 'Hết hàng'}
        </p>

        {/* Chỉ hiển thị button khi: có giảm giá VÀ còn hàng */}
        {hasDiscount && instock && (
          <Button variant="primary" className="mt-auto">
            Thêm vào giỏ
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
