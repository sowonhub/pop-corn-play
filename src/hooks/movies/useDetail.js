import { getMovieDetail } from "@/services/tmdb";
import useFetch from "../useFetch.js";

/**
 * [8-1단계] hooks/movies/useDetail.js - 영화 상세 정보를 가져오는 커스텀 훅
 *
 * 이 훅은:
 * - 영화 ID를 받아서 상세 정보를 가져옵니다
 *
 * 실행 순서:
 * - DetailPage에서 이 훅을 사용합니다
 *
 * 다음 단계:
 *   [7-1-1-1단계] hooks/useFetch.js (공통 API 호출 로직)
 *   [7-1-1-2단계] services/tmdb/movies.js (실제 API 호출)
 *
 * @param {number} id - 영화 ID
 * @returns {Object} { data, loading, error }
 *   - data: 영화 상세 정보
 *   - loading: 로딩 중인지 여부
 *   - error: 에러가 발생했는지 여부
 *
 * 사용 예시:
 * const { data: movie, loading, error } = useDetail(123);
 */
export default function useDetail(id) {
  // useFetch 훅을 사용해서 API 호출
  // id가 바뀌면 자동으로 다시 호출됨
  const { data, loading, error } = useFetch(
    ({ signal }) => getMovieDetail(id, { signal }),
    [id], // id가 바뀌면 다시 호출
  );

  // id가 없으면 데이터도 없음
  if (!id) {
    return { data: null, loading: false, error: null };
  }

  return { data, loading, error };
}
