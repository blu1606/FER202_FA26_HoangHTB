import { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import carApi, { brandApi } from '../api/carApi';
import { getErrorMessage, isCancel } from '../api/axiosClient';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import CarCard from '../components/CarCard';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import { filterCars, SORT_OPTIONS } from '../utils/filterCars';

/**
 * ===================== CarListPage (/cars) – TODO-06 (1.0) · TODO-07 (0.5) =====================
 * ĐÃ CÓ SẴN: tải cars + brands, Loading / ErrorAlert, lưới CarCard, handleAddToCart,
 *            4 state bộ lọc, dòng visible = filterCars(...), ô Sắp xếp, switch "Còn xe", nút "Xóa lọc".
 *
 * TODO-06  Nối 2 ô vào state (controlled component):
 *          - <Form.Control type="search" aria-label="Tìm theo tên" value={keyword} onChange={...setKeyword} />
 *          - <Form.Select aria-label="Hãng xe" value={brandId} onChange={...setBrandId}>
 *              option đầu "Tất cả hãng xe" (value ""), các option sau lấy từ brands (key, value = b.id, chữ = b.name).
 * TODO-07  <p data-testid="result-count">Tìm thấy {visible.length}/{cars.length} mẫu xe</p>;
 *          visible rỗng → <Alert variant="warning">Không có mẫu xe phù hợp</Alert> THAY CHO lưới thẻ.
 * =================================================================================================
 */
export default function CarListPage() {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [keyword, setKeyword] = useState('');
  const [brandId, setBrandId] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [carList, brandList] = await Promise.all([
          carApi.getAll(controller.signal),
          brandApi.getAll(controller.signal),
        ]);
        setCars(carList);
        setBrands(brandList);
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

  const visible = filterCars(cars, { keyword, brandId, inStockOnly, sortBy });

  const resetFilters = () => {
    setKeyword('');
    setBrandId('');
    setInStockOnly(false);
    setSortBy('default');
  };

  const handleAddToCart = (car) => {
    addToCart(car);
    showToast(`Đã thêm "${car.name}" vào giỏ`);
  };

  return (
    <>
      <h3 className="fw-bold mb-3">Danh sách xe</h3>
      <Row className="g-2 mb-3 align-items-center">
        <Col md={4}><Form.Control
          type="search"
          aria-label="Tìm theo tên"
          placeholder="Tìm theo tên xe..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        /></Col>
        <Col md={3}><Form.Select aria-label="Hãng xe" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
          <option value="">Tất cả hãng xe</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </Form.Select></Col>
        <Col md={2}>
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
            id="in-stock"
            label="Còn xe"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
        </Col>
        <Col md="auto">
          <Button variant="outline-secondary" onClick={resetFilters}>
            Xóa lọc
          </Button>
        </Col>
      </Row>

      {loading && <Loading text="Đang tải danh sách xe..." />}
      {error && <ErrorAlert message={error} onRetry={() => setReloadKey((k) => k + 1)} />}
      {!loading && !error && (
        <>
          {/* TODO-07: dòng result-count + Alert "Không có mẫu xe phù hợp" khi visible rỗng (thay cho lưới) */}
          <p data-testid="result-count">Tìm thấy {visible.length}/{cars.length} mẫu xe</p>
          {visible.length === 0 ? (<Alert variant="warning">Không có mẫu xe phù hợp</Alert>) : (
            <Row xs={1} sm={2} lg={4} className="g-3">
              {visible.map((c) => (
                <Col key={c.id}>
                  <CarCard car={c} onAddToCart={handleAddToCart} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </>
  );
}
