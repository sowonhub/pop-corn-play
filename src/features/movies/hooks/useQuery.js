import { getQuery } from "@/api/getQuery.js";
import { useEffect, useState } from "react";

export function useQuery(query, page = 1) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(query));
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = (query || "").trim();
    if (!q) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    getQuery(q, page, { signal: ctrl.signal })
      .then(setData)
      .catch((e) => !ctrl.signal.aborted && setError(e))
      .finally(() => !ctrl.signal.aborted && setLoading(false));

    return () => ctrl.abort();
  }, [query, page]);

  return { data, loading, error };
}
