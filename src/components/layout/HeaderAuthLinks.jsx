import { PATHS } from "@/router";
import { Link } from "react-router-dom";
import { HEADER_AUTH_LINK_CLASS, HEADER_LINK_GROUP_CLASS } from "./index.js";

export function HeaderAuthLinks() {
  return (
    <div className={HEADER_LINK_GROUP_CLASS}>
      <Link to={PATHS.SIGNUP} className={HEADER_AUTH_LINK_CLASS}>
        회원가입
      </Link>
      <Link to={PATHS.LOGIN} className={HEADER_AUTH_LINK_CLASS}>
        로그인
      </Link>
    </div>
  );
}
