import { useQuery } from "@tanstack/react-query";
import { EMPTY_SEARCH_RESULT, getMovieSearch } from "@/services/movie-database";

export default function useMovieSearch(searchKeyword, page = 1) {
  const trimmedKeyword = (searchKeyword || "").trim();
  const hasKeyword = Boolean(trimmedKeyword);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movieSearch", trimmedKeyword, page],
    queryFn: ({ signal }) =>
      hasKeyword
        ? getMovieSearch(trimmedKeyword, page, { signal })
        : Promise.resolve(EMPTY_SEARCH_RESULT),
    enabled: hasKeyword,
  });

  if (!hasKeyword) {
    return { data: null, isLoading: false, error: null };
  }

  return { data, isLoading, error };
}
