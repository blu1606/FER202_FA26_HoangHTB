import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Spinner, Alert, Button } from 'react-bootstrap';
import { fetchUsers, fetchPostsByUser } from '../redux/users/userActions';

export default function UserList() {
  const { items, loading, error, selectedId } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers()); // dispatch một HÀM – nhờ redux-thunk
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center p-4 bg-white rounded shadow-sm border">
        <Spinner animation="border" variant="primary" />
        <div className="mt-2 text-muted small">Đang tải danh sách người dùng...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <div>Lỗi: {error}</div>
        <Button size="sm" variant="danger" className="mt-2" onClick={() => dispatch(fetchUsers())}>
          🔄 Thử lại
        </Button>
      </Alert>
    );
  }

  return (
    <ListGroup className="shadow-sm">
      {items.map((u) => (
        <ListGroup.Item
          key={u.id}
          action
          active={u.id === selectedId}
          onClick={() => dispatch(fetchPostsByUser(u.id))}
          className="d-flex flex-column align-items-start py-2"
        >
          <div className="fw-bold">{u.name}</div>
          <small className={u.id === selectedId ? 'text-white-50' : 'text-muted'}>
            {u.email} · {u.company?.name}
          </small>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
