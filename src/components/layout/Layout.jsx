import { Outlet } from "react-router-dom";
import { Header, LAYOUT_CONTAINER_CLASS, LAYOUT_MAIN_CLASS } from "./index.js";

export default function Layout() {
  return (
    <div className={LAYOUT_CONTAINER_CLASS}>
      <Header />
      <main className={LAYOUT_MAIN_CLASS}>
        <Outlet />
      </main>
    </div>
  );
}
