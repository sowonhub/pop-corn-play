import { useDatabaseAuth } from "@/auth";
import { HeaderLogo } from "@/components/layout";
import HeaderUserArea from "@/components/layout/HeaderUserArea.jsx";
import { Container, SearchInput } from "@/components/ui";

export default function Header() {
  const { user, busy } = useDatabaseAuth();
  const showFloatingArea = !busy;

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/80 px-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <HeaderLogo />
          </div>
          <div className="flex flex-1 items-center justify-end" />
          <div className="absolute top-full left-1/2 mt-4 w-64 -translate-x-1/2 md:w-80">
            <SearchInput
              compact
              transparent
              className="h-9 text-xs drop-shadow-xl"
            />
          </div>
          {showFloatingArea ? <HeaderUserArea user={user} /> : null}
        </div>
      </Container>
    </header>
  );
}
