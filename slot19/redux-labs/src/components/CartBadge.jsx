import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { selectCartCount } from '../features/cart/cartSlice';

export default function CartBadge() {
  const count = useSelector(selectCartCount);
  return (
    <span className="fs-6 d-inline-flex align-items-center gap-1">
      <span>🛒 Giỏ hàng</span>
      <Badge bg="danger" pill>
        {count}
      </Badge>
    </span>
  );
}

