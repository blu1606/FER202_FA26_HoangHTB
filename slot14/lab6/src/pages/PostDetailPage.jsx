// NC3 (tuần tự rồi song song, allSettled, đo thời gian) · PATCH · DELETE · NC8
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link, useOutletContext } from "react-router-dom";
import { Card, Spinner, Alert, Button, ListGroup, Form, InputGroup, Badge, Table } from "react-bootstrap";
import useAxios from "../hooks/useAxios";
import useFlash from "../hooks/useFlash";
import postApi, { userApi } from "../api/postApi";
import ConfirmModal from "../components/ConfirmModal";
import LoadingSpinner from "../components/common/LoadingSpinner";

// Bước 1 tuần tự (cần userId) → bước 2 song song, chấp nhận lỗi một phần
const loadDetail = async (id, signal) => {
  const { data: post } = await postApi.getById(id, signal);
  const [userResult, commentsResult] = await Promise.allSettled([
    userApi.getById(post.userId, signal),
    postApi.getComments(id, signal),
  ]);
  if (signal.aborted) throw new axios.CanceledError(); // bị hủy giữa chừng → useAxios bỏ qua
  return {
    data: {
      post,
      author: userResult.status === "fulfilled" ? userResult.value.data : null,
      comments: commentsResult.status === "fulfilled" ? commentsResult.value.data : [],
      warning: [userResult, commentsResult].some((r) => r.status === "rejected")
        ? "Một số thông tin phụ (tác giả / bình luận) không tải được."
        : null,
    },
  };
};

// NC3.2 – So sánh thời gian tuần tự và song song
const measure = async (id) => {
  let t0 = performance.now();
  const { data: p1 } = await postApi.getById(id);
  await userApi.getById(p1.userId);
  await postApi.getComments(id);
  const sequential = Math.round(performance.now() - t0);

  t0 = performance.now();
  const { data: p2 } = await postApi.getById(id);
  await Promise.all([userApi.getById(p2.userId), postApi.getComments(id)]);
  const parallel = Math.round(performance.now() - t0);
  return { sequential, parallel };
};

export default function PostDetailPage() {
  useFlash();
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useOutletContext();

  const { data, setData, loading, error, refetch } = useAxios((signal) => loadDetail(id, signal), [id]);

  const [quickTitle, setQuickTitle] = useState("");
  const [patching, setPatching] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [timing, setTiming] = useState(null);
  const [measuring, setMeasuring] = useState(false);

  useEffect(() => {
    if (data) setQuickTitle(data.post.title);
  }, [data]);

  // PATCH – chỉ gửi title
  const handlePatch = async (e) => {
    e.preventDefault();
    if (quickTitle.trim().length < 5) return notify("warning", "Tiêu đề tối thiểu 5 ký tự");
    setPatching(true);
    try {
      const res = await postApi.patch(id, { title: quickTitle.trim() });
      setData((prev) => ({ ...prev, post: { ...prev.post, ...res.data } }));
      notify("success", `PATCH /posts/${id} → ${res.status}`);
    } catch (err) {
      notify("danger", "Cập nhật thất bại: " + err.userMessage);
    } finally {
      setPatching(false);
    }
  };

  // DELETE – xong thì về danh sách kèm thông báo
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await postApi.remove(id);
      navigate("/posts", {
        state: { flash: { bg: "success", message: `DELETE /posts/${id} → ${res.status}. Đã xóa bài viết.` } },
      });
    } catch (err) {
      notify("danger", "Xóa thất bại: " + err.userMessage);
      setDeleting(false);
      setShowDelete(false);
    }
  };

  const handleMeasure = async () => {
    setMeasuring(true);
    try {
      setTiming(await measure(id));
    } catch (err) {
      notify("danger", err.userMessage ?? err.message);
    } finally {
      setMeasuring(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <Alert variant="warning">
        {error} – bài viết #{id}. <Alert.Link as={Link} to="/posts">Quay lại danh sách</Alert.Link>{" "}
        <Button size="sm" variant="outline-secondary" className="ms-2" onClick={refetch}>
          Thử lại
        </Button>
      </Alert>
    );
  }

  const { post, author, comments, warning } = data;

  return (
    <>
      <Button variant="link" className="px-0 mb-2" onClick={() => navigate(-1)}>
        ← Quay lại
      </Button>
      {warning && <Alert variant="warning">{warning}</Alert>}

      <Card className="mb-4 shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span>
            Post #{post.id} · <strong>{author?.name ?? `User ${post.userId}`}</strong>
            {author && ` (${author.email})`}
          </span>
          <span>
            <Button as={Link} to={`/posts/${post.id}/edit`} size="sm" variant="outline-primary" className="me-2">
              Sửa (PUT)
            </Button>
            <Button size="sm" variant="outline-danger" onClick={() => setShowDelete(true)}>
              Xóa
            </Button>
          </span>
        </Card.Header>
        <Card.Body>
          <Card.Title as="h2" className="fs-3">{post.title}</Card.Title>
          <Card.Text style={{ whiteSpace: "pre-line" }}>{post.body}</Card.Text>

          <Form onSubmit={handlePatch} className="mt-4">
            <Form.Label className="small text-muted">Sửa nhanh tiêu đề (PATCH)</Form.Label>
            <InputGroup>
              <Form.Control value={quickTitle} onChange={(e) => setQuickTitle(e.target.value)} />
              <Button type="submit" variant="warning" disabled={patching || quickTitle === post.title}>
                {patching ? <Spinner size="sm" /> : "PATCH"}
              </Button>
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>NC3 · So sánh tuần tự và song song</Card.Header>
        <Card.Body>
          <Button size="sm" onClick={handleMeasure} disabled={measuring}>
            {measuring ? <><Spinner size="sm" /> Đang đo...</> : "Đo thời gian"}
          </Button>
          {timing && (
            <Table size="sm" bordered className="mt-3 mb-0" style={{ maxWidth: 360 }}>
              <tbody>
                <tr><th>Tuần tự (3 request nối tiếp)</th><td>{timing.sequential} ms</td></tr>
                <tr><th>Song song (1 + Promise.all)</th><td>{timing.parallel} ms</td></tr>
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <h4>Bình luận <Badge bg="secondary">{comments.length}</Badge></h4>
      <ListGroup>
        {comments.map((c) => (
          <ListGroup.Item key={c.id}>
            <div className="fw-semibold">{c.name}</div>
            <small className="text-muted">{c.email}</small>
            <div>{c.body}</div>
          </ListGroup.Item>
        ))}
        {comments.length === 0 && <ListGroup.Item className="text-muted">Chưa có bình luận</ListGroup.Item>}
      </ListGroup>

      <ConfirmModal
        show={showDelete}
        title="Xóa bài viết"
        message={`Xóa bài viết #${post.id}?`}
        confirmText="Xóa"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </>
  );
}
