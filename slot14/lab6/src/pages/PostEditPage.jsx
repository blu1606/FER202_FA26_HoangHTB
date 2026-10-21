// NC6 – Sửa toàn bộ: GET (bài viết + tác giả song song) rồi PUT
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useOutletContext, Link } from "react-router-dom";
import { Card, Alert } from "react-bootstrap";
import postApi, { userApi } from "../api/postApi";
import PostForm from "../components/PostForm";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function PostEditPage() {
  const { id } = useParams(); // "/posts/3/edit" → id = "3" (chuỗi)
  const navigate = useNavigate();
  const { notify } = useOutletContext();
  const [data, setData] = useState(null); // { post, users }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [pRes, uRes] = await Promise.all([
          postApi.getById(id, controller.signal),
          userApi.getAll(controller.signal),
        ]);
        setData({ post: pRes.data, users: uRes.data });
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(err.userMessage);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [id]);

  const handleUpdate = async (values) => {
    setSubmitting(true);
    try {
      const res = await postApi.update(id, { id: Number(id), ...values }); // PUT gửi đầy đủ
      navigate(`/posts/${id}`, {
        state: { flash: { bg: "success", message: `PUT /posts/${id} → ${res.status}. Đã cập nhật bài viết.` } },
      });
    } catch (err) {
      notify("danger", "Cập nhật thất bại: " + err.userMessage);
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <Alert variant="danger">
        {error} <Alert.Link as={Link} to="/posts">Về danh sách</Alert.Link>
      </Alert>
    );
  }

  const { post, users } = data;
  return (
    <Card className="shadow-sm">
      <Card.Header as="h4">Sửa bài viết #{id} (PUT)</Card.Header>
      <Card.Body>
        <PostForm
          initialValues={{ title: post.title, body: post.body, userId: String(post.userId) }}
          users={users}
          submitting={submitting}
          submitLabel="Lưu thay đổi"
          onSubmit={handleUpdate}
          onCancel={() => navigate(`/posts/${id}`)}
        />
      </Card.Body>
    </Card>
  );
}
