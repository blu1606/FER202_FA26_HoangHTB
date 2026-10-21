import { Badge } from "react-bootstrap";

export default function ResultBox({ result }) {
  if (!result) return null;
  return (
    <div className="mt-3">
      <div className="small mb-1">
        Status <Badge bg={result.status < 300 ? "success" : "danger"}>{result.status}</Badge>
        {result.duration != null && <span className="text-muted"> · {result.duration} ms</span>}
      </div>
      <pre className="bg-light p-2 small mb-0" style={{ maxHeight: 220, overflow: "auto" }}>
        {JSON.stringify(result.data, null, 2)}
      </pre>
    </div>
  );
}
