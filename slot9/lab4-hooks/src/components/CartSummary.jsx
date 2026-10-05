import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import { formatVND } from '../utils/format';
import { CART_ACTIONS, MAX_QUANTITY, getCartTotals } from '../reducers/cartReducer';

const CartSummary = ({ cart, dispatch }) => {
  const { items } = cart;
  const { totalQuantity, totalPrice } = getCartTotals(cart);

  if (items.length === 0) return <Alert variant="info">Giỏ hàng đang trống</Alert>;

  return (
    <>
      <Table bordered hover size="sm" responsive className="align-middle">
        <thead>
          <tr className="table-light">
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th className="text-center">Số lượng</th>
            <th>Thành tiền</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, name, price, quantity }) => (
            <tr key={id}>
              <td className="fw-semibold">{name}</td>
              <td>{formatVND(price)}</td>
              <td className="text-center">
                <ButtonGroup size="sm">
                  <Button
                    variant="outline-secondary"
                    onClick={() => dispatch({ type: CART_ACTIONS.DECREASE, payload: id })}
                  >
                    −
                  </Button>
                  <Button variant="light" disabled style={{ minWidth: 36 }}>
                    {quantity}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    disabled={quantity >= MAX_QUANTITY}
                    onClick={() => dispatch({ type: CART_ACTIONS.INCREASE, payload: id })}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </td>
              <td>{formatVND(price * quantity)}</td>
              <td className="text-center">
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => dispatch({ type: CART_ACTIONS.REMOVE, payload: id })}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="fw-bold table-light">
            <td colSpan={2}>Tổng cộng</td>
            <td className="text-center">{totalQuantity}</td>
            <td colSpan={2}>{formatVND(totalPrice)}</td>
          </tr>
        </tfoot>
      </Table>
      <Button variant="outline-danger" size="sm" onClick={() => dispatch({ type: CART_ACTIONS.CLEAR })}>
        Xóa toàn bộ giỏ
      </Button>
    </>
  );
};

export default CartSummary;
