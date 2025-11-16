import { movieApiClient } from "./client.js";

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

const HTTP_URL_PATTERN = /^https?:\/\//;

export const EMPTY_SEARCH_RESULT = {
  results: [],
  page: 1,
  total_results: 0,
  total_pages: 0,
};

export function getMovieImageUrl(path, type = "poster", size) {
  const hasNoPath = !path;
  if (hasNoPath) return MOVIE_IMAGE_CONFIG.NO_IMAGE;

  const isExternalUrl = HTTP_URL_PATTERN.test(path);
  if (isExternalUrl) return path;

  const hasCustomSize = size != null;
  const hasValidTypeSize = MOVIE_IMAGE_CONFIG.SIZE[type] != null;
  const imageSize = hasCustomSize
    ? size
    : hasValidTypeSize
      ? MOVIE_IMAGE_CONFIG.SIZE[type]
      : MOVIE_IMAGE_CONFIG.SIZE.poster;

  return `${MOVIE_IMAGE_CONFIG.BASE}${imageSize}${path}`;
}

export async function getMovieDetail(id, { signal } = {}) {
  return movieApiClient.get(MOVIE_API_ENDPOINTS.MOVIE_DETAIL(id), {
    signal,
  });
}

export async function getPopularMovies(page = 1, { signal } = {}) {
  return movieApiClient.get(MOVIE_API_ENDPOINTS.POPULAR_MOVIES, {
    params: { page },
    signal,
  });
}

export async function getTopMovies({ signal } = {}) {
  return movieApiClient.get(MOVIE_API_ENDPOINTS.TRENDING_MOVIES_DAY, {
    signal,
  });
}

export async function getMovieSearch(searchKeyword, page = 1, { signal } = {}) {
  const trimmedKeyword = String(searchKeyword ?? "").trim();
  if (!trimmedKeyword) {
    return EMPTY_SEARCH_RESULT;
  }
  return movieApiClient.get(MOVIE_API_ENDPOINTS.SEARCH_MOVIE, {
    params: {
      query: trimmedKeyword,
      page,
      include_adult: false,
    },
    signal,
  });
}
