export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  MOVIE: (id = ":id") => `/movie/${id}`,
  LOGIN: "/login",
  SIGNUP: "/signup",
};
