import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NewsPage from './components/NewsPage';
import QuizPage from './components/QuizPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import MyNavBar from './components/MyNavBar'

import './App.css'


function App() {

  return (
    <BrowserRouter>
      <MyNavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
