// PUT · NC1 · NC3 (Promise.all) · NC8
import { useState } from "react";
import { useParams, useNavigate, useOutletContext, Link } from "react-router-dom";
import { Card, Alert } from "react-bootstrap";
import useAxios from "../hooks/useAxios";
import postApi, { userApi } from "../api/postApi";
import PostForm from "../components/PostForm";
import LoadingSpinner from "../components/common/LoadingSpinner";

const loadEditData = async (id, signal) => {
  const [pRes, uRes] = await Promise.all([postApi.getById(id, signal), userApi.getAll(signal)]);
  return { data: { post: pRes.data, users: uRes.data } };
};

export default function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useOutletContext();
  const { data, loading, error } = useAxios((signal) => loadEditData(id, signal), [id]);
  const [submitting, setSubmitting] = useState(false);

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
