import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PizzaCard from './PizzaCard';
import { pizzas } from '../data/pizzas';

const OurMenu = () => {
  return (
    <section id="menu" className="py-5">
      <Container>
        <h2 className="menu-section-title">Our Menu</h2>
        <Row className="g-4">
          {pizzas.map((pizza) => (
            <Col key={pizza.id} xs={12} sm={6} lg={3}>
              <PizzaCard pizza={pizza} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default OurMenu;
