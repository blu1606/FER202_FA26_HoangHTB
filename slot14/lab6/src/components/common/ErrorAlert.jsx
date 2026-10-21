import { Alert, Button } from "react-bootstrap";

export default function ErrorAlert({ message, onRetry }) {
  return (
    <Alert variant="danger" className="d-flex justify-content-between align-items-center">
      <span>❌ {message}</span>
      {onRetry && (
        <Button variant="outline-danger" size="sm" onClick={onRetry}>
          Thử lại
        </Button>
      )}
    </Alert>
  );
}
