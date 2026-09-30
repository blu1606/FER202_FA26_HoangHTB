import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

import {
  ORDER_TRANSITIONS as TRANSITIONS,
  ORDER_STATUS_INFO as STATUS_INFO,
  ORDER_EVENT_LABELS as EVENT_LABELS,
  INITIAL_ORDER_STATE as initialState,
} from '../data/exercise-data';

const orderReducer = (state, action) => {
  if (action.type === 'SET_REASON') {
    return { ...state, cancelReason: action.payload, error: '' };
  }
  if (action.type === 'RESET') return initialState;

  const nextStatus = TRANSITIONS[state.status][action.type];
  if (!nextStatus) {
    // Sự kiện không hợp lệ ở trạng thái hiện tại -> giữ nguyên trạng thái, báo lỗi
    return {
      ...state,
      error: `Không thể thực hiện "${action.type}" khi đơn đang ở trạng thái "${STATUS_INFO[state.status].label}".`,
    };
  }

  if (action.type === 'CANCEL' && state.cancelReason.trim().length < 5) {
    return { ...state, error: 'Vui lòng nhập lý do hủy (ít nhất 5 ký tự).' };
  }

  return {
    ...state,
    status: nextStatus,
    error: '',
    timeline: [...state.timeline, { status: nextStatus, at: action.at }],
  };
};

const now = () =>
  new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

export default function OrderTracker() {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const { status, cancelReason, error, timeline } = state;
  const allowedEvents = Object.keys(TRANSITIONS[status]); // Dữ liệu dẫn xuất từ trạng thái
  const isFinal = allowedEvents.length === 0;

  const isReasonInvalid = cancelReason.length > 0 && cancelReason.trim().length < 5;

  return (
    <Card className="shadow-sm border-0 mb-4 mx-auto" style={{ maxWidth: 540 }}>
      <Card.Header className="bg-dark text-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-semibold">Bài 2: Theo dõi trạng thái đơn hàng</h5>
        <Badge bg={STATUS_INFO[status].bg} className="fs-6 px-3 py-1">
          {STATUS_INFO[status].label}
        </Badge>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted small mb-3">
          Mô hình hóa vòng đời đơn hàng theo <strong>máy trạng thái (state machine)</strong>. Reducer tự động chặn các hành động phi logic.
        </p>

        {error && (
          <Alert variant="danger" dismissible onClose={() => dispatch({ type: 'SET_REASON', payload: cancelReason })}>
            {error}
          </Alert>
        )}

        {allowedEvents.includes('CANCEL') && (
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Lý do hủy đơn:</Form.Label>
            <Form.Control
              placeholder="Nhập lý do hủy (tối thiểu 5 ký tự)..."
              value={cancelReason}
              onChange={(e) => dispatch({ type: 'SET_REASON', payload: e.target.value })}
              isInvalid={isReasonInvalid}
            />
            <Form.Control.Feedback type="invalid">
              Lý do hủy phải có ít nhất 5 ký tự (hiện có {cancelReason.trim().length} ký tự).
            </Form.Control.Feedback>
          </Form.Group>
        )}

        <div className="d-flex flex-wrap gap-2 mb-4">
          {Object.keys(EVENT_LABELS).map((event) => (
            <Button
              key={event}
              size="sm"
              variant={event === 'CANCEL' ? 'outline-danger' : 'primary'}
              disabled={!allowedEvents.includes(event)}
              onClick={() => dispatch({ type: event, at: now() })}
            >
              {EVENT_LABELS[event]}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline-secondary"
            onClick={() => dispatch({ type: 'SHIP', at: now() })}
          >
            🧪 Thử gửi SHIP trái phép
          </Button>
        </div>

        <h6 className="fw-bold mb-2">Dòng thời gian (Timeline):</h6>
        <ListGroup variant="flush" className="border rounded mb-3">
          {timeline.map(({ status: s, at }, i) => (
            <ListGroup.Item key={`${s}-${i}`} className="d-flex justify-content-between align-items-center py-2">
              <div>
                <Badge bg={STATUS_INFO[s].bg} className="me-2">
                  {STATUS_INFO[s].label}
                </Badge>
                <span className="small text-muted">{`Bước ${i + 1}`}</span>
              </div>
              <small className="font-monospace text-muted">{at}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {isFinal && (
          <Button
            variant="success"
            className="w-100 fw-semibold"
            onClick={() => dispatch({ type: 'RESET' })}
          >
            ↻ Tạo đơn hàng mới
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
