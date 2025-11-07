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
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="영화 검색…"
        className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none placeholder:text-neutral-500 focus:border-neutral-500"
        aria-label="영화 검색"
      />
    </form>
  );
}
