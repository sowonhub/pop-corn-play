/**
 * [7-1-1-2-2단계] services/tmdb/movies.js - 영화 API 호출 함수들
 * 
 * 이 파일은:
 * - TMDB API를 호출하는 함수들을 정의합니다
 * - getMovieDetail: 영화 상세 정보 가져오기
 * - getPopularMovies: 인기 영화 목록 가져오기
 * - getTrendingMovies: 트렌딩 영화 가져오기
 * - searchMovies: 영화 검색
 * 
 * 실행 순서:
 * - useFetch 훅에서 이 함수들을 호출합니다
 * 
 * 다음 단계: API 호출 완료 → 데이터 반환 → 컴포넌트에 표시
 */

import { TMDB_ENDPOINTS, tmdbUrl } from "./config.js";

// 영화 상세 정보 가져오기
export async function getMovieDetail(id, { signal } = {}) {
  const url = tmdbUrl(TMDB_ENDPOINTS.MOVIE_DETAIL(id), { language: "ko-KR" });
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`TMDB ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getPopularMovies(page = 1, { signal } = {}) {
  const url = tmdbUrl(TMDB_ENDPOINTS.POPULAR_MOVIES, {
    language: "ko-KR",
    page,
  });
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`TMDB ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getTrendingMovies({ signal } = {}) {
  const url = tmdbUrl(TMDB_ENDPOINTS.TRENDING_MOVIES_DAY, {
    language: "ko-KR",
  });
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`TMDB ${res.status} ${res.statusText}`);
  return res.json();
}

export async function searchMovies(query, page = 1, { signal } = {}) {
  const q = String(query ?? "")
    .replace(/^"|"$/g, "")
    .trim();
  if (!q) return { results: [], page: 1, total_results: 0, total_pages: 0 };
  const url = tmdbUrl(TMDB_ENDPOINTS.SEARCH_MOVIE, {
    query: q,
    page,
    include_adult: false,
    language: "ko-KR",
  });
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`TMDB ${res.status} ${res.statusText}`);
  return res.json();
}

