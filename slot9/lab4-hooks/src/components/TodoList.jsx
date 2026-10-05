import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';

const initialTodos = [
  { id: 1, title: 'Ôn lại ES6', done: true },
  { id: 2, title: 'Làm bài tập useState', done: false },
];

const FILTERS = { all: 'Tất cả', active: 'Chưa xong', done: 'Đã xong' };

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const validateTitle = (text, ignoreId = null) => {
    const value = text.trim();
    if (!value) return 'Nội dung không được để trống';
    if (value.length > 60) return 'Tối đa 60 ký tự';
    const duplicated = todos.some(
      (t) => t.id !== ignoreId && t.title.toLowerCase() === value.toLowerCase(),
    );
    return duplicated ? 'Công việc này đã có trong danh sách' : '';
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const message = validateTitle(title);
    if (message) {
      setError(message);
      return;
    }
    setTodos((prev) => [...prev, { id: Date.now(), title: title.trim(), done: false }]);
    setTitle('');
    setError('');
  };

  const toggleTodo = (id) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

  const startEdit = ({ id, title: current }) => {
    setEditingId(id);
    setEditText(current);
  };

  const saveEdit = () => {
    if (validateTitle(editText, editingId)) return; // giữ ô sửa nếu chưa hợp lệ
    setTodos((prev) =>
      prev.map((t) => (t.id === editingId ? { ...t, title: editText.trim() } : t)),
    );
    setEditingId(null);
  };

  const handleEditKeyDown = (event) => {
    if (event.key === 'Enter') saveEdit();
    if (event.key === 'Escape') setEditingId(null);
  };

  const visibleTodos = todos.filter((t) =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done,
  );
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <Card className="shadow-sm border-0 mx-auto" style={{ maxWidth: 560 }}>
      <Card.Header className="bg-white py-3">
        <h5 className="mb-0 fw-bold text-primary">Danh sách việc cần làm (Todo List)</h5>
      </Card.Header>
      <Card.Body>
        <Form noValidate onSubmit={handleAdd} className="mb-3">
          <InputGroup hasValidation>
            <Form.Control
              placeholder="Thêm công việc rồi nhấn Enter..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              isInvalid={Boolean(error)}
            />
            <Button type="submit" variant="primary">
              Thêm
            </Button>
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </InputGroup>
        </Form>

        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <ButtonGroup size="sm">
            {Object.entries(FILTERS).map(([key, label]) => (
              <Button
                key={key}
                variant={filter === key ? 'dark' : 'outline-dark'}
                onClick={() => setFilter(key)}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>

          <span className="badge bg-secondary-subtle text-secondary border">
            {`Tổng: ${todos.length}`}
          </span>
        </div>

        <ListGroup className="mb-3">
          {visibleTodos.map((todo) => (
            <ListGroup.Item
              key={todo.id}
              className="d-flex align-items-center gap-2 py-2"
            >
              <Form.Check
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                aria-label={`Hoàn thành ${todo.title}`}
              />
              {editingId === todo.id ? (
                <Form.Control
                  size="sm"
                  autoFocus
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleEditKeyDown}
                  onBlur={saveEdit}
                  isInvalid={Boolean(validateTitle(editText, todo.id))}
                />
              ) : (
                <span
                  className={`flex-grow-1 user-select-none ${
                    todo.done ? 'text-decoration-line-through text-muted' : 'text-dark'
                  }`}
                  onDoubleClick={() => startEdit(todo)}
                  title="Nhấp đúp để chỉnh sửa"
                  style={{ cursor: 'pointer' }}
                >
                  {todo.title}
                </span>
              )}
              <Button
                size="sm"
                variant="outline-danger"
                className="py-0 px-2"
                onClick={() => deleteTodo(todo.id)}
              >
                ✕
              </Button>
            </ListGroup.Item>
          ))}
          {visibleTodos.length === 0 && (
            <ListGroup.Item className="text-muted text-center py-3">
              Không có công việc nào trong mục này
            </ListGroup.Item>
          )}
        </ListGroup>

        <div className="d-flex justify-content-between align-items-center small text-muted border-top pt-2">
          <span>{`Còn ${remaining} việc chưa xong`}</span>
          {todos.some((t) => t.done) && (
            <Button
              size="sm"
              variant="link"
              className="p-0 text-danger text-decoration-none"
              onClick={() => setTodos((prev) => prev.filter((t) => !t.done))}
            >
              Xóa việc đã xong
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TodoList;
