import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/**
 * useAxios – gọi API bằng axios trong useEffect
 *
 * @param {(signal: AbortSignal) => Promise<{data, headers?}>} requestFn
 *        Hàm nhận `signal`, trả về axios response (hoặc object có `data`)
 * @param {Array} deps   Các giá trị mà requestFn phụ thuộc (giống deps của useEffect)
 * @param {Object} options
 *        - enabled:     false → không gọi API (fetch có điều kiện)
 *        - initialData: giá trị data ban đầu (vd [] cho danh sách)
 *
 * @returns { data, setData, headers, loading, error, refetch }
 */
export default function useAxios(requestFn, deps = [], { enabled = true, initialData = null } = {}) {
  const [data, setData] = useState(initialData);
  const [headers, setHeaders] = useState({});
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [doneKey, setDoneKey] = useState(null); // "khóa" của lần tải đã hoàn tất

  // Khóa đại diện cho bộ tham số hiện tại (deps là giá trị nguyên thủy: số, chuỗi...)
  const key = JSON.stringify([...deps, reloadKey]);

  useEffect(() => {
    if (!enabled) return; // fetch có điều kiện

    const controller = new AbortController(); // chống race condition

    const run = async () => {
      setError(null);
      try {
        const res = await requestFn(controller.signal);
        setData(res.data);
        setHeaders(res.headers ?? {});
      } catch (err) {
        if (axios.isCancel(err)) return; // bị hủy → không phải lỗi
        setError(err.userMessage ?? err.message);
      } finally {
        if (!controller.signal.aborted) setDoneKey(key); // đánh dấu: tải xong cho bộ tham số này
      }
    };

    run();
    return () => controller.abort(); // cleanup: deps đổi / unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled]);

  // Đang tải = được phép gọi VÀ bộ tham số hiện tại chưa tải xong.
  const loading = enabled && doneKey !== key;

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  return { data, setData, headers, loading, error, refetch };
}
