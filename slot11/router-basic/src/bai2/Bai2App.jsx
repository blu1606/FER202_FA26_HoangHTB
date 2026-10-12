import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout';
import HomePage from './HomePage';
import BooksPage from './BooksPage';
import HelpLayout from './HelpLayout';
import FaqPage from './FaqPage';
import RulesPage from './RulesPage';
import NotFoundPage from './NotFoundPage';

export default function Bai2App() {
  return (
    <div className="bai2-container">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="help" element={<HelpLayout />}>
            <Route index element={<Navigate to="faq" replace />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="rules" element={<RulesPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}
