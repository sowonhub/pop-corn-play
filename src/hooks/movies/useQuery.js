// [9-1단계] 검색 결과를 가져오는 커스텀 훅
import useFetch from "../useFetch.js";
import { searchMovies } from "@/services/movie-database";

const EMPTY_RESULT = {
  results: [],
  page: 1,
  total_results: 0,
  total_pages: 0,
};

export default function useQuery(query, page = 1) {
  const trimmedQuery = (query || "").trim();
  const hasQuery = Boolean(trimmedQuery);

  const { data, loading, error } = useFetch(
    ({ signal }) =>
      hasQuery
        ? searchMovies(trimmedQuery, page, { signal })
        : Promise.resolve(EMPTY_RESULT),
    [trimmedQuery, page, hasQuery],
  );

  if (!hasQuery) {
    return { data: null, loading: false, error: null };
  }

  return { data, loading, error };
}
