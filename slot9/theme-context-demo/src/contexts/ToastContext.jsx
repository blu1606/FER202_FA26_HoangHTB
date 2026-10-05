import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, variant = 'primary', title = 'Thông báo hệ thống') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    const newToast = { id, message, variant, title, time: new Date().toLocaleTimeString('vi-VN') };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      showToast,
      toasts,
    }),
    [showToast, toasts]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* ToastContainer hien thi o goc duoi ben phai */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999 }}>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            bg={t.variant}
            onClose={() => removeToast(t.id)}
            delay={3000}
            autohide
            className="shadow"
          >
            <Toast.Header closeButton>
              <strong className="me-auto">{t.title}</strong>
              <small>{t.time}</small>
            </Toast.Header>
            <Toast.Body className={t.variant === 'light' ? 'text-dark' : 'text-white'}>
              {t.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error('useToast phai duoc su dung ben trong <ToastProvider>');
  }
  return context;
}
