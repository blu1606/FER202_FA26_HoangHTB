import 'bootstrap/dist/css/bootstrap.min.css';
import ProductInfo from './ProductInfo';

function App() {
  const pizza1 = {
    name: 'Pizza Calzone Gà Nấm',
    price: '139.000',
    tag: 'Bestseller',
    avatar: '/image/pizza-1.jpg',
  };

  const pizza2 = {
    name: 'Pizza Calzone Pepperoni',
    price: '159.000',
    tag: 'Hot',
    avatar: '/image/pizza-2.jpg',
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">Danh Sách Pizza</h1>
      <div className="d-flex justify-content-center flex-wrap">
        <ProductInfo
          name={pizza1.name}
          price={pizza1.price}
          tag={pizza1.tag}
          avatar={pizza1.avatar}
        />
        <ProductInfo
          name={pizza2.name}
          price={pizza2.price}
          tag={pizza2.tag}
          avatar={pizza2.avatar}
        />
      </div>
    </div>
  );
}

export default App;
