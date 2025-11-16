import { Header } from "@/components/layout";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <Header />
      <main className="mx-auto px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}
