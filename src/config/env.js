export const ENV = {
  MOVIE_DATABASE_API: {
    API_BASE: import.meta.env.VITE_MOVIE_DATABASE_API_BASE,
    API_KEY: import.meta.env.VITE_MOVIE_DATABASE_API_KEY,
  },
  AUTH_DATABASE: {
    URL: import.meta.env.VITE_AUTH_DATABASE_URL,
    ANON_KEY: import.meta.env.VITE_AUTH_DATABASE_ANON_KEY,
  },
};
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
