import { PATHS } from "@/router";
import { Link } from "react-router-dom";
import {
  HEADER_LINK_GROUP_CLASS,
  HEADER_USER_LINK_CLASS,
} from "./layoutStyles";

function getUserInitial(email) {
  if (!email?.length) {
    return null;
  }
  return email[0].toUpperCase();
}

export function HeaderUserLink({ user }) {
  const initial = getUserInitial(user.email);
  if (!initial) {
    return null;
  }

  return (
    <div className={HEADER_LINK_GROUP_CLASS}>
      <Link to={PATHS.MYPAGE} className={HEADER_USER_LINK_CLASS}>
        {initial}
      </Link>
    </div>
  );
}
