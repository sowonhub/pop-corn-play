// 환경 변수 일원화
export const ENV = {
  MOVIE_DATABASE_API: {
    // Movie Database API 기본 URL
    API_BASE: import.meta.env.VITE_MOVIE_DATABASE_API_BASE,
    // Movie Database API 키
    API_KEY: import.meta.env.VITE_MOVIE_DATABASE_API_KEY,
  },
  AUTH_DATABASE: {
    // Auth Database 서비스 URL
    URL: import.meta.env.VITE_AUTH_DATABASE_URL,
    // Auth Database 익명 키
    ANON_KEY: import.meta.env.VITE_AUTH_DATABASE_ANON_KEY,
  },
};

if (!ENV.MOVIE_DATABASE_API.API_BASE || !ENV.MOVIE_DATABASE_API.API_KEY) {
  throw new Error("Missing Movie Database API environment variables");
}

if (!ENV.AUTH_DATABASE.URL || !ENV.AUTH_DATABASE.ANON_KEY) {
  throw new Error("Missing Auth Database environment variables");
}
