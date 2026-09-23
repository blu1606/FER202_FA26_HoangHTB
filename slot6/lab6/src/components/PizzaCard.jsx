import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const PizzaCard = ({ pizza }) => {
  const { name, originalPrice, price, badge, image } = pizza;

  return (
    <Card className="h-100 pizza-card bg-white">
      <div className="pizza-card-img-wrapper">
        {badge && (
          <span className={badge === 'SALE' ? 'pizza-badge-sale' : 'pizza-badge-new'}>
            {badge}
          </span>
        )}
        <Card.Img
          variant="top"
          src={image}
          alt={name}
          className="pizza-card-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = './images/menu1.jpg';
          }}
        />
      </div>
      <Card.Body className="d-flex flex-column p-3">
        <Card.Title className="pizza-card-title">{name}</Card.Title>
        <div className="mb-3">
          {originalPrice != null ? (
            <div>
              <span className="price-original">${originalPrice.toFixed(2)}</span>
              <span className="price-discount">${price.toFixed(2)}</span>
            </div>
          ) : (
            <div>
              <span className="price-normal">${price.toFixed(2)}</span>
            </div>
          )}
        </div>
        <div className="mt-auto">
          <Button className="w-100 btn-buy-pizza">Buy</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PizzaCard;
