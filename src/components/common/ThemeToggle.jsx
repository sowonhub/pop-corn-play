import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const getInitial = () =>
    document.documentElement.classList.contains("dark") ? "dark" : "light";
  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-9 items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 text-sm text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
      aria-label="테마 전환"
      title={theme === "dark" ? "라이트 모드" : "다크 모드"}
    >
      <span className="hidden sm:inline">{theme === "dark" ? "🌙" : "☀️"}</span>
      <span className="sm:hidden">{theme === "dark" ? "🌙" : "☀️"}</span>
    </button>
  );
}
