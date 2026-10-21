import { Link, useLocation } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <Alert variant="warning" className="text-center py-5">
      <h1>404</h1>
      <p>Không có trang <code>{pathname}</code></p>
      <Button as={Link} to="/">Về trang chủ</Button>
    </Alert>
  );
}
