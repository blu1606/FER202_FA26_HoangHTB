import Carousel from 'react-bootstrap/Carousel';
import { heroSlides } from '../data/pizzas';

const HeroBanner = () => {
  return (
    <div id="home" className="w-100">
      <Carousel interval={4000} pause="hover" className="shadow-lg">
        {heroSlides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <img
              className="d-block w-100 hero-carousel-img"
              src={slide.image}
              alt={slide.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = './images/pizza1.jpg';
              }}
            />
            <Carousel.Caption className="hero-caption">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
