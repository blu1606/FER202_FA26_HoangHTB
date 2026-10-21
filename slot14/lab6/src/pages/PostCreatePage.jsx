// POST · NC1 · NC5 · NC6 (navigate + state) · NC8 (useAxios cho danh sách tác giả)
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Card } from "react-bootstrap";
import useAxios from "../hooks/useAxios";
import postApi, { userApi } from "../api/postApi";
import PostForm from "../components/PostForm";

export default function PostCreatePage() {
  const navigate = useNavigate();
  const { notify } = useOutletContext();
  const { data: users } = useAxios((signal) => userApi.getAll(signal), [], { initialData: [] });
  const [submitting, setSubmitting] = useState(false);

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
