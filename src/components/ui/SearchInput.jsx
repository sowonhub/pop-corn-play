import { PATHS } from "@/router";
import searchIcon from "@/assets/icons/search.svg?raw";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchInput({ compact = false, transparent = false }) {
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
          "relative flex items-center overflow-hidden rounded-full transition-all",
          transparent
            ? [
                "border border-white/30 bg-black/30 backdrop-blur-sm",
                isFocused
                  ? "bg-black/50 ring-2 ring-rose-500/50"
                  : "hover:bg-black/40",
              ]
            : [
                "bg-neutral-100 dark:bg-neutral-900",
                isFocused
                  ? "bg-white ring-2 ring-rose-500/50 dark:bg-neutral-800"
                  : "hover:bg-neutral-200 dark:hover:bg-neutral-800",
              ],
        )}
      >
        <div className="flex h-full w-10 items-center justify-center text-neutral-400">
          <span
            className={cn("inline-block h-5 w-5", transparent && "text-white/70")}
            aria-hidden
            dangerouslySetInnerHTML={{ __html: searchIcon }}
          />
        </div>
        <input
          name="keyword"
          type="search"
          className={cn(
            "w-full bg-transparent py-2.5 pr-4 text-sm focus:outline-none",
            transparent
              ? "text-white placeholder:text-white/70"
              : "text-neutral-900 placeholder:text-neutral-500 dark:text-neutral-100",
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
