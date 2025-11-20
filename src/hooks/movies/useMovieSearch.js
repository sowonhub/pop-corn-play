import { useInfiniteQuery } from "@tanstack/react-query";
import { EMPTY_SEARCH_RESULT, getMovieSearch } from "@/services/movie-database";

export default function useMovieSearch(searchKeyword) {
  const trimmedKeyword = (searchKeyword || "").trim();
  const hasKeyword = Boolean(trimmedKeyword);

  return useInfiniteQuery({
    queryKey: ["movieSearch", trimmedKeyword],
    queryFn: ({ pageParam = 1, signal }) =>
      hasKeyword
        ? getMovieSearch(trimmedKeyword, pageParam, { signal })
        : Promise.resolve(EMPTY_SEARCH_RESULT),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    enabled: hasKeyword,
  });
}
