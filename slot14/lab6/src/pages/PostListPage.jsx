// NC6 (useSearchParams) · NC8 (useAxios) · NC9 (tìm kiếm debounce, q trên URL)
import { useState, useEffect } from "react";
import { Link, useSearchParams, useOutletContext } from "react-router-dom";
import { Table, Form, Pagination, Spinner, Button, Row, Col, Badge, InputGroup } from "react-bootstrap";
import useAxios from "../hooks/useAxios";
import useDebounce from "../hooks/useDebounce";
import useFlash from "../hooks/useFlash";
import postApi, { userApi } from "../api/postApi";
import ConfirmModal from "../components/ConfirmModal";
import ErrorAlert from "../components/common/ErrorAlert";

const LIMIT = 5;

export default function PostListPage() {
  useFlash();
  const { notify } = useOutletContext();

  // ----- Trạng thái lọc lưu trên URL: /posts?page=2&userId=1&q=react -----
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const userId = searchParams.get("userId") ?? "";
  const q = searchParams.get("q") ?? "";

  const changeQuery = (next) => {
    const merged = { page: String(page), userId, q, ...next };
    Object.keys(merged).forEach((k) => (merged[k] === "" || merged[k] == null) && delete merged[k]);
    setSearchParams(merged);
  };

  // ----- NC9: ô tìm kiếm + debounce 500ms → ghi q lên URL -----
  const [keyword, setKeyword] = useState(q);
  const debounced = useDebounce(keyword.trim(), 500);
  useEffect(() => {
    if (debounced !== q) changeQuery({ q: debounced, page: "1" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  // ----- NC8: đọc dữ liệu bằng useAxios -----
  const { data: users } = useAxios((signal) => userApi.getAll(signal), [], { initialData: [] });

  const params = { _page: page, _limit: LIMIT };
  if (userId) params.userId = userId;
  if (q) params.q = q;

  const {
    data: posts,
    setData: setPosts,
    headers,
    loading,
    error,
    refetch,
  } = useAxios((signal) => postApi.getAll(params, signal), [page, userId, q], { initialData: [] });

  const total = Number(headers["x-total-count"] ?? posts.length);
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));
  const authorName = (id) => users.find((u) => u.id === id)?.name ?? `User ${id}`;

  // ----- Xóa 1 bài -----
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const handleDeleteOne = async () => {
    setDeleting(true);
    try {
      const res = await postApi.remove(toDelete.id);
      setPosts((prev) => prev.filter((p) => p.id !== toDelete.id));
      refetch();
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
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder="Tìm bài viết..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword && (
              <Button variant="outline-secondary" onClick={() => setKeyword("")}>
                ✕
              </Button>
            )}
          </InputGroup>
        </Col>
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
