/**
 * [7-1-1-1단계] hooks/useFetch.js - API 호출을 위한 커스텀 훅
 *
 * 이 훅은:
 * - API 호출 로직을 공통화한 훅입니다
 * - 모든 API 호출에서 사용됩니다 (useDetail, usePopular, useTop, useQuery)
 *
 * 실행 순서:
 * - useTop, useDetail, usePopular, useQuery에서 이 훅을 사용합니다
 *
 * 다음 단계:
 *   [7-1-1-2단계] services/tmdb/movies.js (실제 API 호출 함수)
 *
 * @param {Function} fetchFn - API를 호출하는 함수 (signal을 파라미터로 받음)
 * @param {Array} deps - 의존성 배열 (이 값이 바뀌면 다시 API를 호출함)
 * @returns {Object} { data, loading, error }
 *   - data: API에서 받아온 데이터
 *   - loading: 로딩 중인지 여부 (true/false)
 *   - error: 에러가 발생했는지 여부
 *
 * 사용 예시:
 * const { data, loading, error } = useFetch(
 *   ({ signal }) => getMovieDetail(id, { signal }),
 *   [id]  // id가 바뀌면 다시 호출
 * );
 */

import { useEffect, useState } from "react";

export default function useFetch(fetchFn, deps = []) {
  // 상태 관리: data(데이터), loading(로딩중?), error(에러?)
  const [data, setData] = useState(null); // 초기값: null
  const [loading, setLoading] = useState(true); // 초기값: true (처음엔 로딩중)
  const [error, setError] = useState(null); // 초기값: null

  // useEffect: 컴포넌트가 렌더링될 때 실행됨
  useEffect(() => {
    // AbortController: 요청을 취소할 수 있게 해주는 객체
    // 예: 페이지를 떠나면 이전 요청을 취소해서 불필요한 작업 방지
    const ctrl = new AbortController();

    // 로딩 시작
    setLoading(true);
    setError(null);

    // API 호출
    fetchFn({ signal: ctrl.signal })
      .then((result) => {
        // 요청이 취소되지 않았으면 데이터 저장
        if (!ctrl.signal.aborted) setData(result);
      })
      .catch((e) => {
        // 에러 발생 시 에러 저장
        if (!ctrl.signal.aborted) setError(e);
      })
      .finally(() => {
        // 성공/실패 상관없이 로딩 종료
        if (!ctrl.signal.aborted) setLoading(false);
      });

    // cleanup 함수: 컴포넌트가 사라지거나 deps가 바뀔 때 실행
    // 진행 중인 요청을 취소해서 메모리 누수 방지
    return () => ctrl.abort();
  }, deps); // deps가 바뀌면 다시 실행

  // 반환값: 다른 컴포넌트에서 사용할 수 있게 데이터, 로딩, 에러 상태를 반환
  return { data, loading, error };
}
