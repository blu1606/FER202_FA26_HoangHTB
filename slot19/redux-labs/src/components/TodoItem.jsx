import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { toggleTodo, deleteTodo, editTodo } from '../redux/actions';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const save = () => {
    if (text.trim()) {
      dispatch(editTodo(todo.id, text.trim()));
    }
    setEditing(false);
  };

  return (
    <ListGroup.Item className="d-flex align-items-center gap-2 py-2">
      <Form.Check
        type="checkbox"
        id={`todo-${todo.id}`}
        checked={todo.done}
        onChange={() => dispatch(toggleTodo(todo.id))}
      />

      {editing ? (
        <Form.Control
          size="sm"
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === 'Enter' && save()}
        />
      ) : (
        <span
          className="flex-grow-1"
          style={{
            textDecoration: todo.done ? 'line-through' : 'none',
            color: todo.done ? '#6c757d' : 'inherit',
            cursor: 'pointer',
          }}
          onDoubleClick={() => setEditing(true)}
          title="Nhấp đúp chuột để sửa nội dung"
        >
          {todo.text}
        </span>
      )}

      <Button
        size="sm"
        variant="outline-danger"
        className="px-2 py-0"
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        ✕
      </Button>
    </ListGroup.Item>
  );
}
