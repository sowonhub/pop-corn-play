import { useState } from "react";
import { PATHS } from "@/router";
import { cn } from "@/utils/cn";
import { getUserDisplay } from "@/utils/userDisplay";
import { Link } from "react-router-dom";

export function HeaderUserLink({ user, className }) {
  const [avatarError, setAvatarError] = useState(false);
  const display = getUserDisplay(user);

  if (!display) {
    return null;
  }

  const showAvatar = Boolean(display.avatarUrl) && !avatarError;
  const avatarContent = showAvatar ? (
    <img
      src={display.avatarUrl}
      alt="User Profile"
      className="h-full w-full object-cover"
      onError={() => setAvatarError(true)}
    />
  ) : (
    <span className="text-base font-bold text-neutral-600 md:text-lg dark:text-neutral-300">
      {display.initial}
    </span>
  );

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link
        to={PATHS.MYPAGE}
        className={cn(
          "flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white shadow-sm ring-2 ring-transparent transition-all hover:ring-rose-100 md:h-11 md:w-11 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:ring-rose-900/30",
          className,
        )}
      >
        {avatarContent}
      </Link>
    </div>
  );
}
