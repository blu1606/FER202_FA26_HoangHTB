import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { Container, Toast, ToastContainer } from "react-bootstrap";
import AppNavbar from "./AppNavbar";

export default function Layout() {
  const [toast, setToast] = useState(null); // { bg, message }
  const notify = useCallback((bg, message) => setToast({ bg, message }), []);

  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        {/* Truyền notify xuống mọi trang con qua useOutletContext() */}
        <Outlet context={{ notify }} />
      </Container>

      <ToastContainer position="bottom-end" className="p-3 position-fixed">
        <Toast show={!!toast} bg={toast?.bg} onClose={() => setToast(null)} delay={3500} autohide>
          <Toast.Body className="text-white">{toast?.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
