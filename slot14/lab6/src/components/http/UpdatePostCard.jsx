// 2.3 – GET + PUT  ·  NC1 · NC8 (useAxios cho phần GET)
import { useState, useEffect } from "react";
import { Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import AsyncContent from "../common/AsyncContent";
import postApi from "../../api/postApi";
import ResultBox from "./ResultBox";

const POST_ID = 1;

export default function UpdatePostCard() {
  const { data, loading, error, refetch } = useAxios((signal) => postApi.getById(POST_ID, signal), []);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]); // đổ dữ liệu cũ vào form

  const handleUpdate = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      // PUT gửi ĐẦY ĐỦ các trường
      const res = await postApi.update(POST_ID, {
        id: form.id,
        userId: form.userId,
        title: form.title,
        body: form.body,
      });
      setResult({ status: res.status, duration: res.duration, data: res.data });
    } catch (err) {
      setSaveError(err.userMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header><strong>2.3 · PUT</strong> /posts/{POST_ID}</Card.Header>
      <Card.Body>
        <AsyncContent loading={loading || (!!data && !form)} error={error} data={data} onRetry={refetch}>
          {() =>
            form && (
              <>
                <Form.Control
                  className="mb-2"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="mb-2"
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                />
                <Button variant="primary" onClick={handleUpdate} disabled={saving}>
                  {saving ? <Spinner size="sm" /> : "Cập nhật (PUT)"}
                </Button>
              </>
            )
          }
        </AsyncContent>
        {saveError && <Alert variant="danger" className="mt-3 mb-0">{saveError}</Alert>}
        <ResultBox result={result} />
      </Card.Body>
    </Card>
  );
}
