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
      {/* Sun Icon (Show in Dark Mode) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "absolute h-4 w-4 text-amber-500 transition-all duration-300",
          isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 rotate-90 opacity-0",
        )}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>

      {/* Moon Icon (Show in Light Mode) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "absolute h-4 w-4 text-indigo-500 transition-all duration-300 dark:text-indigo-400",
          !isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0",
        )}
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>
  );
}
