import { Routes, Route } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import HomePage from './HomePage';
import SkillsPage from './SkillsPage';
import ProjectsPage from './ProjectsPage';
import ContactPage from './ContactPage';
import NotFoundPage from './NotFoundPage';

export default function Bai1App() {
  return (
    <div className="bai1-container pb-4">
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
