import { useEffect, useState } from 'react';
import { Alert, Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap';
import dishApi, { categoryApi } from '../api/dishApi';
import { getErrorMessage, isCancel } from '../api/axiosClient';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import DishCard from '../components/DishCard';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import { filterDishes, SORT_OPTIONS } from '../utils/filterDishes';

/**
 * ===================== DishListPage (/dishes) – TODO-06 (1.0) · TODO-07 (0.5) =====================
 * ĐÃ CÓ SẴN: tải dishes + categories, Loading / ErrorAlert, lưới DishCard, handleAddToCart,
 *            4 state bộ lọc, dòng visible = filterDishes(...), ô Sắp xếp, switch "Chỉ món đang phục vụ", nút "Xóa lọc".
 *
 * TODO-06  1. Ô tìm (controlled): <Form.Control type="search" aria-label="Tìm món" placeholder="Nhập tên món..."
 *                                  value={keyword} onChange={...setKeyword} />
 *          2. Nhóm nút danh mục: <ButtonGroup aria-label="Danh mục" className="mb-3 flex-wrap"> gồm nút "Tất cả"
 *             và 1 nút cho mỗi category (key = c.id). Nút đang chọn: variant="success", aria-pressed={true};
 *             nút khác: variant="outline-success", aria-pressed={false}. Bấm nút → setCategoryId('') hoặc setCategoryId(String(c.id)).
 * TODO-07  <p data-testid="result-count">Tìm được {visible.length}/{dishes.length} món</p>;
 *          visible rỗng → <Alert variant="secondary">Chưa có món phù hợp</Alert> THAY CHO lưới thẻ.
 * ===================================================================================================
 */
export default function DishListPage() {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [dishList, categoryList] = await Promise.all([
          dishApi.getAll(controller.signal),
          categoryApi.getAll(controller.signal),
        ]);
        setDishes(dishList);
        setCategories(categoryList);
      } catch (err) {
        if (isCancel(err)) return;
        setError(getErrorMessage(err));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [reloadKey]);

  const visible = filterDishes(dishes, { keyword, categoryId, availableOnly, sortBy });

  const resetFilters = () => {
    setKeyword('');
    setCategoryId('');
    setAvailableOnly(false);
    setSortBy('default');
  };

  const handleAddToCart = (dish) => {
    addToCart(dish);
    showToast(`Đã thêm 1 phần ${dish.name}`);
  };

  return (
    <>
      <h3 className="fw-bold mb-3">Thực đơn</h3>
      <Row className="g-2 mb-2 align-items-center">
        <Col md={5}>
          {/* TODO-06: ô tìm món */}
          <Form.Control
            type="search"
            aria-label="Tìm món"
            placeholder="Nhập tên món..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select aria-label="Sắp xếp" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {Object.entries(SORT_OPTIONS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md="auto">
          <Form.Check
            type="switch"
            id="available-only"
            label="Chỉ món đang phục vụ"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
          />
        </Col>
        <Col md="auto">
          <Button variant="outline-secondary" onClick={resetFilters}>
            Xóa lọc
          </Button>
        </Col>
      </Row>

      {/* TODO-06: nhóm nút danh mục (ButtonGroup aria-label="Danh mục") */}
      <ButtonGroup aria-label="Danh mục" className="mb-3 flex-wrap">
        <Button
          variant={categoryId === '' ? 'success' : 'outline-success'}
          aria-pressed={categoryId === ''}
          onClick={() => setCategoryId('')}
        >
          Tất cả
        </Button>
        {categories.map((c) => (
          <Button
            key={c.id}
            variant={categoryId === String(c.id) ? 'success' : 'outline-success'}
            aria-pressed={categoryId === String(c.id)}
            onClick={() => setCategoryId(String(c.id))}
          >
            {c.name}
          </Button>
        ))}
      </ButtonGroup>

      {loading && <Loading text="Đang tải thực đơn..." />}
      {error && <ErrorAlert message={error} onRetry={() => setReloadKey((k) => k + 1)} />}
      {!loading && !error && (
        <>
          {/* TODO-07: dòng result-count + Alert "Chưa có món phù hợp" khi visible rỗng (thay cho lưới) */}
          <p data-testid="result-count">Tìm được {visible.length}/{dishes.length} món</p>
          {visible.length > 0 ? (
            <Row xs={1} sm={2} lg={4} className="g-3">
              {visible.map((d) => (
                <Col key={d.id}>
                  <DishCard dish={d} onAddToCart={handleAddToCart} />
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="secondary">Chưa có món phù hợp</Alert>
          )}
        </>
      )}
    </>
  );
}
