import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { classifyBmi } from '../data/homework-data';

export default function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('cm');

  const h = Number(height);
  const w = Number(weight);
  const heightInMeters = unit === 'cm' ? h / 100 : h;

  const minH = unit === 'cm' ? 50 : 0.5;
  const maxH = unit === 'cm' ? 250 : 2.5;

  const errors = {};
  if (height !== '' && (!(h >= minH && h <= maxH) || Number.isNaN(h))) {
    errors.height = `Chiều cao từ ${minH} đến ${maxH} ${unit}`;
  }
  if (weight !== '' && (!(w >= 10 && w <= 300) || Number.isNaN(w))) {
    errors.weight = 'Cân nặng từ 10 đến 300 kg';
  }

  const isValid =
    height !== '' &&
    weight !== '' &&
    !errors.height &&
    !errors.weight &&
    heightInMeters > 0;

  const bmi = isValid ? (w / (heightInMeters * heightInMeters)).toFixed(1) : null;
  const classification = bmi ? classifyBmi(Number(bmi)) : null;

  const changeUnit = (nextUnit) => {
    if (nextUnit === unit) return;
    if (height !== '' && !Number.isNaN(h)) {
      if (nextUnit === 'm') {
        setHeight((h / 100).toFixed(2));
      } else {
        setHeight((h * 100).toFixed(0));
      }
    }
    setUnit(nextUnit);
  };

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Header className="bg-success text-white py-3">
        <h5 className="mb-0 fw-semibold">HW 3: Máy tính BMI (Ô số lưu chuỗi & Dữ liệu dẫn xuất)</h5>
      </Card.Header>
      <Card.Body className="p-4">
        <p className="text-muted mb-4">
          Xử lý đúng ô input số lưu dạng chuỗi, tự động quy đổi đơn vị và tính toán kết quả dẫn xuất khi render.
        </p>

        <div className="mb-3 d-flex align-items-center justify-content-between">
          <span className="fw-semibold">Đơn vị chiều cao:</span>
          <ButtonGroup size="sm">
            <Button
              variant={unit === 'cm' ? 'primary' : 'outline-primary'}
              onClick={() => changeUnit('cm')}
            >
              cm
            </Button>
            <Button
              variant={unit === 'm' ? 'primary' : 'outline-primary'}
              onClick={() => changeUnit('m')}
            >
              m
            </Button>
          </ButtonGroup>
        </div>

        <Row className="g-3 mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-semibold">Chiều cao ({unit}):</Form.Label>
              <Form.Control
                type="number"
                step={unit === 'm' ? '0.01' : '1'}
                placeholder={`Ví dụ: ${unit === 'cm' ? '170' : '1.70'}`}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                isInvalid={!!errors.height}
              />
              <Form.Control.Feedback type="invalid">
                {errors.height}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-semibold">Cân nặng (kg):</Form.Label>
              <Form.Control
                type="number"
                step="0.5"
                placeholder="Ví dụ: 65"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                isInvalid={!!errors.weight}
              />
              <Form.Control.Feedback type="invalid">
                {errors.weight}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {classification ? (
          <Alert variant={classification.variant} className="shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="alert-heading fw-bold mb-1">
                  BMI = {bmi} → Phân loại: {classification.label}
                </h5>
                <small className="opacity-75">
                  (Tiêu chuẩn phân loại thể trạng áp dụng cho người châu Á)
                </small>
              </div>
            </div>
          </Alert>
        ) : (
          <div className="p-3 bg-light rounded text-center text-muted fst-italic border">
            Vui lòng nhập đầy đủ chiều cao và cân nặng hợp lệ để xem kết quả đánh giá thể trạng.
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
