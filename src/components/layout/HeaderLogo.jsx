import { PATHS } from "@/router";
import { Link } from "react-router-dom";

export function HeaderLogo() {
  return (
    <Link to={PATHS.HOME} className="flex shrink-0 items-center gap-2">
      <span className="text-2xl">🍿</span>
      <span className="hidden bg-linear-to-r from-rose-600 to-orange-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:block dark:from-rose-400 dark:to-orange-300">
        Popcorn Play
      </span>
    </Link>
  );
}
