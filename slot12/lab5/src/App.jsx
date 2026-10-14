import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NewsPage from './components/NewsPage';
import QuizPage from './components/QuizPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import MyNavBar from './components/MyNavBar';
import MyCarousel from './components/MyCarousel';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <MyNavBar />
      <div className="container mt-4">
        {/* Hiển thị Carousel ở tất cả các trang theo yêu cầu */}
        <MyCarousel />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
