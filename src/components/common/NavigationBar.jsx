import Container from "@/components/common/Container.jsx";
import SearchInput from "@/components/common/SearchInput.jsx";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-900/70 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-3">
          {/* 좌측 로고: 가장자리 여백 */}
          <Link
            href="/"
            className="pl-2 text-base font-bold md:pl-3 md:text-lg"
          >
            🎬 Mini Movies
          </Link>
          {/* 우측 검색창: 가장자리 여백 */}
          <div className="pr-2 md:pr-3">
            <SearchInput />
          </div>
        </div>
      </Container>
    </header>
  );
}
