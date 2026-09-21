import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function ProductInfo({ name, price, tag, avatar }) {
  return (
    <Card className="h-100 shadow-sm position-relative">
      <Card.Img
        variant="top"
        src={avatar}
        alt={name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80';
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Text className="text-muted">
          Price: ${price}
        </Card.Text>
        <Button variant="primary" className="mt-auto">
          Buy Now
        </Button>
        {tag && (
          <Badge
            bg="primary"
            pill
            style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
          >
            {tag}
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductInfo;
