/**
 * [7-2-1단계] hooks/movies/usePopular.js - 인기 영화 데이터를 가져오는 훅
 * 
 * 이 훅은:
 * - TMDB API에서 인기 영화 목록을 가져옵니다
 * 
 * 실행 순서:
 * - Grid 컴포넌트에서 이 훅을 사용합니다
 * 
 * 다음 단계:
 *   [7-1-1-1단계] hooks/useFetch.js (공통 API 호출 로직)
 *   [7-1-1-2단계] services/tmdb/movies.js (실제 API 호출)
 */

import useFetch from "../useFetch.js";
import { getPopularMovies } from "@/services/tmdb";

export default function usePopular(page = 1) {
  return useFetch(
    ({ signal }) => getPopularMovies(page, { signal }),
    [page], // page가 바뀌면 다시 호출
  );
}
