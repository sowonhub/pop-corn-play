import { PATHS } from "@/router";
import { Link } from "react-router-dom";
import {
  HEADER_LOGO_LARGE_CLASS,
  HEADER_LOGO_SMALL_CLASS,
} from "./layoutStyles";

export function HeaderLogo() {
  return (
    <>
      <Link to={PATHS.HOME} className={HEADER_LOGO_LARGE_CLASS}>
        🍿 Popcorn Play
      </Link>
      <Link to={PATHS.HOME} className={HEADER_LOGO_SMALL_CLASS}>
        🍿
      </Link>
    </>
  );
}
