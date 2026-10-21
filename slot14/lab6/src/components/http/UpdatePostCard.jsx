// 2.3 – GET + PUT · NC5: Form.Control, Spinner trong nút
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import postApi from "../../api/postApi";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorAlert from "../common/ErrorAlert";
import ResultBox from "./ResultBox";

const POST_ID = 1;

export default function UpdatePostCard() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [saveError, setSaveError] = useState(null);

  // GET dữ liệu cũ đổ vào form
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await postApi.getById(POST_ID, controller.signal);
        setForm(res.data);
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
        {loading && <LoadingSpinner />}
        {!loading && error && <ErrorAlert message={error} />}
        {!loading && form && (
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
              {saving ? <><Spinner size="sm" /> Đang lưu...</> : "Cập nhật (PUT)"}
            </Button>
          </>
        )}
        {saveError && <Alert variant="danger" className="mt-3 mb-0">{saveError}</Alert>}
        <ResultBox result={result} />
      </Card.Body>
    </Card>
  );
}
