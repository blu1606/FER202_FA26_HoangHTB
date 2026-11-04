import { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

/**
 * Bộ chọn số lượng – CÓ SẴN.
 *   <QuantityPicker min={1} max={5} onChange={(value) => ...} />
 */
export default function QuantityPicker({ min = 1, max = 10, onChange }) {
  const [quantity, setQuantity] = useState(min);

  const change = (delta) => {
    const next = Math.min(max, Math.max(min, quantity + delta));
    setQuantity(next);
    onChange?.(next);
  };

  return (
    <ButtonGroup>
      <Button variant="outline-secondary" aria-label="Giảm" disabled={quantity <= min} onClick={() => change(-1)}>
        −
      </Button>
      <Button variant="light" disabled data-testid="qty-value">
        {quantity}
      </Button>
      <Button variant="outline-secondary" aria-label="Tăng" disabled={quantity >= max} onClick={() => change(1)}>
        +
      </Button>
    </ButtonGroup>
  );
}
