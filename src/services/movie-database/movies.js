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

const DEFAULT_LANGUAGE = "ko-KR";
const DEFAULT_ACCEPT_HEADER = "application/json";

export const EMPTY_SEARCH_RESULT = {
  results: [],
  page: 1,
  total_results: 0,
  total_pages: 0,
};

export function buildMovieApiUrl(path, params = {}) {
  const url = new URL(`${MOVIE_API_CONFIG.BASE}${path}`);
  url.searchParams.set("api_key", MOVIE_API_CONFIG.KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value == null) return;
    const stringValue =
      typeof value === "string" ? value.trim() : String(value);
    if (stringValue !== "") url.searchParams.set(key, stringValue);
  });
  return url.toString();
}

export function getMovieImageUrl(path, type = "poster", size) {
  if (!path) return MOVIE_IMAGE_CONFIG.NO_IMAGE;
  if (/^https?:\/\//.test(path)) return path;
  const imageSize =
    size || MOVIE_IMAGE_CONFIG.SIZE[type] || MOVIE_IMAGE_CONFIG.SIZE.poster;
  return `${MOVIE_IMAGE_CONFIG.BASE}${imageSize}${path}`;
}

async function fetchMovieApi(path, params = {}, { signal } = {}) {
  try {
    const url = buildMovieApiUrl(path, {
      ...params,
      language: params.language ?? DEFAULT_LANGUAGE,
    });
    const res = await fetch(url, {
      signal,
      headers: { Accept: DEFAULT_ACCEPT_HEADER },
    });
    if (!res.ok) {
      throw new Error(`Movie Database API ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }
    if (error instanceof TypeError) {
      throw new Error("Network error: Unable to connect to Movie Database API");
    }
    throw error;
  }
}

// [7-1-1-2-2단계] 영화 API 호출 함수들

export async function getMovieDetail(id, { signal } = {}) {
  return fetchMovieApi(MOVIE_API_ENDPOINTS.MOVIE_DETAIL(id), {}, { signal });
}

export async function getPopularMovies(page = 1, { signal } = {}) {
  return fetchMovieApi(
    MOVIE_API_ENDPOINTS.POPULAR_MOVIES,
    { page },
    { signal },
  );
}

export async function getTopMovies({ signal } = {}) {
  return fetchMovieApi(MOVIE_API_ENDPOINTS.TRENDING_MOVIES_DAY, {}, { signal });
}

export async function getMovieSearch(query, page = 1, { signal } = {}) {
  const trimmedQuery = String(query ?? "").trim();
  if (!trimmedQuery) {
    return EMPTY_SEARCH_RESULT;
  }
  return fetchMovieApi(
    MOVIE_API_ENDPOINTS.SEARCH_MOVIE,
    { query: trimmedQuery, page, include_adult: false },
    { signal },
  );
}
