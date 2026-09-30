import { useReducer, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {
  COLUMNS,
  taskReducer,
  initialTaskState,
  addTask,
  moveTask,
  renameTask,
  deleteTask,
  clearDone,
} from './taskReducer';

const PRIORITY = {
  high: { label: 'Cao', bg: 'danger' },
  low: { label: 'Thấp', bg: 'secondary' },
};

const TaskCard = ({ task, isFirst, isLast, dispatch }) => {
  const { id, title, priority } = task;
  return (
    <Card className="mb-2 shadow-sm border">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <span
            className="fw-medium text-dark"
            style={{ cursor: 'pointer' }}
            title="Nhấp đúp chuột để đổi tên"
            onDoubleClick={() => {
              const next = window.prompt('Nhập tên mới cho công việc:', title);
              if (next !== null && next.trim()) dispatch(renameTask(id, next.trim()));
            }}
          >
            {title}
          </span>
          <Badge bg={PRIORITY[priority].bg}>{PRIORITY[priority].label}</Badge>
        </div>
        <div className="d-flex gap-1 mt-3 align-items-center">
          <Button
            size="sm"
            variant="outline-secondary"
            disabled={isFirst}
            onClick={() => dispatch(moveTask(id, -1))}
            title="Chuyển sang cột trước"
          >
            ←
          </Button>
          <Button
            size="sm"
            variant="outline-secondary"
            disabled={isLast}
            onClick={() => dispatch(moveTask(id, 1))}
            title="Chuyển sang cột tiếp theo"
          >
            →
          </Button>
          <Button
            size="sm"
            variant="outline-danger"
            className="ms-auto"
            onClick={() => dispatch(deleteTask(id))}
          >
            Xóa
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default function KanbanBoard() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  // State giao diện UI cục bộ dùng useState
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [filter, setFilter] = useState('all');

  const visible = state.tasks.filter((t) => filter === 'all' || t.priority === filter);
  const doneCount = state.tasks.filter((t) => t.column === 'done').length;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask(title, priority));
    setTitle('');
  };

  const isTitleInvalid = title.length > 0 && !title.trim();

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-success text-white py-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h5 className="mb-0 fw-semibold">Bài 3: Bảng Kanban (Tách Reducer ra file riêng)</h5>
        <Badge bg="light" text="success" className="fw-bold fs-6">
          Tổng cộng {state.tasks.length} thẻ
        </Badge>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted small mb-3">
          Tổ chức <code>taskReducer.js</code> độc lập hoàn toàn với React. Kết hợp <code>useReducer</code> cho dữ liệu thẻ và <code>useState</code> cho bộ lọc UI. Nhấp đúp vào tên thẻ để đổi tên nhanh.
        </p>

        <Row className="g-2 mb-4 align-items-start">
          <Col md={6}>
            <Form onSubmit={handleAdd}>
              <InputGroup hasValidation>
                <Form.Control
                  placeholder="Nhập tên công việc mới..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  isInvalid={isTitleInvalid}
                />
                <Form.Select
                  style={{ maxWidth: 110 }}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  aria-label="Mức ưu tiên"
                >
                  <option value="low">Thấp</option>
                  <option value="high">Cao</option>
                </Form.Select>
                <Button type="submit" variant="primary" disabled={!title.trim()}>
                  + Thêm
                </Button>
                <Form.Control.Feedback type="invalid">
                  Vui lòng không để trống tên công việc.
                </Form.Control.Feedback>
              </InputGroup>
            </Form>
          </Col>
          <Col md={3}>
            <Form.Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Lọc theo mức ưu tiên"
            >
              <option value="all">Tất cả mức ưu tiên</option>
              <option value="high">Chỉ ưu tiên cao</option>
              <option value="low">Chỉ ưu tiên thấp</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Button
              variant="outline-success"
              className="w-100 fw-semibold"
              disabled={doneCount === 0}
              onClick={() => dispatch(clearDone())}
            >
              🧹 Dọn cột Hoàn thành ({doneCount})
            </Button>
          </Col>
        </Row>

        <Row className="g-3">
          {COLUMNS.map(({ key, title: columnTitle }, colIndex) => {
            const tasks = visible.filter((t) => t.column === key);
            return (
              <Col md={4} key={key}>
                <Card bg="light" className="h-100 border">
                  <Card.Header className="d-flex justify-content-between align-items-center bg-white py-2 fw-semibold">
                    <span>{columnTitle}</span>
                    <Badge bg="dark" pill>
                      {tasks.length}
                    </Badge>
                  </Card.Header>
                  <Card.Body className="p-3" style={{ minHeight: '260px' }}>
                    {tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        dispatch={dispatch}
                        isFirst={colIndex === 0}
                        isLast={colIndex === COLUMNS.length - 1}
                      />
                    ))}
                    {tasks.length === 0 && (
                      <div className="text-center py-4 text-muted fst-italic">
                        Chưa có thẻ nào trong cột này
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
}
