// 2.5 – DELETE  ·  NC1 · NC5 (Modal xác nhận + Toast) · NC8
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import AsyncContent from "../common/AsyncContent";
import ConfirmModal from "../ConfirmModal";
import postApi from "../../api/postApi";

export default function DeletePostCard() {
  const { notify } = useOutletContext();
  const { data, setData, loading, error, refetch } = useAxios(
    (signal) => postApi.getAll({ _limit: 5 }, signal),
    [],
    { initialData: [] }
  );
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await postApi.remove(toDelete.id);
      setData((prev) => prev.filter((p) => p.id !== toDelete.id));
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
        <AsyncContent loading={loading} error={error} data={data} onRetry={refetch} emptyText="Đã xóa hết">
          {(posts) => (
            <ListGroup variant="flush">
              {posts.map((p) => (
                <ListGroup.Item key={p.id} className="d-flex justify-content-between align-items-center">
                  <span>#{p.id} – {p.title}</span>
                  <Button size="sm" variant="outline-danger" onClick={() => setToDelete(p)}>Xóa</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </AsyncContent>
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
