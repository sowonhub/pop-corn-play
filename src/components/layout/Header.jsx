import { useDatabaseAuth } from "@/auth";
import {
  HeaderAuthLinks,
  HeaderLogo,
  HeaderUserLink,
} from "@/components/layout";
import { Container, SearchInput, ThemeToggle } from "@/components/ui";

export default function Header() {
  const { user, busy } = useDatabaseAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/80 px-8 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 md:gap-8">
          <HeaderLogo />
          <div className="max-w-md min-w-0 flex-1">
            <SearchInput />
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <ThemeToggle />
            {busy ? null : user ? (
              <HeaderUserLink user={user} />
            ) : (
              <HeaderAuthLinks />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
