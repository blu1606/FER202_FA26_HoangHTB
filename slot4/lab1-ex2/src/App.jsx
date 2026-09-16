import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './ProductList';
import pizzas from './pizzaData';

function App() {
  return (
    <div className="bg-light min-vh-100 py-3">
      <ProductList products={pizzas} />
    </div>
  );
}

export default App;
