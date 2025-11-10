import { cn } from "@/cn";
import NavigationBar from "@/features/movies/NavigationBar.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      className={cn(
        "min-h-dvh bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
      )}
    >
      <NavigationBar />
      <main className={cn("mx-auto max-w-6xl px-4 py-6 md:py-8")}>
        <Outlet />
      </main>
    </div>
  );
}
