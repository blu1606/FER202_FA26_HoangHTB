import { Routes, Route, Navigate } from 'react-router-dom';
import StudentDirectoryPage from './StudentDirectoryPage';

export default function Bai5App() {
  return (
    <div className="bai5-container">
      <Routes>
        <Route path="/" element={<StudentDirectoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
