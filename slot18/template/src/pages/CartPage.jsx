import { useState } from 'react';
import { Alert, Button, ButtonGroup, Spinner, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import orderApi from '../api/orderApi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatVND } from '../utils/format';

/** Trang giỏ món – CÓ SẴN, KHÔNG sửa file này. Nút "Đặt món" tạo đơn (orderApi.create) từ giỏ. */
export default function CartPage() {
  const { user } = useAuth();
  const { items, totalQuantity, totalPrice, increase, decrease, remove, clear } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0) {
    return (
      <Alert variant="info">
        Giỏ món đang trống. <Link to="/dishes">Xem thực đơn</Link>
      </Alert>
    );
  }

  const placeOrder = async () => {
    setSubmitting(true);
    setError('');
    try {
      const order = await orderApi.create({
        userId: user.id,
        receiver: user.fullName,
        items: items.map((i) => ({ dishId: i.id, quantity: i.quantity, price: i.price })),
        total: totalPrice,
      });
      clear();
      showToast(`Đặt món thành công! Mã đơn #${order.id}`);
      navigate('/dishes');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h3 className="fw-bold mb-3">Giỏ món</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table bordered hover responsive className="align-middle">
        <thead>
          <tr>
            <th>Món</th>
            <th className="text-end">Đơn giá</th>
            <th className="text-center">Số phần</th>
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
      <div className="d-flex gap-2">
        <Button variant="outline-danger" onClick={clear}>
          Xóa toàn bộ giỏ
        </Button>
        <Button variant="success" className="ms-auto" disabled={submitting} onClick={placeOrder}>
          {submitting && <Spinner size="sm" className="me-2" />}
          Đặt món
        </Button>
      </div>
    </>
  );
}
