import { useState, useReducer } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';

// 1. Trạng thái khởi tạo cho form
const initialFormState = {
  values: {
    firstName: '',
    lastName: '',
    username: '',
    city: '',
    state: '',
    zip: '',
    agree: false,
  },
  errors: {},
  validated: false,
};

// 2. Reducer quản lý cập nhật dữ liệu và lỗi validation
function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: '',
        },
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
        validated: true,
      };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

export default function ContactPage() {
  // useReducer quản lý state và validation của Form
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  // useState quản lý đóng/mở Modal theo yêu cầu
  const [showModal, setShowModal] = useState(false);

  // Hàm kiểm tra tính hợp lệ của dữ liệu
  const validateForm = (values) => {
    const errors = {};
    if (!values.firstName.trim()) {
      errors.firstName = 'Looks good! (hoặc Vui lòng nhập First name)';
    }
    if (!values.lastName.trim()) {
      errors.lastName = 'Vui lòng nhập Last name.';
    }
    if (!values.username.trim()) {
      errors.username = 'Please choose a username.';
    }
    if (!values.city.trim()) {
      errors.city = 'Please provide a valid city.';
    }
    if (!values.state.trim()) {
      errors.state = 'Please provide a valid state.';
    }
    if (!values.zip.trim()) {
      errors.zip = 'Please provide a valid zip.';
    }
    if (!values.agree) {
      errors.agree = 'You must agree before submitting.';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({
      type: 'CHANGE_FIELD',
      field: name,
      value: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formState.values);
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });

    // Khi dữ liệu valid (không có lỗi nào) thì mở Modal
    if (Object.keys(validationErrors).length === 0) {
      setShowModal(true);
    }
  };

  const { values, errors, validated } = formState;

  return (
    <div className="py-4">
      <h2 className="mb-4">Contact Form</h2>

      <Form noValidate onSubmit={handleSubmit}>
        {/* Hàng 1: First name, Last name, Username */}
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First name"
              value={values.firstName}
              onChange={handleChange}
              isValid={validated && !errors.firstName}
              isInvalid={validated && !!errors.firstName}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last name"
              value={values.lastName}
              onChange={handleChange}
              isValid={validated && !errors.lastName}
              isInvalid={validated && !!errors.lastName}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                value={values.username}
                onChange={handleChange}
                isValid={validated && !errors.username}
                isInvalid={validated && !!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        {/* Hàng 2: City, State, Zip */}
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="City"
              value={values.city}
              onChange={handleChange}
              isValid={validated && !errors.city}
              isInvalid={validated && !!errors.city}
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="validationState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              placeholder="State"
              value={values.state}
              onChange={handleChange}
              isValid={validated && !errors.state}
              isInvalid={validated && !!errors.state}
            />
            <Form.Control.Feedback type="invalid">
              {errors.state}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="3" controlId="validationZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              name="zip"
              placeholder="Zip"
              value={values.zip}
              onChange={handleChange}
              isValid={validated && !errors.zip}
              isInvalid={validated && !!errors.zip}
            />
            <Form.Control.Feedback type="invalid">
              {errors.zip}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Điều khoản */}
        <Form.Group className="mb-3" controlId="validationAgree">
          <Form.Check
            type="checkbox"
            name="agree"
            label="Agree to terms and conditions"
            checked={values.agree}
            onChange={handleChange}
            isInvalid={validated && !!errors.agree}
            feedback={errors.agree}
            feedbackType="invalid"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit form
        </Button>
      </Form>

      {/* Modal hiển thị khi dữ liệu Valid */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Completed Lab5</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-success mb-3">
            <i className="bi bi-check-circle-fill me-2"></i>
            Thông tin đã nhập vào form:
          </h6>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>First name:</strong> {values.firstName}
            </li>
            <li className="list-group-item">
              <strong>Last name:</strong> {values.lastName}
            </li>
            <li className="list-group-item">
              <strong>Username:</strong> @{values.username}
            </li>
            <li className="list-group-item">
              <strong>City:</strong> {values.city}
            </li>
            <li className="list-group-item">
              <strong>State:</strong> {values.state}
            </li>
            <li className="list-group-item">
              <strong>Zip:</strong> {values.zip}
            </li>
            <li className="list-group-item">
              <strong>Agree to terms:</strong> {values.agree ? 'Đã đồng ý' : 'Chưa'}
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}