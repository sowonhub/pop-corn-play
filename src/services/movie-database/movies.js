import { movieApiClient } from "@/services/movie-database/client";
import {
  MOVIE_API_ENDPOINTS,
  MOVIE_IMAGE_CONFIG,
  EMPTY_SEARCH_RESULT,
  HTTP_URL_PATTERN,
} from "@/services/movie-database/constants";

export { MOVIE_API_ENDPOINTS, MOVIE_IMAGE_CONFIG, EMPTY_SEARCH_RESULT };

export function getMovieImageUrl(path, type = "poster", size) {
  const hasNoPath = !path;
  if (hasNoPath) return MOVIE_IMAGE_CONFIG.NO_IMAGE;

  const isExternalUrl = HTTP_URL_PATTERN.test(path);
  if (isExternalUrl) return path;

  const hasCustomSize = size != null;
  const hasValidTypeSize = MOVIE_IMAGE_CONFIG.SIZE[type] != null;
  const imageSize = hasCustomSize
    ? size
    : hasValidTypeSize
      ? MOVIE_IMAGE_CONFIG.SIZE[type]
      : MOVIE_IMAGE_CONFIG.SIZE.poster;

  return `${MOVIE_IMAGE_CONFIG.BASE}${imageSize}${path}`;
}

const DEFAULT_MOVIE_DETAIL_APPEND = "videos,images";

export async function getMovieDetail(
  id,
  { signal, appendToResponse = DEFAULT_MOVIE_DETAIL_APPEND } = {},
) {
  return movieApiClient.get(MOVIE_API_ENDPOINTS.MOVIE_DETAIL(id), {
    params: {
      append_to_response: appendToResponse,
      include_image_language: "ko,null,en",
    },
    signal,
  });
}

export async function getPopularMovies(page = 1, { signal } = {}) {
  return movieApiClient.get(MOVIE_API_ENDPOINTS.POPULAR_MOVIES, {
    params: { page },
    signal,
  });
}

export async function getTopMovies({ signal } = {}) {
  return movieApiClient.get(MOVIE_API_ENDPOINTS.TRENDING_MOVIES_DAY, {
    signal,
  });
}

export async function getMovieSearch(searchKeyword, page = 1, { signal } = {}) {
  const trimmedKeyword = String(searchKeyword ?? "").trim();
  if (!trimmedKeyword) {
    return EMPTY_SEARCH_RESULT;
  }
  return movieApiClient.get(MOVIE_API_ENDPOINTS.SEARCH_MOVIE, {
    params: {
      query: trimmedKeyword,
      page,
      include_adult: false,
      language: "ko-KR",
    },
    signal,
  });
}

export async function getSimilarMovies(id, { signal } = {}) {
  return movieApiClient.get(MOVIE_API_ENDPOINTS.SIMILAR_MOVIES(id), {
    signal,
  });
}
