import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  double,
} from '../redux/counterActions';

export default function Counter() {
  const count = useSelector((state) => state.counter.value); // đọc state từ store
  const dispatch = useDispatch(); // lấy hàm dispatch
  const [step, setStep] = useState(2); // state cục bộ của ô nhập bước nhảy

  return (
    <Card className="mx-auto mt-4 text-center shadow border-0" style={{ maxWidth: 440 }}>
      <Card.Header as="h4" className="bg-primary text-white py-3">
        Redux Counter (Bài 1)
      </Card.Header>
      <Card.Body className="p-4">
        <div className="mb-2">
          <small className="text-muted text-uppercase fw-semibold">Giá trị hiện tại</small>
        </div>
        <h1 className="display-2 fw-bold text-primary mb-2">{count}</h1>
        <Badge
          bg={count % 2 === 0 ? 'success' : 'warning'}
          text={count % 2 === 0 ? 'white' : 'dark'}
          className="mb-4 px-3 py-2 fs-6"
        >
          {count % 2 === 0 ? '✓ Số chẵn' : '⚡ Số lẻ'}
        </Badge>

        <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
          <Button variant="outline-danger" className="fw-bold px-3" onClick={() => dispatch(decrement())}>
            - Giảm 1
          </Button>
          <Button variant="success" className="fw-bold px-3" onClick={() => dispatch(increment())}>
            + Tăng 1
          </Button>
          <Button variant="info" className="text-white fw-bold px-3" onClick={() => dispatch(incrementByAmount(5))}>
            +5
          </Button>
          <Button variant="warning" className="fw-bold px-3" onClick={() => dispatch(double())}>
            x2 (Nhân đôi)
          </Button>
          <Button variant="secondary" className="px-3" onClick={() => dispatch(reset())}>
            Reset
          </Button>
        </div>

        <div className="border-top pt-3">
          <Form.Label className="small text-muted mb-2">Tăng theo số bước tùy chọn:</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              placeholder="Nhập bước nhảy..."
            />
            <Button
              variant="primary"
              onClick={() => dispatch(incrementByAmount(step))}
            >
              Cộng {step}
            </Button>
          </InputGroup>
        </div>
      </Card.Body>
    </Card>
  );
}

