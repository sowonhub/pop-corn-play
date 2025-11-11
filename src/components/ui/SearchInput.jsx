/**
 * [6-1-1단계] components/ui/SearchInput.jsx - 검색 입력 컴포넌트
 * 
 * 이 컴포넌트는:
 * 1. 검색어를 입력받습니다
 * 2. Enter를 누르면 검색 결과 페이지로 이동합니다
 * 
 * 실행 순서:
 * - Header 컴포넌트에서 이 컴포넌트를 사용합니다
 * 
 * 다음 단계:
 *   [9단계] pages/QueryPage.jsx (검색 결과 페이지로 이동)
 */

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { cn } from "@/utils/cn";

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
      ? `/search?keyword=${encodeURIComponent(trimmedQuery)}`
      : "/";
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
            "w-full rounded-xl border border-neutral-300 bg-white pr-10 pl-9 text-neutral-900 placeholder:text-neutral-400 focus:ring-4 focus:ring-neutral-200/70 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:ring-neutral-800",
            compact ? "h-9 text-sm" : "h-10",
          )}
          aria-label="검색어"
        />
        <svg
          className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2"
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
            className="text-neutral-400"
          />
          <path
            d="M20 20L17 17"
            stroke="currentColor"
            className="text-neutral-400"
          />
        </svg>
        <button
          type="submit"
          className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-lg border border-neutral-300 bg-white px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
          aria-label="검색 실행"
          title="검색"
        >
          Enter
        </button>
      </div>
    </form>
  );
}
