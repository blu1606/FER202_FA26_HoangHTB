import './Card.css';

function Card({ product, pizza }) {
  const item = product || pizza || {};

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }
    return price;
  };

  return (
    <div className="pizza-card">
      <div className="card-image-wrapper">
        <img
          src={item.avatar}
          alt={item.name}
          className="card-image"
          loading="lazy"
        />
        {item.tag && <span className="card-tag">{item.tag}</span>}
      </div>

      <div className="card-body">
        <h3 className="card-title">{item.name}</h3>
        {item.description && (
          <p className="card-description">{item.description}</p>
        )}
        <div className="card-footer">
          <span className="card-price">{formatPrice(item.price)}</span>
          <button type="button" className="btn-order">
            Chọn mua
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
