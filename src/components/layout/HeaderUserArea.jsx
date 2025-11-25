import { HeaderUserLink } from "@/components/layout";
import { ThemeToggle } from "@/components/ui";
import { PATHS } from "@/router";
import { Link } from "react-router-dom";

const AREA_POSITION_CLASSES = "absolute top-full right-0 -translate-y-1/2";

function HeaderThemeToggle() {
  return (
    <div className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white shadow-md dark:border-neutral-900 dark:bg-neutral-800">
      <ThemeToggle className="h-full w-full hover:bg-transparent" />
    </div>
  );
}

function HeaderAvatar({ user }) {
  if (user) {
    return (
      <HeaderUserLink
        user={user}
        className="h-16 w-16 border-4 border-white bg-neutral-100 shadow-lg md:h-20 md:w-20 dark:border-neutral-800"
        ariaLabel="마이페이지"
      />
    );
  }

  return (
    <Link
      to={PATHS.LOGIN}
      className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-neutral-100 shadow-lg transition-transform hover:scale-105 md:h-20 md:w-20 dark:border-neutral-800 dark:bg-neutral-800"
    >
      <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
        ON
      </span>
    </Link>
  );
}

export default function HeaderUserArea({ user }) {
  return (
    <div className={AREA_POSITION_CLASSES}>
      <div className="relative flex flex-col items-center space-y-3">
        <div className="relative">
          <HeaderAvatar user={user} />
          <HeaderThemeToggle />
        </div>
      </div>
    </div>
  );
}
