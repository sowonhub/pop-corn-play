import { buildUrl } from "@/constants/api.js";
import { useEffect, useState } from "react";

export default function useTop10Movies() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        // TMDB 트렌딩 상위 10개 (백드롭 없으면 포스터 사용)
        const url = buildUrl("/trending/movie/day", { language: "ko-KR" });
        const res = await fetch(url, {
          signal: ac.signal,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`TMDB ${res.status}`);
        const data = await res.json();
        const top10 = (data?.results ?? []).slice(0, 10);
        setList(top10);
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
