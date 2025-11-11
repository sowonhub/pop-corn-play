/**
 * [6단계] components/layout/Layout.jsx - 레이아웃 컴포넌트
 * 
 * 모든 페이지에 공통으로 적용되는 레이아웃입니다.
 * - Header: 상단 헤더 (검색창, 로그인 버튼 등)
 * - Outlet: 실제 페이지 내용이 들어갈 자리
 * 
 * 실행 순서:
 * - router.jsx에서 모든 페이지를 Layout으로 감쌉니다
 * 
 * 다음 단계: [6-1단계] components/layout/Header.jsx
 *           [7단계] pages/HomePage.jsx (또는 다른 페이지)
 */

import { Header } from "@/components/layout";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        <Outlet />
      </main>
    </div>
  );
}
