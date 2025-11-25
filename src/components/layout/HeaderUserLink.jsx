import { PATHS } from "@/router";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";

function getUserDisplayInfo(user) {
  const { user_metadata, email, identities } = user;
  const identityData =
    identities?.find((identity) => identity?.identity_data)?.identity_data ??
    null;

  const avatarUrl =
    user_metadata?.avatar_url ||
    identityData?.avatar_url ||
    identityData?.picture ||
    identityData?.profile_image_url;
  if (avatarUrl) {
    return { type: "image", value: avatarUrl };
  }

  const nickname =
    user_metadata?.full_name ||
    user_metadata?.name ||
    identityData?.full_name ||
    identityData?.name;
  if (nickname?.length) {
    return { type: "text", value: nickname[0].toUpperCase() };
  }

  if (email?.length) {
    return { type: "text", value: email[0].toUpperCase() };
  }

  return null;
}

export function HeaderUserLink({ user, className }) {
  const displayInfo = getUserDisplayInfo(user);

  if (!displayInfo) {
    return null;
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link
        to={PATHS.MYPAGE}
        className={cn(
          "flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white shadow-sm ring-2 ring-transparent transition-all hover:ring-rose-100 md:h-11 md:w-11 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:ring-rose-900/30",
          className,
        )}
      >
        {displayInfo.type === "image" ? (
          <img
            src={displayInfo.value}
            alt="User Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-base font-bold text-neutral-600 md:text-lg dark:text-neutral-300">
            {displayInfo.value}
          </span>
        )}
      </Link>
    </div>
  );
}
