// 2.1 – GET có params  ·  NC8: dùng useAxios
import { Card, ListGroup } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import AsyncContent from "../common/AsyncContent";
import postApi from "../../api/postApi";

export default function PostListCard() {
  const { data, loading, error, refetch } = useAxios(
    (signal) => postApi.getAll({ userId: 1, _limit: 5 }, signal),
    [],
    { initialData: [] }
  );

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>2.1 · GET</strong> /posts?userId=1&amp;_limit=5</Card.Header>
      <Card.Body>
        <AsyncContent loading={loading} error={error} data={data} onRetry={refetch} emptyText="Không có bài viết">
          {(posts) => (
            <ListGroup variant="flush">
              {posts.map((p) => <ListGroup.Item key={p.id}>#{p.id} – {p.title}</ListGroup.Item>)}
            </ListGroup>
          )}
        </AsyncContent>
      </Card.Body>
    </Card>
  );
}
