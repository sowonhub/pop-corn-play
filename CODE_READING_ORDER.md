# 📖 코드 읽기 순서 가이드

브라우저에서 앱이 실행되는 순서대로 파일을 읽는 가이드입니다.

## 기본 흐름 (앱 시작)

### [1단계] index.html
- 브라우저가 가장 먼저 로드하는 파일
- `<div id="root">`에 React 앱을 그립니다
- `main.jsx`를 실행합니다

### [2단계] src/main.jsx
- 앱의 진입점 (Entry Point)
- CSS 스타일 로드
- React 초기화
- AuthProvider와 App 렌더링

### [3-1단계] src/auth/context.js
- 인증 Context 정의
- Context를 생성하고 useAuth 훅 제공

### [3-2단계] src/auth/supabase.js
- Supabase 클라이언트 설정
- 환경 변수에서 설정 가져오기
- Supabase 클라이언트 생성

### [3-3단계] src/auth/provider.jsx
- 인증 상태를 관리하는 Provider 컴포넌트
- 로그인 상태 관리
- 로그인/회원가입/로그아웃 기능 제공

### [4단계] src/App.jsx
- 앱의 메인 컴포넌트
- RouterProvider를 사용해서 라우팅 처리

### [5-1단계] src/router/paths.js
- 라우트 경로 상수 정의
- ROUTES 객체로 경로 관리

### [5-2단계] src/router/router.jsx
- 라우터 설정
- URL 경로에 따라 어떤 페이지를 보여줄지 정의

### [5-3단계] src/router/RequireAuth.jsx
- 인증이 필요한 페이지를 보호하는 컴포넌트
- 로그인하지 않았으면 로그인 페이지로 리다이렉트

### [6단계] src/components/layout/Layout.jsx
- 모든 페이지에 공통으로 적용되는 레이아웃
- Header와 Outlet 포함

### [6-1단계] src/components/layout/Header.jsx
- 모든 페이지 상단에 표시되는 헤더
- 로고, 검색창, 로그인/로그아웃 버튼

### [6-1-1단계] src/components/ui/SearchInput.jsx
- 검색 입력 컴포넌트
- 검색어 입력 및 검색 결과 페이지로 이동

## 홈 페이지 흐름

### [7단계] src/pages/HomePage.jsx
- 홈 페이지 컴포넌트
- Top 10 영화 배너와 인기 영화 목록 표시

### [7-1단계] src/components/movies/TopBanner.jsx
- Top 10 영화 배너 컴포넌트
- 인기 영화 10개를 가져와서 자동 슬라이드

### [7-1-1단계] src/hooks/movies/useTop.js
- 인기 영화 데이터를 가져오는 커스텀 훅
- TMDB API에서 인기 영화 가져오기
- 상위 10개만 반환

### [7-1-1-1단계] src/hooks/useFetch.js
- API 호출을 위한 커스텀 훅
- 모든 API 호출에서 사용되는 공통 로직
- data, loading, error 상태 관리

### [7-1-1-2-1단계] src/services/tmdb/config.js
- TMDB API 설정 및 유틸리티
- API URL 생성 함수
- 이미지 URL 생성 함수

### [7-1-1-2-2단계] src/services/tmdb/movies.js
- 영화 API 호출 함수들
- getMovieDetail, getPopularMovies, getTrendingMovies, searchMovies

### [7-2단계] src/components/ui/Grid.jsx
- 영화 그리드 컴포넌트
- 인기 영화 목록을 그리드 형태로 표시

### [7-2-1단계] src/hooks/movies/usePopular.js
- 인기 영화 데이터를 가져오는 커스텀 훅
- TMDB API에서 인기 영화 목록 가져오기

### [7-2-2단계] src/components/movies/Card.jsx
- 영화 카드 컴포넌트
- 영화 정보를 카드 형태로 표시
- 클릭하면 상세 페이지로 이동

## 영화 상세 페이지 흐름

### [8단계] src/pages/DetailPage.jsx
- 영화 상세 페이지 컴포넌트
- URL에서 영화 ID를 가져와서 상세 정보 표시

### [8-1단계] src/hooks/movies/useDetail.js
- 영화 상세 정보를 가져오는 커스텀 훅
- 영화 ID를 받아서 상세 정보 가져오기
- → [7-1-1-1단계] useFetch.js 사용
- → [7-1-1-2-2단계] services/tmdb/movies.js 사용

## 검색 페이지 흐름

### [9단계] src/pages/QueryPage.jsx
- 검색 결과 페이지 컴포넌트
- URL에서 검색어를 가져와서 검색 결과 표시

### [9-1단계] src/hooks/movies/useQuery.js
- 검색 결과를 가져오는 커스텀 훅
- 검색어를 받아서 검색 결과 가져오기
- → [7-1-1-1단계] useFetch.js 사용
- → [7-1-1-2-2단계] services/tmdb/movies.js 사용

## 인증 페이지 흐름

### [10단계] src/pages/LoginPage.jsx
- 로그인 페이지 컴포넌트
- 이메일과 비밀번호 입력받아 로그인

### [11단계] src/pages/SignupPage.jsx
- 회원가입 페이지 컴포넌트
- 회원가입 정보 입력받아 가입

## 요약: 핵심 순서

```
1. index.html
2. main.jsx
3. auth/context.js → auth/supabase.js → auth/provider.jsx
4. App.jsx
5. router/paths.js → router/router.jsx → router/RequireAuth.jsx
6. components/layout/Layout.jsx → components/layout/Header.jsx
7. pages/HomePage.jsx
   ├─ components/movies/TopBanner.jsx
   │  └─ hooks/movies/useTop.js
   │     └─ hooks/useFetch.js
   │        └─ services/tmdb/config.js → services/tmdb/movies.js
   └─ components/ui/Grid.jsx
      └─ hooks/movies/usePopular.js
         └─ hooks/useFetch.js (동일)
      └─ components/movies/Card.jsx
8. pages/DetailPage.jsx
   └─ hooks/movies/useDetail.js
      └─ hooks/useFetch.js (동일)
```

## 파일 목록 (1단계 ~ 8-1단계)

1. `index.html`
2. `src/main.jsx`
3. `src/auth/context.js`
4. `src/auth/supabase.js`
5. `src/auth/provider.jsx`
6. `src/App.jsx`
7. `src/router/paths.js`
8. `src/router/router.jsx`
9. `src/router/RequireAuth.jsx`
10. `src/components/layout/Layout.jsx`
11. `src/components/layout/Header.jsx`
12. `src/components/ui/SearchInput.jsx`
13. `src/pages/HomePage.jsx`
14. `src/components/movies/TopBanner.jsx`
15. `src/hooks/movies/useTop.js`
16. `src/hooks/useFetch.js` ⭐ [7-1-1-1단계]
17. `src/services/tmdb/config.js`
18. `src/services/tmdb/movies.js`
19. `src/components/ui/Grid.jsx`
20. `src/hooks/movies/usePopular.js`
21. `src/components/movies/Card.jsx`
22. `src/pages/DetailPage.jsx`
23. `src/hooks/movies/useDetail.js` ⭐ [8-1단계]

## 팁

- 번호가 작을수록 먼저 실행됩니다
- 같은 번호 그룹(예: 7-1-1-1)은 같은 레벨의 파일들입니다
- 화살표(→)는 다음에 읽을 파일을 의미합니다
- ⭐ 표시는 중요한 단계입니다

