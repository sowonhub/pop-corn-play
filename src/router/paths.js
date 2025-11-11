/**
 * [5-1단계] router/paths.js - 라우트 경로 상수
 * 
 * 라우트 경로를 상수로 정의해서 실수를 방지합니다.
 * 예: ROUTES.MOVIE(123) → "/movie/123"
 * 
 * 다음 단계: [5-2단계] router/router.jsx
 */

export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  MOVIE: (id = ":id") => `/movie/${id}`,
  LOGIN: "/login",
  SIGNUP: "/signup",
};

