/**
 * [9-1단계] hooks/movies/useQuery.js - 검색 결과를 가져오는 커스텀 훅
 * 
 * 이 훅은:
 * - 검색어를 받아서 검색 결과를 가져옵니다
 * - 검색어가 없으면 빈 결과를 반환합니다
 * 
 * 실행 순서:
 * - QueryPage에서 이 훅을 사용합니다
 * 
 * 다음 단계:
 *   [7-1-1-1단계] hooks/useFetch.js (공통 API 호출 로직)
 *   [7-1-1-2단계] services/tmdb/movies.js (실제 API 호출)
 */

import useFetch from "../useFetch.js";
import { searchMovies } from "@/services/tmdb";

// 검색어가 없을 때 반환할 빈 결과
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
