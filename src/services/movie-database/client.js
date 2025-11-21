import { ENV } from "@/config/env";
import axios from "axios";

const DEFAULT_LANGUAGE = "ko-KR";

export const movieApiClient = axios.create({
  baseURL: ENV.VITE_DATABASE_MOVIE_API_BASE,
  headers: {
    Accept: "application/json",
  },
  params: {
    api_key: ENV.VITE_DATABASE_MOVIE_API_KEY,
    language: DEFAULT_LANGUAGE,
  },
});

movieApiClient.interceptors.request.use(
  (config) => {
    if (config.params) {
      Object.keys(config.params).forEach((key) => {
        const value = config.params[key];
        if (
          value == null ||
          (typeof value === "string" && value.trim() === "")
        ) {
          delete config.params[key];
        }
      });
    }

    const apiKey = ENV.VITE_DATABASE_MOVIE_API_KEY ?? "";
    if (!apiKey.trim()) {
      throw new Error(
        "Movie Database API key is not set. Please set VITE_DATABASE_MOVIE_API_KEY in .env file",
      );
    }

    return config;
  },
  (error) => {
    throw error;
  },
);

movieApiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      throw new Error("Network error: Unable to connect to Movie Database API");
    }
    if (error.response) {
      throw new Error(
        `Movie Database API ${error.response.status} ${error.response.statusText}`,
      );
    }
    throw error;
  },
);
