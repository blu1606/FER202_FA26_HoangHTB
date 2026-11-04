import { useEffect, useState } from 'react';
import { Badge, Button, Col, Image, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import dishApi from '../api/dishApi';
import { getErrorMessage, isCancel } from '../api/axiosClient';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import QuantityPicker from '../components/QuantityPicker';
import NotFoundPage from './NotFoundPage';
import { formatVND, getFinalPrice } from '../utils/format';

/**
 * ===================== DishDetailPage (/dishes/:id) – TODO-08 (1.0) · TODO-09 (1.0) =====================
 * ĐÃ CÓ SẴN: kiểm tra id không phải số, useEffect tải món, document.title, state dish/loading/error/quantity,
 *            ảnh + tên <h2>, dòng "Đã bán … · ★ …", giá gốc trong <del>, QuantityPicker, biến unitPrice, khung hàm handleAdd.
 * Kiểm tra: /dishes/4, /dishes/5, /dishes/9999.
 *
 * TODO-08  loading → return <Loading text="Đang tải món ăn..." />;
 *          error → return <ErrorAlert message={error} /> + <Link to="/dishes">← Về thực đơn</Link>;
 *          có dữ liệu: {dish.category && <Badge bg="success">{dish.category.name}</Badge>},
 *          <p className="mt-2 mb-0">Thời gian chuẩn bị: {dish.prepTime} phút</p>,
 *          giá <span className="text-danger fw-bold fs-2">{formatVND(unitPrice)}</span>, mô tả <p>{dish.description}</p>.
 * TODO-09  Trạng thái: dish.available → <Badge bg="success">Đang phục vụ</Badge>, ngược lại <Badge bg="secondary">Tạm hết</Badge>;
 *          tạm tính: <span data-testid="subtotal">Tạm tính: {formatVND(unitPrice * quantity)}</span>;
 *          nút "Thêm vào giỏ" (variant="success", disabled={!dish.available}, onClick={handleAdd}) – GIỮ NGUYÊN chữ;
 *          thân handleAdd: addToCart(dish, quantity) + showToast(`Đã thêm ${quantity} phần ${dish.name}`);
 *          nút "← Quay lại" gọi navigate(-1).
 * ========================================================================================================
 */
export default function DishDetailPage() {
  const { id } = useParams();
  if (!/^\d+$/.test(id)) return <NotFoundPage />;
  return <DishDetail key={id} id={id} />;
}

function DishDetail({ id }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        setDish(await dishApi.getById(id, controller.signal));
      } catch (err) {
        if (isCancel(err)) return;
        setError(getErrorMessage(err));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (dish) document.title = `${dish.name} | FPT Food Mini`;
  }, [dish]);

  // TODO-08: loading → <Loading text="Đang tải món ăn..." />; error → <ErrorAlert> + Link "← Về thực đơn"
  if (loading) return <Loading text="Đang tải món ăn..." />;
  if (error)
    return (
      <>
        <ErrorAlert message={error} />
        <Link to="/dishes">← Về thực đơn</Link>
      </>
    );
  if (!dish) return null; // (giữ dòng này để trang không lỗi khi chưa có dữ liệu – đặt TODO-08 PHÍA TRÊN dòng này)

  const unitPrice = getFinalPrice(dish);

  const handleAdd = () => {
    addToCart(dish, quantity);
    showToast(`Đã thêm ${quantity} phần ${dish.name}`);
  };

  return (
    <Row className="g-4">
      <Col md={5}>
        <Image src={dish.image} alt={dish.name} fluid rounded className="border" />
      </Col>
      <Col md={7}>
        <h2 className="fw-bold">{dish.name}</h2>
        <p className="small text-secondary mb-2">Đã bán: {dish.sold} phần · ★ {dish.rating}</p>

        {/* TODO-08: Badge danh mục + "Thời gian chuẩn bị: … phút" */}
        {dish.category && <Badge bg="success">{dish.category.name}</Badge>}
        <p className="mt-2 mb-0">Thời gian chuẩn bị: {dish.prepTime} phút</p>
        <div className="my-3">
          {/* TODO-08: giá sau giảm (text-danger fw-bold fs-2) */}
          {dish.discount > 0 && <span className="text-danger fw-bold fs-2">{formatVND(unitPrice)}</span>}
        </div>

        {/* TODO-08: mô tả <p>{dish.description}</p> */}
        <p>{dish.description}</p>
        <p>
          Trạng thái:{' '}
          {/* TODO-09: Badge "Đang phục vụ" / "Tạm hết" */}
          {dish.available ? <Badge bg="success">Đang phục vụ</Badge> : <Badge bg="secondary">Tạm hết</Badge>}
        </p>

        <div className="d-flex flex-wrap gap-2 align-items-center">
          <QuantityPicker min={1} max={10} onChange={setQuantity} />
          {/* TODO-09: "Tạm tính: …" (data-testid="subtotal") */}
          <span data-testid="subtotal">Tạm tính: {formatVND(unitPrice * quantity)}</span>
        </div>
        <div className="d-flex flex-wrap gap-2 mt-3">
          {/* TODO-09: nút "Thêm vào giỏ" và nút "← Quay lại" */}
          <Button variant="success" disabled={!dish.available} onClick={handleAdd}>Thêm vào giỏ</Button>
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>← Quay lại</Button>
        </div>
      </Col>
    </Row>
  );
}
