# 코드 실행 흐름 순서

## 1단계

src>@main.jsx
// [1단계] 앱 진입점 - React Query Provider 설정

## 2단계 전 (환경변수)

src>@config/env.js
// 환경 변수 일원화

## 2단계

src>@services/movie-database/client.js
// [2단계] HTTP 클라이언트 설정 - Axios 인스턴스 및 인터셉터 구성

## 3단계

src>@services/movie-database/movies.js
// [3단계] 서비스 레이어 - API 엔드포인트 및 호출 함수 정의

## 3-1단계 (인증)

src>@auth/context.js
// [3-1단계] 인증 Context 정의

## 3-2단계 (인증)

src>@auth/client.js
// [3-2단계] Auth Database 클라이언트 설정

## 3-3단계 (인증)

src>@auth/provider.jsx
// [3-3단계] 인증 상태를 관리하는 Provider 컴포넌트

## 4단계

src>@App.jsx
// [4단계] 앱의 메인 컴포넌트

## 4-1단계 (훅)

src>@hooks/movies/usePopularMovies.js
// [4-1단계] 인기 영화 데이터 조회 훅 - React Query로 상태 관리

## 4-2단계 (훅)

src>@hooks/movies/useTopMovies.js
// [4-2단계] 트렌딩 영화 데이터 조회 훅 - React Query로 상태 관리

## 4-3단계 (훅)

src>@hooks/movies/useMovieSearch.js
// [4-3단계] 영화 검색 데이터 조회 훅 - React Query로 상태 관리 (조건부 실행)

## 4-4단계 (훅)

src>@hooks/movies/useMovieDetail.js
// [4-4단계] 영화 상세 정보 조회 훅 - React Query로 상태 관리 (조건부 실행)

## 5-1단계 (라우터)

src>@router/paths.js
// [5-1단계] 라우트 경로 상수

## 5-2단계 (라우터)

src>@router/router.jsx
// [5-2단계] 라우터 설정

## 5-3단계 (라우터)

src>@router/RequireAuth.jsx
// [5-3단계] 인증이 필요한 페이지를 보호하는 컴포넌트

## 5-4단계 (페이지)

src>@pages/QueryPage.jsx
// [5-4단계] 검색 결과 페이지 컴포넌트 - 영화 검색 결과 표시

## 6단계 (레이아웃)

src>@components/layout/Layout.jsx
// [6단계] 레이아웃 컴포넌트

## 6-1단계 (헤더)

src>@components/layout/Header.jsx
// [6-1단계] 헤더 컴포넌트

## 6-1-1단계 (검색)

src>@components/ui/SearchInput.jsx
// [6-1-1단계] 검색 입력 컴포넌트

## 7단계 (홈페이지)

src>@pages/HomePage.jsx
// [7단계] 홈 페이지 컴포넌트

## 7-2-2단계 (카드)

src>@components/movies/Card.jsx
// [7-2-2단계] 영화 카드 컴포넌트

## 10단계 (로그인)

src>@pages/LoginPage.jsx
// [10단계] 로그인 페이지 컴포넌트

## 11단계 (회원가입)

src>@pages/SignupPage.jsx
// [11단계] 회원가입 페이지 컴포넌트
