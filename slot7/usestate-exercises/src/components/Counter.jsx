import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-primary text-white py-3">
        <h5 className="mb-0 fw-semibold">Bài 1: Simple Counter</h5>
      </Card.Header>
      <Card.Body className="p-4 text-center">
        <p className="text-muted mb-3">
          Tăng giá trị biến đếm mỗi khi nhấn nút và hiển thị số hiện tại.
        </p>
        <div className="my-4">
          <span className="text-muted fs-6 d-block mb-1">Giá trị hiện tại:</span>
          <div className="display-3 fw-bold text-primary">{count}</div>
          <Badge bg={count > 0 ? 'success' : 'secondary'} className="mt-2 px-3 py-2 fs-6">
            {count > 0 ? `Đã đếm ${count} lần` : 'Chưa bắt đầu đếm'}
          </Badge>
        </div>
        <Stack direction="horizontal" gap={2} className="justify-content-center flex-wrap">
          <Button variant="outline-danger" onClick={decrement} disabled={count === 0}>
            - Giảm 1
          </Button>
          <Button variant="outline-secondary" onClick={reset} disabled={count === 0}>
            Reset về 0
          </Button>
          <Button variant="primary" size="lg" onClick={increment} className="px-4 fw-bold">
            + Tăng 1 (Click me!)
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
