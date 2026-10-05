import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import InputField from '../components/InputField';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatVND } from '../utils/format';

const SHIPPING_FEE = 30000;
const FREE_SHIP_FROM = 1000000;
const PAYMENT_METHODS = ['COD', 'Chuyển khoản', 'Ví điện tử'];

const validateCheckout = ({ receiver, phone, address, payment }) => {
  const errors = {};
  if (receiver.trim().length < 3) errors.receiver = 'Tên người nhận ít nhất 3 ký tự';
  if (!/^0\d{9}$/.test(phone.replace(/\s/g, ''))) errors.phone = 'Số điện thoại gồm 10 số, bắt đầu bằng 0';
  if (address.trim().length < 10) errors.address = 'Địa chỉ quá ngắn (ít nhất 10 ký tự)';
  if (!payment) errors.payment = 'Chọn phương thức thanh toán';
  return errors;
};

const CheckoutPage = ({ onNavigate }) => {
  const { cart, totalPrice, totalQuantity, clearCart } = useCart();
  const { user } = useAuth();

  const [values, setValues] = useState({
    receiver: user?.name ?? '',
    phone: '',
    address: '',
    payment: '',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState(null);

  const errors = validateCheckout(values);
  const hasErrors = Object.keys(errors).length > 0;
  const shipping = totalPrice >= FREE_SHIP_FROM ? 0 : SHIPPING_FEE;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (hasErrors) return;

    setOrder({
      code: `DH${Date.now().toString().slice(-6)}`,
      receiver: values.receiver.trim(),
      total: totalPrice + shipping,
    });
    clearCart();
  };

  if (order) {
    return (
      <Alert variant="success" className="shadow-sm border-0">
        <Alert.Heading className="fw-bold">Đặt hàng thành công! 🎉</Alert.Heading>
        <p className="mb-2 fs-5">
          {`Mã đơn: ${order.code} · Người nhận: ${order.receiver} · Tổng thanh toán: ${formatVND(order.total)}`}
        </p>
        <p className="text-secondary small mb-3">
          Cảm ơn bạn đã mua sắm tại FPT Shop Mini! Đơn hàng của bạn đang được xử lý.
        </p>
        <Button variant="outline-success" onClick={() => onNavigate('shop')}>
          Tiếp tục mua sắm
        </Button>
      </Alert>
    );
  }

  if (totalQuantity === 0) {
    return (
      <Alert variant="info" className="shadow-sm border-0">
        Giỏ hàng hiện đang trống.{' '}
        <Alert.Link href="#" onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}>
          Quay lại cửa hàng để chọn sản phẩm
        </Alert.Link>
      </Alert>
    );
  }

  const errorOf = (name) => (submitted ? errors[name] : undefined);

  return (
    <Row className="g-4">
      <Col md={7}>
        <Card className="shadow-sm border-0">
          <Card.Header className="bg-white py-3">
            <h5 className="mb-0 fw-bold text-primary">Thông tin giao hàng</h5>
          </Card.Header>
          <Card.Body>
            <Form noValidate onSubmit={handleSubmit}>
              <InputField
                id="receiver"
                name="receiver"
                label="Người nhận"
                placeholder="Nhập tên người nhận"
                required
                value={values.receiver}
                onChange={handleChange}
                error={errorOf('receiver')}
              />
              <InputField
                id="phone"
                name="phone"
                label="Số điện thoại"
                type="tel"
                placeholder="09xx xxx xxx"
                required
                value={values.phone}
                onChange={handleChange}
                error={errorOf('phone')}
              />
              <InputField
                id="address"
                name="address"
                label="Địa chỉ giao hàng"
                as="textarea"
                rows={2}
                placeholder="Số nhà, đường, phường/xã, quận/huyện..."
                required
                value={values.address}
                onChange={handleChange}
                error={errorOf('address')}
              />

              <Form.Group className="mb-3">
                <Form.Label className="d-block fw-semibold">
                  Phương thức thanh toán <span className="text-danger">*</span>
                </Form.Label>
                {PAYMENT_METHODS.map((method, index) => (
                  <Form.Check
                    inline
                    key={method}
                    type="radio"
                    id={`payment-${index}`}
                    name="payment"
                    value={method}
                    label={method}
                    checked={values.payment === method}
                    onChange={handleChange}
                    isInvalid={Boolean(errorOf('payment'))}
                  />
                ))}
                {errorOf('payment') && <div className="text-danger small mt-1">{errorOf('payment')}</div>}
              </Form.Group>

              <InputField
                id="note"
                name="note"
                label="Ghi chú đơn hàng"
                placeholder="Ghi chú giao hàng nếu có (không bắt buộc)"
                value={values.note}
                onChange={handleChange}
              />

              <Button type="submit" variant="success" size="lg" className="w-100 mt-2">
                Xác nhận đặt hàng
              </Button>
              {submitted && hasErrors && (
                <Form.Text className="text-danger d-block mt-2 text-center fw-semibold">
                  {`Vui lòng sửa ${Object.keys(errors).length} lỗi trước khi đặt hàng`}
                </Form.Text>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col md={5}>
        <Card className="shadow-sm border-0 sticky-top" style={{ top: '1rem' }}>
          <Card.Header className="bg-white py-3">
            <h5 className="mb-0 fw-bold text-primary">{`Tóm tắt đơn hàng (${totalQuantity} món)`}</h5>
          </Card.Header>
          <ListGroup variant="flush">
            {cart.items.map(({ id, name, price, quantity }) => (
              <ListGroup.Item key={id} className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-semibold d-block">{name}</span>
                  <small className="text-muted">{`Số lượng: ${quantity}`}</small>
                </div>
                <span className="fw-semibold">{formatVND(price * quantity)}</span>
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="d-flex justify-content-between text-muted">
              <span>Tạm tính tiền hàng</span>
              <span>{formatVND(totalPrice)}</span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between text-muted">
              <span>Phí vận chuyển</span>
              <span className={shipping === 0 ? 'text-success fw-bold' : ''}>
                {shipping === 0 ? 'Miễn phí' : formatVND(shipping)}
              </span>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between fw-bold fs-5 bg-light">
              <span>Tổng thanh toán</span>
              <span className="text-primary">{formatVND(totalPrice + shipping)}</span>
            </ListGroup.Item>
          </ListGroup>
          {totalPrice < FREE_SHIP_FROM && (
            <Card.Footer className="bg-white text-muted small">
              💡 Mua thêm {formatVND(FREE_SHIP_FROM - totalPrice)} để được miễn phí vận chuyển!
            </Card.Footer>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default CheckoutPage;
