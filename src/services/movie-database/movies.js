// [7-1-1-2-2단계] 영화 API 호출 함수들
import { MOVIE_API_ENDPOINTS, buildMovieApiUrl } from "./config.js";

export async function getMovieDetail(id, { signal } = {}) {
  const url = buildMovieApiUrl(MOVIE_API_ENDPOINTS.MOVIE_DETAIL(id), {
    language: "ko-KR",
  });
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok)
    throw new Error(`Movie Database API ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getPopularMovies(page = 1, { signal } = {}) {
  const url = buildMovieApiUrl(MOVIE_API_ENDPOINTS.POPULAR_MOVIES, {
    language: "ko-KR",
    page,
  });
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok)
    throw new Error(`Movie Database API ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getTrendingMovies({ signal } = {}) {
  const url = buildMovieApiUrl(MOVIE_API_ENDPOINTS.TRENDING_MOVIES_DAY, {
    language: "ko-KR",
  });
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok)
    throw new Error(`Movie Database API ${res.status} ${res.statusText}`);
  return res.json();
}

export async function searchMovies(query, page = 1, { signal } = {}) {
  const q = String(query ?? "")
    .replace(/^"|"$/g, "")
    .trim();
  if (!q) return { results: [], page: 1, total_results: 0, total_pages: 0 };
  const url = buildMovieApiUrl(MOVIE_API_ENDPOINTS.SEARCH_MOVIE, {
    query: q,
    page,
    include_adult: false,
    language: "ko-KR",
  });
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok)
    throw new Error(`Movie Database API ${res.status} ${res.statusText}`);
  return res.json();
}
