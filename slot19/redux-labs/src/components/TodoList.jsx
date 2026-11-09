import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import TodoItem from './TodoItem';
import { selectTodos, selectFilter, selectRemaining } from '../redux/selectors';
import { clearCompleted } from '../redux/actions';

export default function TodoList() {
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const remaining = useSelector(selectRemaining);
  const dispatch = useDispatch();

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done);
    if (filter === 'done') return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  return (
    <>
      <ListGroup className="shadow-sm">
        {visible.length === 0 && (
          <ListGroup.Item className="text-center text-muted py-3">
            Không có công việc nào.
          </ListGroup.Item>
        )}
        {visible.map((t) => (
          <TodoItem key={t.id} todo={t} />
        ))}
      </ListGroup>

      <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
        <small className="text-muted">
          Còn <b className="text-primary">{remaining}</b> việc chưa xong
        </small>
        <Button
          size="sm"
          variant="link"
          className="text-danger p-0 text-decoration-none"
          onClick={() => dispatch(clearCompleted())}
        >
          Xóa các việc đã xong
        </Button>
      </div>
    </>
  );
}
