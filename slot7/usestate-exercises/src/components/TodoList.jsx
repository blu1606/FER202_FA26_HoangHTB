import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import { INITIAL_TODOS } from '../data/exercise-data';

export default function TodoList() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [inputText, setInputText] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(),
      text: trimmed,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputText('');
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-warning text-dark py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-semibold">Bài 4: Todo List</h5>
        <Badge bg="dark" className="fs-6 px-3 py-1">
          {todos.length} công việc
        </Badge>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted mb-3">
          Thêm các mục công việc mới vào danh sách và nhấn nút Xóa để loại bỏ khi đã hoàn thành.
        </p>

        <Form onSubmit={handleAddTodo} className="mb-4">
          <InputGroup size="lg">
            <Form.Control
              placeholder="Nhập tên công việc cần làm..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button variant="warning" type="submit" className="fw-semibold px-4">
              + Thêm
            </Button>
          </InputGroup>
        </Form>

        {todos.length === 0 ? (
          <div className="text-center py-4 bg-light rounded text-muted">
            Danh sách trống! Hãy thêm công việc mới ở khung phía trên.
          </div>
        ) : (
          <ListGroup variant="flush" className="border rounded">
            {todos.map((todo, index) => (
              <ListGroup.Item
                key={todo.id}
                className="d-flex justify-content-between align-items-center py-3"
              >
                <div className="d-flex align-items-center gap-2">
                  <Badge bg="secondary" pill>
                    {index + 1}
                  </Badge>
                  <span className="fw-medium text-dark">{todo.text}</span>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteTodo(todo.id)}
                  title="Xóa công việc này"
                >
                  Xóa
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}
