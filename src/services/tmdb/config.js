/**
 * [7-1-1-2-1단계] services/tmdb/config.js - TMDB API 설정 및 유틸리티
 * 
 * 이 파일은:
 * 1. TMDB API 설정 (URL, 키 등)
 * 2. API 엔드포인트 정의
 * 3. 이미지 URL 생성 함수
 * 4. API URL 생성 함수
 * 
 * 실행 순서:
 * - movies.js에서 이 설정을 사용합니다
 * 
 * 다음 단계: [7-1-1-2-2단계] services/tmdb/movies.js
 */

// TMDB API 설정
export const TMDB_API = {
  BASE: import.meta.env.VITE_TMDB_API_BASE,
  KEY: import.meta.env.VITE_TMDB_API_KEY,
  TOKEN: import.meta.env.VITE_TMDB_ACCESS_TOKEN,
};

// API 엔드포인트 (경로)
export const TMDB_ENDPOINTS = {
  TRENDING_MOVIES_DAY: "/trending/movie/day",
  POPULAR_MOVIES: "/movie/popular",
  SEARCH_MOVIE: "/search/movie",
  MOVIE_DETAIL: (id) => `/movie/${id}`,
};

// 이미지 URL 설정
export const TMDB_IMG_SRC = {
  BASE: "https://image.tmdb.org/t/p/",
  SIZE: {
    poster: "w342",
    backdrop: "w1280",
    thumb: "w185",
    original: "original",
  },
  NO_IMAGE: "/no-image.png",
};

// API URL 생성 함수
export function tmdbUrl(path, params = {}) {
  const url = new URL(`${TMDB_API.BASE}${path}`);
  url.searchParams.set("api_key", TMDB_API.KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v == null) return;
    let s = typeof v === "string" ? v.replace(/^"|"$/g, "").trim() : String(v);
    if (s !== "") url.searchParams.set(k, s);
  });
  return url.toString();
}

// 이미지 URL 생성 함수
export function tmdbImgSrc(path, type = "poster", size) {
  if (!path) return TMDB_IMG_SRC.NO_IMAGE;
  if (/^https?:\/\//.test(path)) return path;
  const s = size || TMDB_IMG_SRC.SIZE[type] || TMDB_IMG_SRC.SIZE.poster;
  return `${TMDB_IMG_SRC.BASE}${s}${path}`;
}

