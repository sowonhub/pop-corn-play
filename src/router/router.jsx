/**
 * [5-2단계] router/router.jsx - 라우터 설정
 * 
 * URL 경로에 따라 어떤 페이지를 보여줄지 정의합니다.
 * 
 * 실행 순서:
 * - App.jsx에서 이 router를 사용합니다
 * - URL이 "/"이면 HomePage를 보여줍니다
 * 
 * 예시:
 * - "/" → HomePage (홈) → [6단계] Layout → [7단계] HomePage
 * - "/search?keyword=영화" → QueryPage (검색 결과)
 * - "/movie/123" → DetailPage (영화 상세, 123은 영화 ID)
 * - "/login" → LoginPage (로그인)
 * - "/signup" → SignupPage (회원가입)
 * - "/mypage" → RequireAuth로 보호된 마이페이지 (로그인 필요)
 * - 그 외 모든 경로 → 404 페이지
 * 
 * 다음 단계: [5-3단계] router/RequireAuth.jsx (필요시)
 */

import { createBrowserRouter } from "react-router-dom";

import { Layout } from "@/components/layout";
import DetailPage from "@/pages/DetailPage.jsx";
import HomePage from "@/pages/HomePage.jsx";
import LoginPage from "@/pages/LoginPage.jsx";
import QueryPage from "@/pages/QueryPage.jsx";
import SignupPage from "@/pages/SignupPage.jsx";
import RequireAuth from "./RequireAuth.jsx";
export const router = createBrowserRouter([
  {
    // Layout: 모든 페이지에 공통으로 적용되는 레이아웃 (Header 포함)
    element: <Layout />,
    children: [
      // index: true → "/" 경로 (홈)
      { index: true, element: <HomePage /> },
      
      // "/search" → 검색 결과 페이지
      { path: "search", element: <QueryPage /> },
      
      // "/movie/:id" → 영화 상세 페이지 (:id는 동적 파라미터)
      // 예: /movie/123 → id = 123
      { path: "movie/:id", element: <DetailPage /> },
      
      // "/login" → 로그인 페이지
      { path: "login", element: <LoginPage /> },
      
      // "/signup" → 회원가입 페이지
      { path: "signup", element: <SignupPage /> },
      
      // "/mypage" → 마이페이지 (로그인 필요)
      // RequireAuth: 로그인하지 않으면 로그인 페이지로 리다이렉트
      {
        path: "mypage",
        element: (
          <RequireAuth>
            <div className="p-6">마이페이지</div>
          </RequireAuth>
        ),
      },
      
      // "*" → 위에 정의된 경로가 아닌 모든 경로 (404 페이지)
      {
        path: "*",
        element: <div className="p-6">페이지를 찾을 수 없어요.</div>,
      },
    ],
  },
]);

