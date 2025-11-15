// [3단계] 서비스 레이어 - API 엔드포인트 및 호출 함수 정의
import { movieApiClient } from "./client.js";

// [3-1] API 엔드포인트 상수 (baseURL 뒤에 붙는 경로 부분)
// 엔드포인트 = baseURL 뒤에 붙는 경로 (전체 URL에서 baseURL을 제외한 나머지)
// 예시:
//   baseURL: "https://api.themoviedb.org/3"
//   엔드포인트: "/movie/popular"
//   최종 URL: "https://api.themoviedb.org/3/movie/popular"
export const MOVIE_API_ENDPOINTS = {
  TRENDING_MOVIES_DAY: "/trending/movie/day",
  POPULAR_MOVIES: "/movie/popular",
  SEARCH_MOVIE: "/search/movie",
  MOVIE_DETAIL: (id) => `/movie/${id}`,
};

// [3-2] 이미지 URL 설정 상수 (완전한 URL 주소)
// API와 달리 이미지는 정적 리소스이므로 완전한 URL을 사용
export const MOVIE_IMAGE_CONFIG = {
  BASE: "https://image.tmdb.org/t/p/", // 이미지 서버의 완전한 URL
  SIZE: {
    poster: "w342",
    backdrop: "w1280",
    thumb: "w185",
    original: "original",
  },
  NO_IMAGE: "/no-image.png",
};

const HTTP_URL_PATTERN = /^https?:\/\//;

// [3-3] 빈 검색 결과 상수
export const EMPTY_SEARCH_RESULT = {
  results: [],
  page: 1,
  total_results: 0,
  total_pages: 0,
};

// [3-4] 영화 이미지 URL 생성 함수 (완전한 URL 반환)
// API 엔드포인트와 달리 이미지는 브라우저에서 직접 접근하는 URL이므로 완전한 주소 필요
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

// [3-5] 영화 상세 정보 조회 API
export async function getMovieDetail(id, { signal } = {}) {
  return movieApiClient.get(MOVIE_API_ENDPOINTS.MOVIE_DETAIL(id), {
    signal,
  });
}

// [3-6] 인기 영화 목록 조회 API
export async function getPopularMovies(page = 1, { signal } = {}) {
  return movieApiClient.get(MOVIE_API_ENDPOINTS.POPULAR_MOVIES, {
    params: { page },
    signal,
  });
}

// [3-7] 트렌딩 영화 목록 조회 API
export async function getTopMovies({ signal } = {}) {
  return movieApiClient.get(MOVIE_API_ENDPOINTS.TRENDING_MOVIES_DAY, {
    signal,
  });
}

// [3-8] 영화 검색 API
export async function getMovieSearch(searchKeyword, page = 1, { signal } = {}) {
  const trimmedKeyword = String(searchKeyword ?? "").trim();
  if (!trimmedKeyword) {
    return EMPTY_SEARCH_RESULT;
  }
  return movieApiClient.get(MOVIE_API_ENDPOINTS.SEARCH_MOVIE, {
    params: {
      query: trimmedKeyword, // API 파라미터명은 'query'이지만 함수 파라미터는 'searchKeyword'로 명확히 구분
      page,
      include_adult: false,
    },
    signal,
  });
}
