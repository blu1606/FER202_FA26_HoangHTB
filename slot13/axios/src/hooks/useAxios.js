import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * Custom hook useAxios (NC8)
 * @param {Function} apiFunc - Hàm nhận (signal) và trả về Promise axios
 * @param {Array} deps - Mảng dependencies kích hoạt lại hook
 */
export const useAxios = (apiFunc, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [triggerCount, setTriggerCount] = useState(0);

  const refetch = useCallback(() => {
    setTriggerCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const execute = async () => {
      try {
        const response = await apiFunc(controller.signal);
        if (isMounted) setData(response.data);
      } catch (err) {
        if (isMounted && !axios.isCancel(err) && err.name !== 'CanceledError') {
          setError(err.viMessage || err.message || 'Lỗi tải dữ liệu');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    execute();

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, triggerCount]);

  return { data, loading, error, refetch };
};

export default useAxios;
