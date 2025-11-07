import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }) {
  const getInitial = () =>
    document.documentElement.classList.contains("dark") ? "dark" : "light";

  const [theme, setTheme] = useState(getInitial);

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label="테마 전환"
      title={theme === "dark" ? "다크 모드" : "라이트 모드"}
      className={`rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 ${className}`}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
