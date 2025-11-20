import { PATHS } from "@/router";
import { Link } from "react-router-dom";

function getUserDisplayInfo(user) {
  const { user_metadata, email } = user;

  // 1. 프로필 이미지가 있으면 이미지 URL 반환
  if (user_metadata?.avatar_url) {
    return { type: "image", value: user_metadata.avatar_url };
  }

  // 2. 닉네임이 있으면 첫 글자 반환
  const nickname = user_metadata?.full_name || user_metadata?.name;
  if (nickname?.length) {
    return { type: "text", value: nickname[0].toUpperCase() };
  }

  // 3. 이메일이 있으면 첫 글자 반환
  if (email?.length) {
    return { type: "text", value: email[0].toUpperCase() };
  }

  return null;
}

export function HeaderUserLink({ user }) {
  const displayInfo = getUserDisplayInfo(user);

  if (!displayInfo) {
    return null;
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link
        to={PATHS.MYPAGE}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white shadow-sm ring-2 ring-transparent transition-all hover:ring-rose-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:ring-rose-900/30"
      >
        {displayInfo.type === "image" ? (
          <img
            src={displayInfo.value}
            alt="User Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm font-bold text-neutral-600 dark:text-neutral-300">
            {displayInfo.value}
          </span>
        )}
      </Link>
    </div>
  );
}
