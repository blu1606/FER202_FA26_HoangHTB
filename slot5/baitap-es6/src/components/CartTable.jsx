import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import { formatVND } from '../utils/format';

const CartTable = ({ items = [] }) => {
  const sortedItems = [...items].sort(
    (a, b) => b.price * b.quantity - a.price * a.quantity
  );

  const totalPrice = sortedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = sortedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const maxPrice = sortedItems.length > 0
    ? Math.max(...sortedItems.map((item) => item.price))
    : 0;

  const saleAndInStockItems = sortedItems.filter(
    (item) => item.discount > 0 && item.inStock
  );

  return (
    <div>
      <Table striped bordered hover responsive className="align-middle">
        <thead className="table-dark">
          <tr>
            <th className="text-center" style={{ width: '60px' }}>STT</th>
            <th>Tên sản phẩm</th>
            <th className="text-end">Đơn giá</th>
            <th className="text-center" style={{ width: '100px' }}>Số lượng</th>
            <th className="text-center" style={{ width: '120px' }}>Trạng thái</th>
            <th className="text-end">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, index) => {
            const lineTotal = item.price * item.quantity;
            return (
              <tr key={item.id}>
                <td className="text-center fw-bold">{index + 1}</td>
                <td>
                  <span className="fw-semibold">{item.name}</span>
                  {item.discount > 0 && (
                    <Badge bg="danger" className="ms-2">
                      -{item.discount}%
                    </Badge>
                  )}
                </td>
                <td className="text-end">{formatVND(item.price)}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center">
                  <Badge bg={item.inStock ? 'success' : 'secondary'}>
                    {item.inStock ? 'Còn hàng' : 'Hết hàng'}
                  </Badge>
                </td>
                <td className="text-end fw-bold text-primary">
                  {formatVND(lineTotal)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="table-light">
          <tr>
            <td colSpan={3} className="fw-bold">
              Tổng cộng
            </td>
            <td className="text-center fw-bold">{totalQuantity}</td>
            <td className="text-center">
              <small className="text-muted">
                Đơn giá cao nhất: <br />
                <span className="fw-semibold text-danger">{formatVND(maxPrice)}</span>
              </small>
            </td>
            <td className="text-end fw-bold text-success fs-6">
              {formatVND(totalPrice)}
            </td>
          </tr>
        </tfoot>
      </Table>

      <Card className="mt-3 bg-light border-0 shadow-sm">
        <Card.Body>
          <Card.Title className="h6 text-success mb-2">
            🏷️ Sản phẩm đang giảm giá & còn hàng ({saleAndInStockItems.length})
          </Card.Title>
          <ul className="mb-0 ps-3">
            {saleAndInStockItems.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - Giảm {item.discount}% - Đơn giá: {formatVND(item.price)}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartTable;
