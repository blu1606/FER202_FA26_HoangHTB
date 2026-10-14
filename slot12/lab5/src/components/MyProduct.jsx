import Card from 'react-bootstrap/Card';

export default function MyProduct({ product }) {
  const { id, name, description, price, discount, instock, rating, category } = product;

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {category} - ID: {id}
        </Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <p className="mb-1">
          <strong>Price:</strong> ${price}
        </p>
        <p className="mb-1">
          <strong>Discount:</strong> {discount}%
        </p>
        <p className="mb-1">
          <strong>Rating:</strong> {rating}
        </p>
        <p className="mb-0">
          <strong>In Stock:</strong> {instock ? 'Yes' : 'No'}
        </p>
      </Card.Body>
    </Card>
  );
}
