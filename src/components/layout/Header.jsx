import { useAuth } from "@/auth";
import { Container, SearchInput } from "@/components/ui";
import { PATHS } from "@/router";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useAuth();
  // const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-neutral-200/70 bg-white/80 px-8 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/70">
      <Container>
        <div className="flex h-14 items-center justify-between gap-3">
          <Link
            to={PATHS.HOME}
            className="hidden h-10 shrink-0 text-3xl font-semibold tracking-tight text-neutral-900 sm:block dark:text-neutral-100"
          >
            🍿 Popcorn Play
          </Link>
          <Link
            to={PATHS.HOME}
            className="h-10 shrink-0 text-3xl font-semibold tracking-tight text-neutral-900 sm:hidden dark:text-neutral-100"
          >
            🍿
          </Link>
          <div className="max-w-xl min-w-0 flex-1">
            <SearchInput />
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  to={PATHS.MYPAGE}
                  className="rounded-full border border-red-600 px-2.5 py-1 font-bold whitespace-nowrap text-red-600 hover:bg-red-100 dark:text-red-600 dark:hover:bg-red-950"
                >
                  {user.email[0]?.toUpperCase()}
                </Link>
              </div>
            ) : (
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  to={PATHS.SIGNUP}
                  className="rounded-xl border border-neutral-300 px-3 py-1.5 text-sm whitespace-nowrap text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  회원가입
                </Link>
                <Link
                  to={PATHS.LOGIN}
                  className="rounded-xl border border-neutral-300 px-3 py-1.5 text-sm whitespace-nowrap text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  로그인
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
