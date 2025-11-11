/**
 * [4단계] App.jsx - 앱의 메인 컴포넌트
 * 
 * 이 컴포넌트는:
 * - RouterProvider를 사용해서 라우팅(페이지 이동)을 처리합니다
 * - router.jsx에 정의된 경로에 따라 다른 페이지를 보여줍니다
 * 
 * 실행 순서:
 * - AuthProvider 안에서 실행됩니다
 * - URL에 따라 다른 페이지를 보여줍니다
 * 
 * 다음 단계: [5단계] router/router.jsx
 */

// React Router에서 RouterProvider 가져오기
import { RouterProvider } from "react-router-dom";

// 우리가 만든 라우터 설정 가져오기
import { router } from "@/router";
export default function App() {
  return <RouterProvider router={router} />;
}

