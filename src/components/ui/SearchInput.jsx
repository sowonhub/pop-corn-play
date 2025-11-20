import { PATHS } from "@/router";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchInput({ compact = false }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const keyword = params.get("keyword") ?? "";
  const [query, setQuery] = useState(keyword);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setQuery(keyword);
  }, [keyword]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    const pathname = trimmedQuery
      ? `${PATHS.SEARCH}?keyword=${encodeURIComponent(trimmedQuery)}`
      : PATHS.HOME;
    navigate(pathname);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="영화 검색"
      className={cn("relative mx-auto max-w-md", compact ? "" : "w-full")}
    >
      <div
        className={cn(
          "relative flex items-center overflow-hidden rounded-full bg-neutral-100 transition-all dark:bg-neutral-900",
          isFocused
            ? "ring-2 ring-rose-500/50 bg-white dark:bg-neutral-800"
            : "hover:bg-neutral-200 dark:hover:bg-neutral-800",
        )}
      >
        <div className="flex h-full w-10 items-center justify-center text-neutral-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          name="keyword"
          type="search"
          className={cn(
            "w-full bg-transparent py-2.5 pr-4 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-100",
            compact ? "py-2" : "h-11",
          )}
          aria-label="검색어"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="영화 제목, 배우, 감독으로 검색..."
          autoComplete="off"
        />
      </div>
    </form>
  );
}
