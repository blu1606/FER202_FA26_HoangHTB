import { Spinner } from "react-bootstrap";

export default function LoadingSpinner({ text = "Đang tải dữ liệu..." }) {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2 text-muted">{text}</p>
    </div>
  );
}
