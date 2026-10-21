// NC6 – POST: tạo xong → navigate về /posts kèm thông báo qua state
import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Card } from "react-bootstrap";
import postApi, { userApi } from "../api/postApi";
import PostForm from "../components/PostForm";

export default function PostCreatePage() {
  const navigate = useNavigate();
  const { notify } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Danh sách tác giả cho Form.Select
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await userApi.getAll(controller.signal);
        setUsers(res.data);
      } catch {
        // lỗi hủy hoặc lỗi mạng: form vẫn dùng được, chỉ thiếu danh sách tác giả
      }
    };
    load();
    return () => controller.abort();
  }, []);

  const handleCreate = async (values) => {
    setSubmitting(true);
    try {
      const res = await postApi.create(values);
      navigate("/posts", {
        state: { flash: { bg: "success", message: `POST /posts → ${res.status}. Đã tạo bài viết #${res.data.id}: "${res.data.title}"` } },
      });
    } catch (err) {
      notify("danger", "Tạo thất bại: " + err.userMessage);
      setSubmitting(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header as="h4">Tạo bài viết (POST)</Card.Header>
      <Card.Body>
        <PostForm
          initialValues={{ title: "", body: "", userId: "" }}
          users={users}
          submitting={submitting}
          submitLabel="Tạo bài viết"
          onSubmit={handleCreate}
          onCancel={() => navigate("/posts")}
        />
      </Card.Body>
    </Card>
  );
}
