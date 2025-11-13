// [9-1단계] 검색 결과를 가져오는 커스텀 훅
import { EMPTY_SEARCH_RESULT, getMovieSearch } from "@/services/movie-database";
import useFetch from "../useFetch.js";

export default function useMovieSearch(query, page = 1) {
  const trimmedQuery = (query || "").trim();
  const hasQuery = Boolean(trimmedQuery);

  const { data, loading, error } = useFetch(
    ({ signal }) =>
      hasQuery
        ? getMovieSearch(trimmedQuery, page, { signal })
        : Promise.resolve(EMPTY_SEARCH_RESULT),
    [trimmedQuery, page, hasQuery],
  );

  if (!hasQuery) {
    return { data: null, loading: false, error: null };
  }

  return { data, loading, error };
}
