import { PATHS } from "@/router";
import { Link } from "react-router-dom";

const LOGIN_LINK_STYLE =
  "whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 md:px-4";

const SIGNUP_LINK_STYLE =
  "hidden whitespace-nowrap rounded-full bg-neutral-900 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 sm:inline-block md:px-4 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100";

export function HeaderAuthLinks() {
  return (
    <div className="flex shrink-0 items-center gap-1 md:gap-2">
      <Link to={PATHS.LOGIN} className={LOGIN_LINK_STYLE}>
        로그인
      </Link>
      <Link to={PATHS.SIGNUP} className={SIGNUP_LINK_STYLE}>
        회원가입
      </Link>
    </div>
  );
}
