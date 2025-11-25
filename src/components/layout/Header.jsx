import { useDatabaseAuth } from "@/auth";
import { HeaderLogo, HeaderUserLink } from "@/components/layout";
import { AuthActionPrompt } from "@/components/auth";
import { Container, SearchInput, ThemeToggle } from "@/components/ui";
import { PATHS } from "@/router";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const { user, busy } = useDatabaseAuth();
  const showFloatingArea = !busy;
  const hideAuthPrompt =
    location.pathname === PATHS.LOGIN || location.pathname === PATHS.SIGNUP;

  const userAvatar = user ? (
    <HeaderUserLink
      user={user}
      className="h-16 w-16 border-4 border-white bg-neutral-100 shadow-lg md:h-20 md:w-20 dark:border-neutral-800"
    />
  ) : (
    <Link
      to={PATHS.LOGIN}
      className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-neutral-100 shadow-lg transition-transform hover:scale-105 md:h-20 md:w-20 dark:border-neutral-800 dark:bg-neutral-800"
    >
      <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
        ON
      </span>
    </Link>
  );

  const signupPrompt = user || hideAuthPrompt ? null : (
    <AuthActionPrompt
      message="계정이 없으신가요?"
      linkText="회원가입"
      to={PATHS.SIGNUP}
    />
  );

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/80 px-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <HeaderLogo />
          </div>

          <div className="flex flex-1 items-center justify-end">
          </div>

          <div className="absolute top-full left-1/2 mt-4 w-64 -translate-x-1/2 md:w-80">
            <SearchInput
              compact
              transparent
              className="h-9 text-xs drop-shadow-xl"
            />
          </div>

          {showFloatingArea ? (
            <div className="absolute top-full right-0 -translate-y-1/2">
              <div className="relative flex flex-col items-center space-y-3">
                <div className="relative">
                  {userAvatar}
                  <div className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white shadow-md dark:border-neutral-900 dark:bg-neutral-800">
                    <ThemeToggle className="h-full w-full hover:bg-transparent" />
                  </div>
                </div>
                {signupPrompt}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
