import { Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import SkillsPage from './components/SkillsPage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';
import NotFoundPage from './components/NotFoundPage';
import MyNavBar from './components/MyNavBar'
import CourseListPage from './components/CourseListPage'
import CourseDetailPage from './components/CourseDetailPage'

export default function App() {
  return (
    <>
      <MyNavBar />

      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/courses" element={<CourseListPage />} />
        <Route path="/courses/:code" element={<CourseDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
