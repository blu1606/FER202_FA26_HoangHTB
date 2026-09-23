import Container from 'react-bootstrap/Container';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title = 'Trang chủ' }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />
      <main className="flex-grow-1 py-4">
        <Container>
          {title && <h2 className="mb-4 text-dark fw-bold">{title}</h2>}
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
