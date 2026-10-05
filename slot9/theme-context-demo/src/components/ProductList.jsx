import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { products } from '../data/products';
import { useCartDispatch } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

export default function ProductList() {
  // Toi uu re-render: Chi su dung dispatch nen component khong bi re-render khi items thay doi
  const dispatch = useCartDispatch();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold mb-0">Danh sách sản phẩm nổi bật</h6>
        <small className={isDark ? 'text-secondary' : 'text-muted'}>
          (Component này dùng <code>useCartDispatch</code> → Không re-render khi giỏ đổi)
        </small>
      </div>

      <div className="row g-3">
        {products.map((p) => (
          <div key={p.id} className="col-12 col-md-6">
            <Card className={`h-100 shadow-sm border ${isDark ? 'bg-dark text-white border-secondary' : 'bg-white'}`}>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <span className="fs-3">{p.icon}</span>
                    <Badge bg="info" className="text-dark">
                      {p.category}
                    </Badge>
                  </div>
                  <h6 className="fw-bold mb-1">{p.name}</h6>
                  <p className="fw-bold text-primary mb-3">
                    {p.price.toLocaleString('vi-VN')} ₫
                  </p>
                </div>
                <Button
                  variant={isDark ? 'outline-primary' : 'primary'}
                  size="sm"
                  className="w-100 fw-medium"
                  onClick={() => dispatch({ type: 'ADD', payload: p })}
                >
                  + Thêm vào giỏ
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
