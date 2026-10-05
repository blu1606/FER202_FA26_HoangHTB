import Button from 'react-bootstrap/Button';

const AppButton = ({ variant = 'primary', children, ...props }) => (
  <Button variant={variant} {...props}>
    {children}
  </Button>
);

export default AppButton;
