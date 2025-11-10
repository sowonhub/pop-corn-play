import { cn } from "@/cn";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchInput({ compact = false }) {
  const [params] = useSearchParams();
  const init = params.get("keyword") ?? "";
  const [query, setQuery] = useState(init);
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const keyword = query.trim();
    nav(keyword ? `/search?keyword=${encodeURIComponent(keyword)}` : "/");
  };

  const size = compact ? "h-9 text-sm" : "h-10";
  return (
    <form onSubmit={onSubmit} role="search" aria-label="영화 검색">
      <div className={cn(`relative ${compact ? "" : "w-full"}`)}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 검색…"
          className={cn(
            `w-full ${size} rounded-xl border border-neutral-300 bg-white pr-10 pl-9 text-neutral-900 placeholder:text-neutral-400 focus:ring-4 focus:ring-neutral-200/70 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:ring-neutral-800`,
          )}
          aria-label="검색어"
        />
        {/* Icon (left) */}
        <svg
          className={cn(
            "pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2",
          )}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
            stroke="currentColor"
            className={cn("text-neutral-400")}
          />
          <path
            d="M20 20L17 17"
            stroke="currentColor"
            className={cn("text-neutral-400")}
          />
        </svg>
        {/* Submit (right) */}
        <button
          type="submit"
          className={cn(
            "absolute top-1/2 right-1.5 -translate-y-1/2 rounded-lg border border-neutral-300 bg-white px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800",
          )}
          aria-label="검색 실행"
          title="검색"
        >
          Enter
        </button>
      </div>
    </form>
  );
}
