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

// 환경 변수 검증
const isDev = import.meta.env.DEV;

if (!ENV.MOVIE_DATABASE_API.API_BASE || !ENV.MOVIE_DATABASE_API.API_KEY) {
  throw new Error(
    "Missing Movie Database API environment variables. Please set VITE_MOVIE_DATABASE_API_BASE and VITE_MOVIE_DATABASE_API_KEY in .env file",
  );
}

if (
  ENV.MOVIE_DATABASE_API.API_KEY.includes("your_") ||
  ENV.MOVIE_DATABASE_API.API_BASE.includes("your_")
) {
  if (!isDev) {
    throw new Error(
      "Movie Database API environment variables must be set with actual values (not placeholders)",
    );
  }
}

if (!ENV.AUTH_DATABASE.URL || !ENV.AUTH_DATABASE.ANON_KEY) {
  throw new Error(
    "Missing Auth Database environment variables. Please set VITE_AUTH_DATABASE_URL and VITE_AUTH_DATABASE_ANON_KEY in .env file",
  );
}

if (
  ENV.AUTH_DATABASE.URL.includes("your_") ||
  ENV.AUTH_DATABASE.ANON_KEY.includes("your_")
) {
  if (!isDev) {
    throw new Error(
      "Auth Database environment variables must be set with actual values (not placeholders)",
    );
  }
}
