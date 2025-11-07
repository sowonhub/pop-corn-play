import Container from "@/components/common/Container.jsx";
import SearchInput from "@/components/common/SearchInput.jsx";
import ThemeToggle from "@/components/common/ThemeToggle.jsx";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/70 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70">
      <Container>
        <div className="flex items-center justify-between py-3">
          {/* 좌측 로고: 가장자리 여백 */}
          <Link
            href="/"
            className="pl-2 text-base font-bold md:pl-3 md:text-lg"
          >
            <span className="text-neutral-900 dark:text-neutral-50">
              🎬 Mini Movies
            </span>
          </Link>
          {/* 우측 검색창: 가장자리 여백 */}
          <div className="flex items-center gap-2 pr-2 md:pr-3">
            <SearchInput />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
