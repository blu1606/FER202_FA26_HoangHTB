import { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

// Đọc thông báo truyền qua navigate(..., { state: { flash } }) rồi xóa state
export default function useFlash() {
  const location = useLocation();
  const navigate = useNavigate();
  const { notify } = useOutletContext();

  useEffect(() => {
    const flash = location.state?.flash;
    if (!flash) return;
    notify(flash.bg, flash.message);
    navigate(location.pathname + location.search, { replace: true, state: null });
  }, [location, navigate, notify]);
}
