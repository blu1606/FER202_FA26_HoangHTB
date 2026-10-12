import { Routes, Route, Navigate } from 'react-router-dom';
import CourseListPage from './CourseListPage';
import CourseDetailPage from './CourseDetailPage';

export default function Bai3App() {
  return (
    <div className="bai3-container">
      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/courses" element={<CourseListPage />} />
        <Route path="/courses/:code" element={<CourseDetailPage />} />
        <Route path="*" element={<Navigate to="/courses" replace />} />
      </Routes>
    </div>
  );
}
