// 2.1 – GET có params · NC5: Card + ListGroup + Spinner + Alert
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, ListGroup } from "react-bootstrap";
import postApi from "../../api/postApi";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorAlert from "../common/ErrorAlert";
import EmptyState from "../common/EmptyState";

export default function PostListCard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await postApi.getAll({ userId: 1, _limit: 5 }, controller.signal);
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

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>2.1 · GET</strong> /posts?userId=1&amp;_limit=5</Card.Header>
      <Card.Body>
        {loading && <LoadingSpinner />}
        {!loading && error && <ErrorAlert message={error} />}
        {!loading && !error && posts.length === 0 && <EmptyState text="Không có bài viết" />}
        {!loading && !error && posts.length > 0 && (
          <ListGroup variant="flush">
            {posts.map((p) => <ListGroup.Item key={p.id}>#{p.id} – {p.title}</ListGroup.Item>)}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}
