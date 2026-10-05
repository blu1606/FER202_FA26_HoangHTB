import { createContext, useContext, useState, useMemo, useCallback } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Lazy initializer de doc localStorage 1 lan duy nhat khi mount
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('demo_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((username, password) => {
    // Demo authentication: chap nhan admin/123 hoac student/123
    if ((username === 'admin' || username === 'student') && password === '123') {
      const authUser = {
        username,
        role: username === 'admin' ? 'Administrator' : 'Student',
        fullName: username === 'admin' ? 'Quản trị viên Hệ thống' : 'Sinh viên FPT',
        email: `${username}@fpt.edu.vn`,
        loginAt: new Date().toLocaleTimeString('vi-VN'),
      };
      setUser(authUser);
      try {
        localStorage.setItem('demo_user', JSON.stringify(authUser));
      } catch {
        // ignore storage error
      }
      return { success: true };
    }
    return { success: false, message: 'Sai tài khoản hoặc mật khẩu! (Gợi ý: admin / 123)' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem('demo_user');
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth phai duoc su dung ben trong <AuthProvider>');
  }
  return context;
}
