import { Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import MyNavBar from './components/MyNavBar';
import HomePage from './components/HomePage';
import SkillsPage from './components/SkillsPage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';
import NotFoundPage from './components/NotFoundPage';

import CourseListPage from './components/CourseListPage';
import CourseDetailPage from './components/CourseDetailPage';

import BooksPage from './components/BooksPage';
import HelpLayout from './components/HelpLayout';
import FaqPage from './components/FaqPage';
import RulesPage from './components/RulesPage';

import EventPage from './components/EventPage';
import RegisterPage from './components/RegisterPage';
import SuccessPage from './components/SuccessPage';

import StudentDirectoryPage from './components/StudentDirectoryPage';

export default function App() {
  return (
    <>
      <MyNavBar />

      <Container>
        <Routes>
          {/* Bài 1: Portfolio */}
          <Route path="/" element={<HomePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Bài 3: Khóa học (Dynamic Route) */}
          <Route path="/courses" element={<CourseListPage />} />
          <Route path="/courses/:code" element={<CourseDetailPage />} />

          {/* Bài 2: Thư viện & Hướng dẫn (Nested Routes) */}
          <Route path="/books" element={<BooksPage />} />
          <Route path="/help" element={<HelpLayout />}>
            <Route index element={<Navigate to="faq" replace />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="rules" element={<RulesPage />} />
          </Route>

          {/* Bài 4: Sự kiện & Đăng ký (useNavigate & state) */}
          <Route path="/event" element={<EventPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/success" element={<SuccessPage />} />

          {/* Bài 5: Danh bạ sinh viên (useSearchParams) */}
          <Route path="/students" element={<StudentDirectoryPage />} />

          {/* Trang 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  );
}
