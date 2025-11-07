import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchInput() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const qParam = params.get("q") ?? "";
  const [q, setQ] = useState(qParam);

  useEffect(() => {
    setQ(qParam);
  }, [qParam]);

  const onSubmit = (e) => {
    e.preventDefault();
    const v = q.trim();
    if (!v) return;
    navigate(`/search?q=${encodeURIComponent(v)}`);
  };

  return (
    <form onSubmit={onSubmit} className="ml-auto w-44 md:w-64">
      <input
        id="searchBox"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="영화 검색…"
        className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none placeholder:text-neutral-500 focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:border-neutral-600"
        aria-label="영화 검색"
      />
    </form>
  );
}
