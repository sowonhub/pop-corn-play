// TMDB REST 엔드포인트
export const TMDB = {
  TRENDING_MOVIES_DAY: "/trending/movie/day",
  SEARCH_MOVIE: "/search/movie",
  MOVIE_DETAIL: (id = ":id") => `/movie/${id}`,
};

// 라우트 경로(필요 시)
// export const ROUTES = {
//   HOME: "/",
//   SEARCH: "/search",
//   MOVIE: (id = ":id") => `/movie/${id}`,
//   LOGIN: "/login",
//   SIGNUP: "/signup",
// };
