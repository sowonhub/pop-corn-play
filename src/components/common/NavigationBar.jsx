import { useAuth } from "@/app/auth/context.js";
import { Container } from "@/components/common";
import SearchInput from "@/components/common/SearchInput.jsx";
import { ROUTES } from "@/constants";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const auth = useAuth(); // 방어
  const user = auth?.user;
  const logout = auth?.logout ?? (() => {});

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-neutral-200/70 bg-white/80 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/70",
      )}
    >
      <Container className="px-4">
        <div className="flex h-12 items-center justify-between gap-3 sm:h-14">
          {/* Left: Logo */}
          <Link
            href="/"
            className="shrink-0 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
          >
            🎬 Mini Movies
          </Link>

          {/* Center: Search (가로가 넓을 때만 확장) */}
          <div className="hidden max-w-xl flex-1 sm:block">
            <SearchInput />
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            {/* 모바일에서는 아이콘만, sm↑에서는 텍스트 버튼 */}
            <div className="w-40 sm:hidden">
              <SearchInput compact />
            </div>

            {/* <ThemeToggle /> */}

            {user ? (
              <button
                onClick={logout}
                className="inline-flex h-9 items-center rounded-xl border border-neutral-300 px-3 text-sm leading-none text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
                title="로그아웃"
              >
                로그아웃
              </button>
            ) : (
              <>
                <Link
                  to={ROUTES.SIGNUP}
                  className="inline-flex h-9 items-center rounded-xl border border-neutral-300 px-3 text-sm leading-none text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
                >
                  회원가입
                </Link>
                <Link
                  to={ROUTES.LOGIN}
                  className="inline-flex h-9 items-center rounded-xl border border-neutral-300 px-3 text-sm leading-none text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
                >
                  로그인
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
