// [2단계] HTTP 클라이언트 설정 - Axios 인스턴스 및 인터셉터 구성
// 클라이언트(Client): 서버와 통신하기 위한 도구/객체
// - API 서버에 요청을 보내고 응답을 받는 역할
// - 설정(baseURL, 헤더, 파라미터)을 미리 구성하여 재사용 가능하게 만듦
import { ENV } from "@/config/env";
import axios from "axios";

const DEFAULT_LANGUAGE = "ko-KR";

// [2-1] Axios 인스턴스 생성 (baseURL, 기본 헤더, 공통 파라미터 설정)
// movieApiClient: 영화 API 서버와 통신하기 위한 클라이언트 객체
// baseURL: API 서버의 기본 주소 (예: "https://api.themoviedb.org/3")
// 엔드포인트: baseURL 뒤에 붙는 경로 (예: "/movie/popular")
// 최종 API URL = baseURL + 엔드포인트
// 예: "https://api.themoviedb.org/3" + "/movie/popular" = "https://api.themoviedb.org/3/movie/popular"
export const movieApiClient = axios.create({
  baseURL: ENV.MOVIE_DATABASE_API.API_BASE,
  headers: {
    Accept: "application/json",
  },
  params: {
    api_key: ENV.MOVIE_DATABASE_API.API_KEY,
    language: DEFAULT_LANGUAGE,
  },
});

// [2-2] 요청 인터셉터 - 빈 값 파라미터 자동 제거 및 placeholder 값 체크
movieApiClient.interceptors.request.use(
  (config) => {
    if (config.params) {
      Object.keys(config.params).forEach((key) => {
        const value = config.params[key];
        if (value == null || (typeof value === "string" && value.trim() === "")) {
          delete config.params[key];
        }
      });
    }

    // 개발 모드에서 placeholder 값이면 요청을 차단
    const isDev = import.meta.env.DEV;
    const apiKey = ENV.MOVIE_DATABASE_API.API_KEY;
    if (
      isDev &&
      (apiKey.includes("your_") || !apiKey || apiKey.trim() === "")
    ) {
      return Promise.reject(
        new Error(
          "Movie Database API key is not set. Please set VITE_MOVIE_DATABASE_API_KEY in .env file",
        ),
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// [2-3] 응답 인터셉터 - 에러 처리 및 데이터 추출
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
