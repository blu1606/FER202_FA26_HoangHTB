import { useState } from 'react';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import reservationApi from '../api/reservationApi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { EMPTY_RESERVATION, TIME_SLOTS, todayISO, validateReservation } from '../utils/validation';

/**
 * ===================== ReservationPage (/reservation) – TODO-12 (1.0) =====================
 * Không bắt buộc đăng nhập (khách vãng lai vẫn đặt được, khi đó userId = null).
 * ĐÃ CÓ SẴN: state, errors = validateReservation(values), errorCount, handleChange, handleBlur, showError,
 *            initialValues(), ô "Tên người đặt" (MẪU), ô SĐT, ô Giờ (select), ô Ghi chú,
 *            Alert kết quả (lastBooking), Alert serverError, dòng "Còn x mục chưa hợp lệ", nút "Xác nhận đặt bàn".
 *
 * TODO-12  1. Làm TƯƠNG TỰ ô Tên người đặt cho 2 ô:
 *             Ngày *     (controlId "reservation-date",   name "date",   type "date",   min={todayISO()})
 *             Số khách * (controlId "reservation-guests", name "guests", type "number", min={1} max={20})
 *          2. Viết thân handleSubmit:
 *             setSubmitted(true); errorCount > 0 → return (KHÔNG gọi API); setSubmitting(true);
 *             try   → const booking = await reservationApi.create({ userId: user?.id ?? null, name, phone, date, time,
 *                                                                   guests: Number(values.guests), note })  (chuỗi đã trim)
 *                     → setLastBooking(booking) → showToast(`Đặt bàn thành công cho ${booking.guests} khách`)
 *                     → setValues(initialValues()); setTouched({}); setSubmitted(false);
 *             catch → setServerError(err.message);  finally → setSubmitting(false).
 * ==========================================================================================
 */
export default function ReservationPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const initialValues = () => ({ ...EMPTY_RESERVATION, name: user?.fullName ?? '' });

  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [lastBooking, setLastBooking] = useState(null);

  const errors = validateReservation(values);
  const errorCount = Object.keys(errors).length;
  const showError = (name) => (touched[name] || submitted ? errors[name] : undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setServerError('');
  };

  const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO-12: setSubmitted(true); errorCount > 0 → return; gọi reservationApi.create(...) trong try/catch/finally
    setSubmitted(true);
    if (errorCount > 0) return;            // còn lỗi → KHÔNG gọi API
    setSubmitting(true);
    try {
      const booking = await reservationApi.create({
        userId: user?.id ?? null,            // khách vãng lai → null
        name: values.name.trim(),
        phone: values.phone.trim(),
        date: values.date,
        time: values.time,
        guests: Number(values.guests),       // gửi SỐ, không gửi chuỗi
        note: values.note.trim(),
      });
      setLastBooking(booking);
      showToast(`Đặt bàn thành công cho ${booking.guests} khách`);
      setValues(initialValues());            // làm sạch form
      setTouched({});
      setSubmitted(false);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card>
          <Card.Body>
            <h3 className="text-center mb-3">Đặt bàn</h3>

            {lastBooking && (
              <Alert variant="success" data-testid="booking-result">
                Mã đặt bàn #{lastBooking.id}: {lastBooking.guests} khách, {lastBooking.time} ngày {lastBooking.date}
              </Alert>
            )}
            {serverError && <Alert variant="danger">{serverError}</Alert>}

            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="reservation-name">
                <Form.Label>Tên người đặt *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(showError('name'))}
                />
                <Form.Control.Feedback type="invalid">{showError('name')}</Form.Control.Feedback>
              </Form.Group>



              <Form.Group className="mb-3" controlId="reservation-phone">
                <Form.Label>Số điện thoại *</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(showError('phone'))}
                />
                <Form.Control.Feedback type="invalid">{showError('phone')}</Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col sm={6}>
                  {/* TODO-12: ô Ngày (reservation-date) – nhãn "Ngày *", làm tương tự ô Tên người đặt */}
                  <Form.Group className="mb-3" controlId="reservation-date">
                    <Form.Label>Ngày *</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={Boolean(showError('date'))}
                      min={todayISO()}
                    />
                    <Form.Control.Feedback type="invalid">{showError('date')}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="reservation-time">
                    <Form.Label>Giờ *</Form.Label>
                    <Form.Select
                      name="time"
                      value={values.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={Boolean(showError('time'))}
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{showError('time')}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* TODO-12: ô Số khách (reservation-guests) – nhãn "Số khách *", làm tương tự ô Tên người đặt */}
              <Form.Group className="mb-3" controlId="reservation-guests">
                <Form.Label>Số khách *</Form.Label>
                <Form.Control
                  type="number"
                  name="guests"
                  value={values.guests}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(showError('guests'))}
                  min={1} max={20}
                />
                <Form.Control.Feedback type="invalid">{showError('guests')}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="reservation-note">
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="note"
                  value={values.note}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(showError('note'))}
                />
                <Form.Control.Feedback type="invalid">{showError('note')}</Form.Control.Feedback>
              </Form.Group>

              {submitted && errorCount > 0 && (
                <Form.Text className="text-danger d-block mb-2">Còn {errorCount} mục chưa hợp lệ</Form.Text>
              )}

              <Button type="submit" variant="success" className="w-100" disabled={submitting}>
                {submitting && <Spinner size="sm" className="me-2" />}
                Xác nhận đặt bàn
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
