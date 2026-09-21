import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function ProductInfo({ name, price, tag, avatar, product }) {
  const item = product || { name, price, tag, avatar };

  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img
        variant="top"
        src={item.avatar}
        alt={item.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80';
        }}
      />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          Price: ${item.price}
        </Card.Text>
        <Button variant="primary">Buy Now</Button>
        {item.tag && (
          <Badge
            bg="primary"
            pill
            style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
          >
            {item.tag}
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductInfo;