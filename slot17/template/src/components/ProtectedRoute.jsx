import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Route bảo vệ – CÓ SẴN, KHÔNG sửa file này.
 *   Chưa đăng nhập → /login (kèm state.from để đăng nhập xong quay lại)
 *   Sai vai trò    → /403 (ForbiddenPage – TODO-10)
 */
export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/403" replace state={{ from: location }} />;
  return children;
}
