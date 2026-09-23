import Button from 'react-bootstrap/Button';

const AppButton = ({ variant = 'primary', children, ...rest }) => {
  return (
    <Button variant={variant} {...rest}>
      {children}
    </Button>
  );
};

export default AppButton;
