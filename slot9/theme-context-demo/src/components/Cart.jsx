import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import { useCart, useCartDispatch } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Cart() {
  const { items } = useCart();
  const dispatch = useCartDispatch();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (items.length === 0) {
    return (
      <Alert variant={isDark ? 'dark' : 'secondary'} className="text-center py-4 mb-0 border">
        <div className="fs-3 mb-2">🛒</div>
        <p className="mb-0 fw-medium">Giỏ hàng của bạn đang trống.</p>
        <small className={isDark ? 'text-secondary' : 'text-muted'}>
          Hãy bấm "Thêm vào giỏ" ở danh sách sản phẩm để trải nghiệm!
        </small>
      </Alert>
    );
  }

  return (
    <div>
      <div className="table-responsive">
        <Table
          hover
          className={`align-middle mb-3 ${isDark ? 'table-dark' : ''}`}
        >
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th className="text-end">Đơn giá</th>
              <th className="text-center" style={{ width: '130px' }}>Số lượng</th>
              <th className="text-end">Thành tiền</th>
              <th className="text-center" style={{ width: '60px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td>
                  <span className="me-2">{i.icon || '📦'}</span>
                  <span className="fw-medium">{i.name}</span>
                </td>
                <td className="text-end">{i.price.toLocaleString('vi-VN')} ₫</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gap-1">
                    <Button
                      size="sm"
                      variant={isDark ? 'outline-light' : 'outline-secondary'}
                      className="px-2 py-0 fw-bold"
                      onClick={() => dispatch({ type: 'DECREASE', payload: i.id })}
                    >
                      -
                    </Button>
                    <Badge bg={isDark ? 'secondary' : 'light'} text={isDark ? 'light' : 'dark'} className="px-2 py-1 fs-6">
                      {i.qty}
                    </Badge>
                    <Button
                      size="sm"
                      variant={isDark ? 'outline-light' : 'outline-secondary'}
                      className="px-2 py-0 fw-bold"
                      onClick={() => dispatch({ type: 'ADD', payload: i })}
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td className="text-end fw-semibold text-primary">
                  {(i.price * i.qty).toLocaleString('vi-VN')} ₫
                </td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant="outline-danger"
                    className="px-2 py-0"
                    title="Xóa sản phẩm"
                    onClick={() => dispatch({ type: 'REMOVE', payload: i.id })}
                  >
                    ×
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 pt-2 border-top border-secondary-subtle">
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => dispatch({ type: 'CLEAR' })}
        >
          🗑️ Xóa toàn bộ giỏ
        </Button>
        <div className="d-flex align-items-center gap-3">
          <span className="fs-6">Tổng thanh toán:</span>
          <span className="fs-5 fw-bold text-success">
            {total.toLocaleString('vi-VN')} ₫
          </span>
        </div>
      </div>
    </div>
  );
}
