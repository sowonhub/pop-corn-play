import { useDatabaseAuth } from "@/auth";
import {
  HeaderAuthLinks,
  HeaderLogo,
  HeaderUserLink,
} from "@/components/layout";
import { Container, SearchInput } from "@/components/ui";
import {
  HEADER_BODY_CLASS,
  HEADER_HEADER_CLASS,
  HEADER_LINK_GROUP_CLASS,
  HEADER_SEARCH_INPUT_CLASS,
} from "./index.js";

export default function Header() {
  const { user: databaseAuthUser } = useDatabaseAuth();

  return (
    <header className={HEADER_HEADER_CLASS}>
      <Container>
        <div className={HEADER_BODY_CLASS}>
          <HeaderLogo />
          <div className={HEADER_SEARCH_INPUT_CLASS}>
            <SearchInput />
          </div>

          <div className={HEADER_LINK_GROUP_CLASS}>
            {databaseAuthUser ? (
              <HeaderUserLink user={databaseAuthUser} />
            ) : (
              <HeaderAuthLinks />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
