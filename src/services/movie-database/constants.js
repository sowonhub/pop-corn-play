export const MOVIE_API_ENDPOINTS = {
  TRENDING_MOVIES_DAY: "/trending/movie/day",
  POPULAR_MOVIES: "/movie/popular",
  SEARCH_MOVIE: "/search/movie",
  MOVIE_DETAIL: (id) => `/movie/${id}`,
  SIMILAR_MOVIES: (id) => `/movie/${id}/similar`,
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

export const EMPTY_SEARCH_RESULT = {
  results: [],
  page: 1,
  total_results: 0,
  total_pages: 0,
};
