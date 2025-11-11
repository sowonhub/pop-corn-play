/**
 * [7-1-1단계] hooks/movies/useTop.js - 인기 영화 데이터를 가져오는 훅
 * 
 * 이 훅은:
 * 1. TMDB API에서 인기 영화를 가져옵니다
 * 2. 상위 10개만 반환합니다
 * 
 * 실행 순서:
 * - TopBanner 컴포넌트에서 이 훅을 사용합니다
 * 
 * 다음 단계:
 *   [7-1-1-1단계] hooks/useFetch.js (공통 API 호출 로직)
 *   [7-1-1-2단계] services/tmdb/movies.js (실제 API 호출)
 */

import useFetch from "../useFetch.js";
import { getTrendingMovies } from "@/services/tmdb";

export default function useTop() {
  // useFetch 훅을 사용해서 API 호출
  const { data, loading, error } = useFetch(
    ({ signal }) => getTrendingMovies({ signal }),
    [], // 빈 배열: 컴포넌트가 처음 마운트될 때만 호출
  );

  // 상위 10개만 반환
  return {
    list: (data?.results ?? []).slice(0, 10),
    loading,
    error,
  };
}
