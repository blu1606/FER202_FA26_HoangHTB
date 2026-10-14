import Carousel from 'react-bootstrap/Carousel';

export default function HomePage() {
  return (
    <div className="home-page">
      <Carousel className="mb-4 shadow-sm rounded overflow-hidden">
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="/images/slide1.jpg"
            alt="Celebration Ham Slide"
            style={{ maxHeight: '420px', objectFit: 'cover' }}
          />
        </Carousel.Item>

        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="/images/slide2.jpg"
            alt="Pizza Feast Slide"
            style={{ maxHeight: '420px', objectFit: 'cover' }}
          />
        </Carousel.Item>

        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src="/images/slide3.jpg"
            alt="Special Offer Slide"
            style={{ maxHeight: '420px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      </Carousel>

      <h2 className="text-danger mt-3">This is Home Page</h2>
    </div>
  );
}