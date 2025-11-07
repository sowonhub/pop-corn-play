import NavigationBar from "@/components/common/NavigationBar.jsx";
import { Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <NavigationBar />
      {/* 전역 타이포 리듬 */}
      <main className="leading-relaxed">
        <Outlet />
      </main>
    </div>
  );
}
