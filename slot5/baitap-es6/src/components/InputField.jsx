import Form from 'react-bootstrap/Form';

const InputField = ({ id, label, helpText, required, ...inputProps }) => {
  return (
    <Form.Group className="mb-3" controlId={id}>
      {label && (
        <Form.Label>
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </Form.Label>
      )}
      <Form.Control required={required} {...inputProps} />
      {helpText && <Form.Text className="text-muted">{helpText}</Form.Text>}
    </Form.Group>
  );
};

export default InputField;
