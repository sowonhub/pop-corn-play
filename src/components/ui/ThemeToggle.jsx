import moonIcon from "@/assets/icons/moon.svg?raw";
import sunIcon from "@/assets/icons/sun.svg?raw";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
        className,
      )}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      <span
        className={cn(
          "absolute h-4 w-4 text-amber-500 transition-all duration-300",
          isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0",
        )}
        aria-hidden
        dangerouslySetInnerHTML={{ __html: sunIcon }}
      />

      <span
        className={cn(
          "absolute h-4 w-4 text-indigo-500 transition-all duration-300 dark:text-indigo-400",
          !isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0",
        )}
        aria-hidden
        dangerouslySetInnerHTML={{ __html: moonIcon }}
      />
    </button>
  );
}
