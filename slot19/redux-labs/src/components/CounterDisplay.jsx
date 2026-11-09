import { useSelector } from 'react-redux';
import { Card, Badge } from 'react-bootstrap';

export default function CounterDisplay() {
  // Lấy trực tiếp từ Redux store mà không nhận props từ App hay Counter
  const count = useSelector((state) => state.counter.value);

  return (
    <Card className="mx-auto mt-3 shadow-sm border" style={{ maxWidth: 440 }}>
      <Card.Body className="py-3 px-4 d-flex justify-content-between align-items-center">
        <div>
          <span className="fw-semibold text-dark">Component độc lập (CounterDisplay):</span>
          <div className="small text-muted">Đọc cùng store mà không qua props</div>
        </div>
        <Badge bg="dark" className="fs-5 px-3 py-2">
          {count}
        </Badge>
      </Card.Body>
    </Card>
  );
}

