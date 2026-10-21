// NC6 – Danh sách: phân trang + lọc tác giả lưu trên URL (useSearchParams) · NC8: useAxios
import { Link, useSearchParams, useOutletContext } from "react-router-dom";
import { Table, Form, Pagination, Spinner, Button, Row, Col, Badge } from "react-bootstrap";
import useAxios from "../hooks/useAxios";
import useFlash from "../hooks/useFlash";
import postApi, { userApi } from "../api/postApi";
import ConfirmModal from "../components/ConfirmModal";
import ErrorAlert from "../components/common/ErrorAlert";
import { useState } from "react";

const LIMIT = 5;

export default function PostListPage() {
  useFlash(); // hiện thông báo khi được navigate tới kèm state.flash
  const { notify } = useOutletContext();

  // ----- Trạng thái lọc lưu trên URL: /posts?page=2&userId=1 -----
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const userId = searchParams.get("userId") ?? "";

  const changeQuery = (next) => {
    const merged = { page: String(page), userId, ...next };
    Object.keys(merged).forEach((k) => (merged[k] === "" || merged[k] == null) && delete merged[k]);
    setSearchParams(merged);
  };

  // ----- NC8: đọc danh sách tác giả bằng useAxios -----
  const { data: users } = useAxios((signal) => userApi.getAll(signal), [], { initialData: [] });

  const params = { _page: page, _limit: LIMIT };
  if (userId) params.userId = userId;

  // ----- NC8: đọc danh sách bài viết bằng useAxios -----
  const {
    data: posts,
    setData: setPosts,
    headers,
    loading,
    error,
    refetch,
  } = useAxios((signal) => postApi.getAll(params, signal), [page, userId], { initialData: [] });

  const total = Number(headers["x-total-count"] ?? posts.length);
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));
  const authorName = (id) => users.find((u) => u.id === id)?.name ?? `User ${id}`;

  // ----- Xóa 1 bài: hỏi xác nhận bằng Modal → DELETE → cập nhật state -----
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const handleDeleteOne = async () => {
    setDeleting(true);
    try {
      const res = await postApi.remove(toDelete.id);
      setPosts((prev) => prev.filter((p) => p.id !== toDelete.id));
      refetch(); // tải lại để cập nhật tổng và lấp chỗ trống
      notify("success", `DELETE /posts/${toDelete.id} → ${res.status}`);
    } catch (err) {
      notify("danger", "Xóa thất bại: " + err.userMessage);
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2 className="m-0">
          Bài viết <Badge bg="secondary">{total}</Badge>
        </h2>
        <Button as={Link} to="/posts/new">
          + Tạo bài viết
        </Button>
      </div>

      <Row className="mb-3 g-2">
        <Col md={4}>
          <Form.Select value={userId} onChange={(e) => changeQuery({ userId: e.target.value, page: "1" })}>
            <option value="">Tất cả tác giả</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2} className="d-flex align-items-center">
          {loading && <Spinner size="sm" />}
        </Col>
      </Row>

      {error && <ErrorAlert message={error} onRetry={refetch} />}

      <Table striped bordered hover responsive className={loading ? "opacity-50" : ""}>
        <thead>
          <tr>
            <th style={{ width: 60 }}>#</th>
            <th>Tiêu đề</th>
            <th style={{ width: 170 }}>Tác giả</th>
            <th style={{ width: 190 }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <Link to={`/posts/${p.id}`}>{p.title}</Link>
              </td>
              <td>{authorName(p.userId)}</td>
              <td>
                <Button as={Link} to={`/posts/${p.id}`} size="sm" variant="outline-info" className="me-1">
                  Xem
                </Button>
                <Button as={Link} to={`/posts/${p.id}/edit`} size="sm" variant="outline-primary" className="me-1">
                  Sửa
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => setToDelete(p)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
          {!loading && posts.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                Không có bài viết phù hợp
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        <Pagination.Prev disabled={page <= 1} onClick={() => changeQuery({ page: String(page - 1) })} />
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <Pagination.Item key={n} active={n === page} onClick={() => changeQuery({ page: String(n) })}>
            {n}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={page >= totalPages} onClick={() => changeQuery({ page: String(page + 1) })} />
      </Pagination>

      <ConfirmModal
        show={!!toDelete}
        title="Xóa bài viết"
        message={<>Xóa <strong>#{toDelete?.id} {toDelete?.title}</strong>?</>}
        confirmText="Xóa"
        loading={deleting}
        onConfirm={handleDeleteOne}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
