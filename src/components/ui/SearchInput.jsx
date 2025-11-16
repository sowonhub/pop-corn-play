import { PATHS } from "@/router";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchInput({ compact = false }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const keyword = params.get("keyword") ?? "";
  const [query, setQuery] = useState(keyword);

  useEffect(() => {
    setQuery(keyword);
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    const url = trimmedQuery
      ? `${PATHS.SEARCH}?keyword=${encodeURIComponent(trimmedQuery)}`
      : PATHS.HOME;
    navigate(url);
  };

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="영화 검색">
      <div className={cn("relative", compact ? "" : "w-full")}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 검색…"
          className={cn(
            "w-full rounded-xl border border-neutral-300 bg-white pr-6 pl-4 text-neutral-900 placeholder:text-neutral-400 focus:ring-4 focus:ring-neutral-200/70 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:ring-neutral-800",
            compact ? "text-sm" : "h-10",
          )}
          aria-label="검색어"
        />

        <button
          type="submit"
          className="absolute top-1/2 right-1.5 -translate-y-1/2 pr-2"
          aria-label="검색 실행"
          title="검색"
        >
          🔍
        </button>
      </div>
    </form>
  );
}
