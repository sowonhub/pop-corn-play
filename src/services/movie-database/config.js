// [7-1-1-2-1단계] Movie Database API 설정 및 유틸리티
import { ENV } from "@/config/env";

export const MOVIE_API_CONFIG = {
  BASE: ENV.MOVIE_DATABASE_API.API_BASE,
  KEY: ENV.MOVIE_DATABASE_API.API_KEY,
};

export const MOVIE_API_ENDPOINTS = {
  TRENDING_MOVIES_DAY: "/trending/movie/day",
  POPULAR_MOVIES: "/movie/popular",
  SEARCH_MOVIE: "/search/movie",
  MOVIE_DETAIL: (id) => `/movie/${id}`,
};

// Movie Database 이미지 서버 설정
// 참고: BASE URL은 Movie Database API의 공식 이미지 CDN입니다
// 실제 API 서버 도메인이므로 URL 자체는 변경할 수 없습니다
export const MOVIE_IMAGE_CONFIG = {
  BASE: "https://image.tmdb.org/t/p/",
  SIZE: {
    poster: "w342",
    backdrop: "w1280",
    thumb: "w185",
    original: "original",
  },
  NO_IMAGE: "/no-image.png",
};

export function buildMovieApiUrl(path, params = {}) {
  const url = new URL(`${MOVIE_API_CONFIG.BASE}${path}`);
  url.searchParams.set("api_key", MOVIE_API_CONFIG.KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v == null) return;
    let s = typeof v === "string" ? v.replace(/^"|"$/g, "").trim() : String(v);
    if (s !== "") url.searchParams.set(k, s);
  });
  return url.toString();
}

export function getMovieImageUrl(path, type = "poster", size) {
  if (!path) return MOVIE_IMAGE_CONFIG.NO_IMAGE;
  if (/^https?:\/\//.test(path)) return path;
  const s =
    size || MOVIE_IMAGE_CONFIG.SIZE[type] || MOVIE_IMAGE_CONFIG.SIZE.poster;
  return `${MOVIE_IMAGE_CONFIG.BASE}${s}${path}`;
}
