// [7-1-1-1단계] API 호출을 위한 커스텀 훅
import { useEffect, useState } from "react";

export default function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    setLoading(true);
    setError(null);

    fetchFn({ signal: ctrl.signal })
      .then((result) => {
        if (!ctrl.signal.aborted) setData(result);
      })
      .catch((e) => {
        if (!ctrl.signal.aborted) setError(e);
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false);
      });

    return () => ctrl.abort();
  }, deps);

  return { data, loading, error };
}
