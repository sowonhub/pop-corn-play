import NavigationBar from "@/components/common/NavigationBar.jsx";
import { Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <NavigationBar />
      {/* 전역 타이포 리듬 */}
      <main className="leading-relaxed">
        <Outlet />
      </main>
    </div>
  );
}
