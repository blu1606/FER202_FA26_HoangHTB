import Container from 'react-bootstrap/Container';

const Footer = () => {
  return (
    <footer className="py-4 mt-5 border-top border-secondary text-center text-muted small">
      <Container>
        <p className="mb-1 text-light brand-font fs-5">Pizza House</p>
        <p className="mb-0">
          © {new Date().getFullYear()} Pizza House. Authentic Italian Pizza Recipe. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
