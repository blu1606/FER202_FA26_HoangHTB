import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const Header = () => {
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <Navbar expand="lg" className="pizza-navbar py-3">
      <Container>
        <Navbar.Brand href="#home" className="pizza-brand">
          Pizza House
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="pizza-navbar-nav" className="border-secondary" />
        <Navbar.Collapse id="pizza-navbar-nav">
          <Nav className="me-auto ms-lg-4">
            <Nav.Link href="#home" className="pizza-nav-link fw-semibold">
              Home
            </Nav.Link>
            <Nav.Link href="#about" className="pizza-nav-link fw-semibold">
              About Us
            </Nav.Link>
            <Nav.Link href="#contact" className="pizza-nav-link fw-semibold">
              Contact
            </Nav.Link>
          </Nav>
          <Form onSubmit={handleSearch} className="d-flex mt-3 mt-lg-0">
            <InputGroup style={{ maxWidth: '300px' }}>
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="bg-white border-0"
              />
              <Button type="submit" className="btn-search-red">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </Button>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
