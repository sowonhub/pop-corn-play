import NavigationBar from "@/components/common/NavigationBar.jsx";
import { Outlet } from "react-router-dom";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <NavigationBar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
