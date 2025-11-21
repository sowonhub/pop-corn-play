import { PATHS } from "@/router";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";

export function HeaderLogo({ className }) {
  return (
    <Link
      to={PATHS.HOME}
      className={cn("flex shrink-0 items-center gap-2", className)}
    >
      <span className="text-3xl">🍿</span>
      <span className="bg-linear-to-r from-rose-600 to-orange-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-3xl dark:from-rose-400 dark:to-orange-300">
        Popcorn Play
      </span>
    </Link>
  );
}
