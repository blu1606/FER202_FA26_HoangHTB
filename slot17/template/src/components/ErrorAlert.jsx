import { Alert, Button } from 'react-bootstrap';

/** CÓ SẴN. <ErrorAlert message={error} onRetry={...} /> – onRetry không bắt buộc */
export default function ErrorAlert({ message, onRetry }) {
  return (
    <Alert variant="danger">
      <div>{message}</div>
      {onRetry && (
        <Button size="sm" variant="outline-danger" className="mt-2" onClick={onRetry}>
          Thử lại
        </Button>
      )}
    </Alert>
  );
}
