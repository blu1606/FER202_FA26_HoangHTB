import './App.css';
import Card from './Card';

function App() {
  const pizza1 = {
    name: 'Pizza Calzone Gà Nấm',
    price: 139000,
    tag: 'Bestseller',
    avatar: '/image/pizza-1.jpg',
    description: 'Bánh pizza nướng gập giòn tan với nhân gà xé, nấm tươi cùng phô mai Mozzarella béo ngậy.',
  };

  const pizza2 = {
    name: 'Pizza Calzone Pepperoni',
    price: 159000,
    tag: 'Hot',
    avatar: '/image/pizza-2.jpg',
    description: 'Xúc xích Ý Pepperoni cay nhẹ kết hợp sốt cà chua Marinara đặc trưng và phô mai kéo sợi.',
  };

  return (
    <div className="pizza-app">
      <header className="pizza-header">
        <h1>🍕 Thực Đơn Pizza Đặc Biệt</h1>
        <p className="pizza-subtitle">Thưởng thức hương vị pizza truyền thống nướng lò đá hảo hạng</p>
      </header>

      <main className="pizza-grid">
        <Card product={pizza1} />
        <Card product={pizza2} />
      </main>
    </div>
  );
}

export default App;
