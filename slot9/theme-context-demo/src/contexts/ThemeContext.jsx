import { createContext, useContext, useState, useMemo, useCallback } from 'react';

// 1. Khoi tao context voi defaultValue = null de bat loi som khi thieu Provider
export const ThemeContext = createContext(null);

// 2. Component ThemeProvider cung cap theme ('light' | 'dark') va toggleTheme
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setThemeMode = useCallback((mode) => {
    if (mode === 'light' || mode === 'dark') {
      setTheme(mode);
    }
  }, []);

  // useMemo dam bao giu on dinh tham chieu object value, chi tao lai khi theme doi
  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
      setThemeMode,
    }),
    [theme, toggleTheme, setThemeMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// 3. Custom hook useTheme tien loi va kiem tra loi truc quan
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme phai duoc su dung ben trong <ThemeProvider>');
  }
  return context;
}
