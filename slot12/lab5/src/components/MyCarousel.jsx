import Carousel from 'react-bootstrap/Carousel';
import banners from '../data/banners';

export default function MyCarousel() {
  return (
    <Carousel className="mb-4 shadow-sm rounded overflow-hidden" interval={3000}>
      {banners.map((item) => (
        <Carousel.Item key={item.id}>
          <img
            className="d-block w-100"
            src={item.image}
            alt={item.title}
            style={{ maxHeight: '450px', objectFit: 'cover' }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 p-2 rounded">
            <h5>{item.title}</h5>
            <p className="mb-0">{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
