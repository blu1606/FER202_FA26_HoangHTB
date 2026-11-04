import { Spinner } from 'react-bootstrap';

/** CÓ SẴN. <Loading text="Đang tải sản phẩm..." /> */
export default function Loading({ text = 'Đang tải...' }) {
  return (
    <div className="text-center py-5 text-secondary" role="status">
      <Spinner animation="border" variant="primary" />
      <div className="mt-2">{text}</div>
    </div>
  );
}
