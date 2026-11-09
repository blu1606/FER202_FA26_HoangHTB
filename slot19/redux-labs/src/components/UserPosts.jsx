import { useSelector } from 'react-redux';
import { Card, Spinner, Alert } from 'react-bootstrap';

export default function UserPosts() {
  const { selectedId, posts, postsLoading, postsError, items } = useSelector(
    (state) => state.users
  );
  const user = items.find((u) => u.id === selectedId);

  if (!selectedId) {
    return (
      <div className="text-center p-5 bg-white rounded shadow-sm border text-muted">
        👈 Nhấp chọn một người dùng ở danh sách bên trái để xem bài viết của họ.
      </div>
    );
  }

  if (postsLoading) {
    return (
      <div className="text-center p-5 bg-white rounded shadow-sm border">
        <Spinner animation="border" variant="primary" size="sm" />
        <span className="ms-2 text-muted">Đang tải bài viết...</span>
      </div>
    );
  }

  if (postsError) {
    return <Alert variant="danger">Lỗi tải bài viết: {postsError}</Alert>;
  }

  return (
    <div>
      <h5 className="mb-3 fw-bold text-dark">
        📝 Bài viết của <span className="text-primary">{user?.name}</span> ({posts.length})
      </h5>
      {posts.length === 0 && (
        <div className="text-muted p-3 bg-white rounded border">
          Người dùng này chưa có bài viết nào.
        </div>
      )}
      {posts.map((p) => (
        <Card key={p.id} className="mb-3 shadow-sm border-0">
          <Card.Body>
            <Card.Title className="fs-6 fw-bold text-capitalize text-primary">
              {p.title}
            </Card.Title>
            <Card.Text className="small text-secondary">{p.body}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
