import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import {
  COUNTER_MIN as MIN,
  COUNTER_MAX as MAX,
  INITIAL_COUNTER_STATE as initialState,
} from '../data/exercise-data';

// 1. Hằng số action: tránh gõ sai chính tả
const ACTIONS = {
  INCREMENT: 'counter/increment',
  DECREMENT: 'counter/decrement',
  SET_STEP: 'counter/setStep',
  RESET: 'counter/reset',
};

const clamp = (n) => Math.min(MAX, Math.max(MIN, n));

// 2. Reducer thuần túy: (state, action) => newState
const counterReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
    case ACTIONS.DECREMENT: {
      const delta = action.type === ACTIONS.INCREMENT ? state.step : -state.step;
      const next = clamp(state.count + delta);
      if (next === state.count) return state; // Không đổi -> trả về state cũ, React bỏ qua render
      return {
        ...state,
        count: next,
        history: [`${state.count} → ${next}`, ...state.history].slice(0, 5),
      };
    }
    case ACTIONS.SET_STEP:
      return { ...state, step: action.payload };
    case ACTIONS.RESET:
      return initialState;
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`);
  }
};

export default function StepCounter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const { count, step, history } = state;

  return (
    <Card className="shadow-sm border-0 mb-4 mx-auto" style={{ maxWidth: 480 }}>
      <Card.Header className="bg-primary text-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-semibold">Bài 1: Bộ đếm có bước nhảy & Lịch sử</h5>
        <Badge bg="light" text="primary" className="fw-bold">
          useReducer
        </Badge>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted small mb-3">
          Chuyển từ nhiều <code>useState</code> sang 1 <code>useReducer</code> duy nhất, kẹp giá trị 0–100 và lưu 5 thay đổi gần nhất.
        </p>

        <div className="bg-light p-3 rounded text-center mb-3 border">
          <span className="text-muted small d-block">Giá trị hiện tại</span>
          <div className="display-3 fw-bold text-primary my-1">{count}</div>
          <small className="text-muted">Giới hạn: [{MIN} — {MAX}]</small>
        </div>

        <div className="d-flex gap-2 justify-content-center mb-4">
          <Button
            variant="outline-primary"
            className="fw-bold px-3"
            disabled={count <= MIN}
            onClick={() => dispatch({ type: ACTIONS.DECREMENT })}
          >
            {`− ${step}`}
          </Button>
          <Button
            variant="primary"
            className="fw-bold px-3"
            disabled={count >= MAX}
            onClick={() => dispatch({ type: ACTIONS.INCREMENT })}
          >
            {`+ ${step}`}
          </Button>
          <Button
            variant="outline-danger"
            className="fw-semibold"
            onClick={() => dispatch({ type: ACTIONS.RESET })}
          >
            Đặt lại
          </Button>
        </div>

        <Form.Group className="mb-4" controlId="step-select">
          <Form.Label className="fw-semibold">Chọn bước nhảy (Step):</Form.Label>
          <Form.Select
            value={step}
            onChange={(e) => dispatch({ type: ACTIONS.SET_STEP, payload: Number(e.target.value) })}
          >
            {[1, 5, 10, 25].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold mb-0 text-dark">5 thay đổi gần nhất:</h6>
          <Badge bg="secondary" pill>{history.length}/5</Badge>
        </div>

        <ListGroup className="rounded">
          {history.length === 0 ? (
            <ListGroup.Item className="text-muted text-center py-3 bg-light">
              Chưa có thay đổi nào được ghi lại.
            </ListGroup.Item>
          ) : (
            history.map((line, i) => (
              <ListGroup.Item key={`${line}-${i}`} className="d-flex justify-content-between align-items-center py-2">
                <span className="font-monospace fw-medium text-dark">{line}</span>
                <Badge bg="info" text="dark">#{i + 1}</Badge>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
