// 2.4 – PATCH · NC1
import { useState } from "react";
import { Card, Form, Button, InputGroup, Spinner, Alert } from "react-bootstrap";
import postApi from "../../api/postApi";
import ResultBox from "./ResultBox";

export default function PatchPostCard() {
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePatch = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await postApi.patch(1, { title: title.trim() }); // chỉ gửi trường thay đổi
      setResult({ status: res.status, duration: res.duration, data: res.data });
    } catch (err) {
      setError(err.userMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>2.4 · PATCH</strong> /posts/1</Card.Header>
      <Card.Body>
        <InputGroup>
          <Form.Control placeholder="Tiêu đề mới" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button variant="warning" onClick={handlePatch} disabled={!title.trim() || saving}>
            {saving ? <Spinner size="sm" /> : "PATCH"}
          </Button>
        </InputGroup>
        {error && <Alert variant="danger" className="mt-3 mb-0">{error}</Alert>}
        <ResultBox result={result} />
      </Card.Body>
    </Card>
  );
}
