import { getPopular } from "@/services/index.js";
import { useEffect, useState } from "react";

export default function usePopular(page = 1) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    getPopular(page, { signal: ctrl.signal })
      .then(setData)
      .catch((e) => !ctrl.signal.aborted && setError(e))
      .finally(() => !ctrl.signal.aborted && setLoading(false));

    return () => ctrl.abort();
  }, [page]);

  return { data, loading, error };
}
