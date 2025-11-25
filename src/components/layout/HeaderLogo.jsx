import { PATHS } from "@/router";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";
import popcornLogo from "@/assets/logo/popcorn.svg";
import drinkLogo from "@/assets/logo/drink-cola-coke.svg";

export function HeaderLogo({ className }) {
  return (
    <Link
      to={PATHS.HOME}
      className={cn("flex shrink-0 items-center gap-2", className)}
    >
      <img
        src={popcornLogo}
        alt="Popcorn Play logo"
        className="h-10 w-10"
        loading="lazy"
      />
      <span className="bg-linear-to-r from-rose-600 to-orange-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-3xl dark:from-rose-400 dark:to-orange-300">
        Popcorn Play
      </span>
      <img
        src={drinkLogo}
        alt="Drink cola icon"
        className="h-10 w-10"
        loading="lazy"
      />
    </Link>
  );
}
