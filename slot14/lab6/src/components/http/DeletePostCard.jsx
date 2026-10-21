// 2.5 – DELETE · NC5 Modal · NC6: Toast dùng chung qua useOutletContext()
import { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";
import postApi from "../../api/postApi";
import ConfirmModal from "../ConfirmModal";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorAlert from "../common/ErrorAlert";
import EmptyState from "../common/EmptyState";

export default function DeletePostCard() {
  const { notify } = useOutletContext(); // hàm hiện Toast do Layout cung cấp
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toDelete, setToDelete] = useState(null); // bài đang chờ xác nhận xóa
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await postApi.getAll({ _limit: 5 }, controller.signal);
        setPosts(res.data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(err.userMessage);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await postApi.remove(toDelete.id);
      setPosts((prev) => prev.filter((p) => p.id !== toDelete.id));
      notify("success", `DELETE /posts/${toDelete.id} → ${res.status}`);
      setToDelete(null);
    } catch (err) {
      notify("danger", "Xóa thất bại: " + err.userMessage);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>2.5 · DELETE</strong> /posts/:id</Card.Header>
      <Card.Body>
        {loading && <LoadingSpinner />}
        {!loading && error && <ErrorAlert message={error} />}
        {!loading && !error && posts.length === 0 && <EmptyState text="Đã xóa hết" />}
        <ListGroup variant="flush">
          {posts.map((p) => (
            <ListGroup.Item key={p.id} className="d-flex justify-content-between align-items-center">
              <span>#{p.id} – {p.title}</span>
              <Button size="sm" variant="outline-danger" onClick={() => setToDelete(p)}>Xóa</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>

      <ConfirmModal
        show={!!toDelete}
        title="Xóa bài viết"
        message={`Xóa bài viết #${toDelete?.id}?`}
        confirmText="Xóa"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </Card>
  );
}
