// NC1 (async/await) · NC4 (chọn id + AbortController) · NC5 (react-bootstrap) – nâng cấp AxiosDemo của Phần 1
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Spinner, Alert, Form, Row, Col, Badge, Button } from "react-bootstrap";
import postApi from "../api/postApi";

export default function AxiosDemo() {
  const [postId, setPostId] = useState(1);
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null); // { status, duration, contentType }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // async/await + try/catch/finally + AbortController, deps [postId]
  useEffect(() => {
    const controller = new AbortController();

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await postApi.getById(postId, controller.signal);
        setData(res.data);
        setMeta({ status: res.status, duration: res.duration, contentType: res.headers["content-type"] });
      } catch (err) {
        if (axios.isCancel(err)) return;
        setData(null);
        setError(err.userMessage ?? err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchPost();
    return () => controller.abort();
  }, [postId]);

  return (
    <>
      <h1 className="mb-3">
        Axios Demo <Badge bg="primary">react-bootstrap</Badge>
      </h1>

      <Row className="mb-3 g-2 align-items-end">
        <Col xs="auto">
          <Form.Label htmlFor="postId">Post ID (1–100, thử 999 để xem lỗi 404)</Form.Label>
          <Form.Control
            id="postId"
            type="number"
            min={1}
            value={postId}
            onChange={(e) => setPostId(Number(e.target.value) || 1)}
            style={{ width: 160 }}
          />
        </Col>
        <Col xs="auto">
          <Button variant="outline-secondary" onClick={() => setPostId((id) => Math.max(1, id - 1))}>
            ‹ Trước
          </Button>{" "}
          <Button variant="outline-secondary" onClick={() => setPostId((id) => id + 1)}>
            Sau ›
          </Button>
        </Col>
      </Row>

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-2">Loading...</p>
        </div>
      )}

      {!loading && error && <Alert variant="danger">❌ Error: {error}</Alert>}

      {!loading && data && (
        <Card className="shadow-sm">
          <Card.Header>
            Post #{data.id} · userId {data.userId}
          </Card.Header>
          <Card.Body>
            <Card.Title as="h2" className="fs-4 text-capitalize">
              {data.title}
            </Card.Title>
            <Card.Text style={{ whiteSpace: "pre-line" }}>{data.body}</Card.Text>
          </Card.Body>
          {meta && (
            <Card.Footer className="small text-muted">
              Status <Badge bg="success">{meta.status}</Badge> · {meta.duration} ms · {meta.contentType}
            </Card.Footer>
          )}
        </Card>
      )}
    </>
  );
}
