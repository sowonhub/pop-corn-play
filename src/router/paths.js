// [5-1단계] 라우트 경로 상수
export const PATHS = {
  HOME: "/",
  SEARCH: "/search",
  MOVIE: (id = ":id") => `/movie/${id}`,
  LOGIN: "/login",
  SIGNUP: "/signup",
};
