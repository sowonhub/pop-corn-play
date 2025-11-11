/**
 * [6-1단계] components/layout/Header.jsx - 헤더 컴포넌트
 * 
 * 모든 페이지 상단에 표시되는 헤더입니다.
 * - 로고
 * - 검색창
 * - 로그인/로그아웃 버튼
 * 
 * 실행 순서:
 * - Layout 컴포넌트에서 실행됩니다
 * 
 * 다음 단계: [7단계] pages/HomePage.jsx (또는 다른 페이지)
 */

import { Link } from "react-router-dom";

import { useAuth } from "@/auth";
import { Container, SearchInput } from "@/components/ui/index.js";
import { ROUTES } from "@/router";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/80 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/70">
      <Container className="px-4">
        <div className="flex h-12 items-center justify-between gap-3 sm:h-14">
          <Link
            to="/"
            className="shrink-0 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
          >
            🎬 Mini Movies
          </Link>

          <div className="hidden max-w-xl flex-1 sm:block">
            <SearchInput />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-40 sm:hidden">
              <SearchInput compact />
            </div>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden text-sm text-neutral-600 dark:text-neutral-400 sm:inline">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="rounded-md px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="rounded-md px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
