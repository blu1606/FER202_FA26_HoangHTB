// 2.6 – axios(config): headers, params, timeout  ·  NC2 (dùng axiosClient) · NC8
import { Card, ListGroup, Table } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import AsyncContent from "../common/AsyncContent";
import axiosClient from "../../api/axiosClient";

const loadWithConfig = async (signal) => {
  const res = await axiosClient({
    method: "get",
    url: "/posts",
    params: { _page: 1, _limit: 3 },
    headers: { Accept: "application/json", "X-Client": "FER202" },
    timeout: 5000,
    signal,
  });
  return {
    data: {
      status: res.status,
      duration: res.duration,
      contentType: res.headers["content-type"],
      total: res.headers["x-total-count"],
      items: res.data,
    },
  };
};

export default function RequestConfigCard() {
  const { data, loading, error, refetch } = useAxios(loadWithConfig, []);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>2.6 · axios(config)</strong> headers · params · timeout</Card.Header>
      <Card.Body>
        <AsyncContent loading={loading} error={error} data={data} onRetry={refetch}>
          {(info) => (
            <>
              <Table size="sm" bordered className="small">
                <tbody>
                  <tr><th>Status</th><td>{info.status}</td></tr>
                  <tr><th>Thời gian</th><td>{info.duration} ms</td></tr>
                  <tr><th>Content-Type</th><td>{info.contentType}</td></tr>
                  <tr><th>x-total-count</th><td>{info.total}</td></tr>
                </tbody>
              </Table>
              <ListGroup variant="flush">
                {info.items.map((p) => <ListGroup.Item key={p.id}>{p.title}</ListGroup.Item>)}
              </ListGroup>
            </>
          )}
        </AsyncContent>
      </Card.Body>
    </Card>
  );
}
