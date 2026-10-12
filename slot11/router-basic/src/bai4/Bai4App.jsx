import { Routes, Route, Navigate } from 'react-router-dom';
import EventPage from './EventPage';
import RegisterPage from './RegisterPage';
import SuccessPage from './SuccessPage';

export default function Bai4App() {
  return (
    <div className="bai4-container">
      <Routes>
        <Route path="/" element={<EventPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
