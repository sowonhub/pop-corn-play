export const TMDB_API = {
  BASE: import.meta.env.VITE_TMDB_API_BASE,
  KEY: import.meta.env.VITE_TMDB_API_KEY,
  TOKEN: import.meta.env.VITE_TMDB_ACCESS_TOKEN,
};

export const TMDB_ENDPOINTS = {
  TRENDING_MOVIES_DAY: "/trending/movie/day",
  SEARCH_MOVIE: "/search/movie",
  MOVIE_DETAIL: (id) => `/movie/${id}`,
};

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

export function tmdbImgSrc(path, type = "poster", size) {
  if (!path) return TMDB_IMG_SRC.NO_IMAGE;
  if (/^https?:\/\//.test(path)) return path;
  const s = size || TMDB_IMG_SRC.SIZE[type] || TMDB_IMG_SRC.SIZE.poster;
  return `${TMDB_IMG_SRC.BASE}${s}${path}`;
}
