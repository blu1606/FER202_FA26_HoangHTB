import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductList';

function App() {
  const pizzas = [
    {
      id: 1,
      name: 'Pizza Calzone Gà Nấm',
      price: '139.000',
      tag: 'Bestseller',
      avatar: '/image/pizza-1.jpg',
    },
    {
      id: 2,
      name: 'Pizza Calzone Pepperoni',
      price: '159.000',
      tag: 'Hot',
      avatar: '/image/pizza-2.jpg',
    },
    {
      id: 3,
      name: 'Pizza Hải Sản Pesto',
      price: '169.000',
      tag: 'New',
      avatar: '/image/pizza-1.jpg',
    },
    {
      id: 4,
      name: 'Pizza Phô Mai 4 Vị',
      price: '149.000',
      tag: 'Sale',
      avatar: '/image/pizza-2.jpg',
    },
  ];

  return (
    <div className="bg-light min-vh-100 py-3">
      <ProductList products={pizzas} />
    </div>
  );
}

export default App;
