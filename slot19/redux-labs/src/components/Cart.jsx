import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, ButtonGroup, Alert } from 'react-bootstrap';
import {
  selectCartItems,
  selectCartTotal,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from '../features/cart/cartSlice';

const vnd = (n) => n.toLocaleString('vi-VN') + ' ₫';

export default function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <Alert variant="secondary" className="text-center py-4">
        🛒 Giỏ hàng của bạn đang trống.
      </Alert>
    );
  }

  return (
    <div className="bg-white p-3 rounded shadow-sm border">
      <Table size="sm" bordered hover responsive className="align-middle mb-3">
        <thead className="table-light">
          <tr>
            <th>Sản phẩm</th>
            <th className="text-center" style={{ width: 120 }}>
              SL
            </th>
            <th className="text-end">Thành tiền</th>
            <th style={{ width: 40 }}></th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>
                <div className="fw-semibold">{i.name}</div>
                <small className="text-muted">{vnd(i.price)}</small>
              </td>
              <td className="text-center">
                <ButtonGroup size="sm">
                  <Button
                    variant="outline-secondary"
                    onClick={() => dispatch(decreaseQty(i.id))}
                  >
                    -
                  </Button>
                  <Button variant="light" disabled className="px-2 fw-bold">
                    {i.quantity}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    disabled={i.quantity >= i.stock}
                    onClick={() => dispatch(increaseQty(i.id))}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </td>
              <td className="text-end fw-semibold text-danger">
                {vnd(i.price * i.quantity)}
              </td>
              <td className="text-center">
                <Button
                  size="sm"
                  variant="link"
                  className="text-danger p-0 text-decoration-none fw-bold"
                  title="Xóa khỏi giỏ"
                  onClick={() => dispatch(removeFromCart(i.id))}
                >
                  ✕
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="table-light">
            <th colSpan={2}>Tổng cộng:</th>
            <th className="text-end text-danger fs-5">{vnd(total)}</th>
            <th></th>
          </tr>
        </tfoot>
      </Table>
      <div className="d-flex justify-content-between">
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => dispatch(clearCart())}
        >
          Xóa giỏ hàng
        </Button>
        <Button
          variant="success"
          size="sm"
          onClick={() => {
            alert('Đặt hàng thành công! Cảm ơn bạn.');
            dispatch(clearCart());
          }}
        >
          Thanh toán ngay
        </Button>
      </div>
    </div>
  );
}
