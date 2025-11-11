import { tmdbUrl } from "@/services/auth/TMDB.js";
import { useEffect, useState } from "react";

export default function useTop() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const url = tmdbUrl("/trending/movie/day", { language: "ko-KR" });
        const res = await fetch(url, {
          signal: ac.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`TMDB ${res.status}`);
        const data = await res.json();
        setList((data?.results ?? []).slice(0, 10));
      } catch (e) {
        if (e.name !== "AbortError") setErr(e);
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  return { list, loading, err };
}
