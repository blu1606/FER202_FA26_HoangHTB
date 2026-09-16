import { Card, Button } from 'react-bootstrap';

function CardItem({ product }) {
  return (
    <Card style={{ width: '18rem' }} className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.avatar}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-muted flex-grow-1">
          {product.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-danger fw-bold">{product.price} đ</span>
          <Button variant="primary" size="sm">
            Mua ngay
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardItem;
