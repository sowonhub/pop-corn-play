export const ENV = {
  VITE_DATABASE_MOVIE_API_BASE: import.meta.env.VITE_DATABASE_MOVIE_API_BASE,
  VITE_DATABASE_MOVIE_API_KEY: import.meta.env.VITE_DATABASE_MOVIE_API_KEY,
  VITE_DATABASE_AUTH_URL: import.meta.env.VITE_DATABASE_AUTH_URL,
  VITE_DATABASE_AUTH_ANON_KEY: import.meta.env.VITE_DATABASE_AUTH_ANON_KEY,
};

if (!ENV.VITE_DATABASE_MOVIE_API_BASE || !ENV.VITE_DATABASE_MOVIE_API_KEY) {
  throw new Error(
    "Movie Database API environment variables must be set with actual values",
  );
}

if (!ENV.VITE_DATABASE_AUTH_URL || !ENV.VITE_DATABASE_AUTH_ANON_KEY) {
  throw new Error(
    "Auth Database environment variables must be set with actual values",
  );
}
