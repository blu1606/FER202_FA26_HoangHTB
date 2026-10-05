import Badge from 'react-bootstrap/Badge';
import { useCart } from '../contexts/CartContext';

export default function CartBadge() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="d-flex align-items-center gap-2">
      <span className="fs-5">🛒</span>
      <span className="fw-semibold">Giỏ hàng</span>
      <Badge pill bg={count > 0 ? 'danger' : 'secondary'} className="px-2 py-1 fs-6">
        {count}
      </Badge>
    </div>
  );
}
