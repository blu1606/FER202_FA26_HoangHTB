import { Routes, Route, Link, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import SkillsPage from './components/SkillsPage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';
import NotFoundPage from './components/NotFoundPage';
import MyNavBar from './components/MyNavBar'

export default function App() {
  return (
    <>
      <MyNavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
