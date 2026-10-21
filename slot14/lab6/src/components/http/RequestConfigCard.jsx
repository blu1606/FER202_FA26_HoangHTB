// 2.6 – axios(config): headers, params, timeout · NC5: Table + ListGroup
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, ListGroup, Table } from "react-bootstrap";
import axiosClient from "../../api/axiosClient";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorAlert from "../common/ErrorAlert";

export default function RequestConfigCard() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await axiosClient({
          method: "get",
          url: "/posts",
          params: { _page: 1, _limit: 3 },
          headers: { Accept: "application/json", "X-Client": "FER202" },
          timeout: 5000,
          signal: controller.signal,
        });
        setInfo({
          status: res.status,
          duration: res.duration,
          contentType: res.headers["content-type"],
          total: res.headers["x-total-count"],
          items: res.data,
        });
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(err.userMessage);
      }
    };
    load();
    return () => controller.abort();
  }, []);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>2.6 · axios(config)</strong> headers · params · timeout</Card.Header>
      <Card.Body>
        {error && <ErrorAlert message={error} />}
        {!error && !info && <LoadingSpinner />}
        {info && (
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
      </Card.Body>
    </Card>
  );
}
