import { Alert, Button, ButtonGroup, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatVND } from '../utils/format';

/** Trang giỏ hàng – CÓ SẴN, KHÔNG sửa file này */
export default function CartPage() {
  const { items, totalQuantity, totalPrice, increase, decrease, remove, clear } = useCart();

  if (items.length === 0) {
    return (
      <Alert variant="info">
        Giỏ hàng đang trống. <Link to="/cars">Tiếp tục xem xe</Link>
      </Alert>
    );
  }

  return (
    <>
      <h3 className="fw-bold mb-3">Giỏ hàng</h3>
      <Table bordered hover responsive className="align-middle">
        <thead>
          <tr>
            <th>Mẫu xe</th>
            <th className="text-end">Giá xe</th>
            <th className="text-center">Số lượng</th>
            <th className="text-end">Thành tiền</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td className="text-end">{formatVND(item.price)}</td>
              <td className="text-center">
                <ButtonGroup size="sm">
                  <Button variant="outline-secondary" onClick={() => decrease(item.id)} aria-label={`Giảm ${item.name}`}>
                    −
                  </Button>
                  <Button variant="light" disabled>
                    {item.quantity}
                  </Button>
                  <Button variant="outline-secondary" onClick={() => increase(item.id)} aria-label={`Tăng ${item.name}`}>
                    +
                  </Button>
                </ButtonGroup>
              </td>
              <td className="text-end">{formatVND(item.price * item.quantity)}</td>
              <td className="text-center">
                <Button size="sm" variant="outline-danger" onClick={() => remove(item.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="fw-bold">
            <td colSpan={2}>Tổng cộng</td>
            <td className="text-center">{totalQuantity}</td>
            <td className="text-end text-danger">{formatVND(totalPrice)}</td>
            <td />
          </tr>
        </tfoot>
      </Table>
      <Button variant="outline-danger" onClick={clear}>
        Xóa toàn bộ giỏ
      </Button>
    </>
  );
}
