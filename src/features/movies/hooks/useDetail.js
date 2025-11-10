import { getId } from "@/api/getId.js";
import { useEffect, useState } from "react";

export function useDetail(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    getId(id, { signal: ctrl.signal })
      .then(setData)
      .catch((e) => !ctrl.signal.aborted && setError(e))
      .finally(() => !ctrl.signal.aborted && setLoading(false));

    return () => ctrl.abort();
  }, [id]);

  return { data, loading, error };
}
