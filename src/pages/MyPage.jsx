import { useDatabaseAuth } from "@/auth";
import { Card } from "@/components/movies";
import { Container, EmptyState, Section, SectionHeader } from "@/components/ui";
import useWishlist from "@/hooks/useWishlist";
import { PATHS } from "@/router";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const LABELS = {
  email: "이메일",
  nickname: "닉네임",
};

export default function MyPage() {
  const { user, logout } = useDatabaseAuth();
  const { items: wishlist } = useWishlist();

  const userInfo = user;

  const { profileImage, infoRows } = useMemo(() => {
    if (!userInfo) return { profileImage: null, infoRows: [] };

    const { user_metadata, email } = userInfo;

    // 1. 프로필 이미지
    const profileImage = user_metadata?.avatar_url || user_metadata?.picture;

    // 2. 닉네임
    const nickname =
      user_metadata?.full_name ||
      user_metadata?.name ||
      user_metadata?.nickname ||
      user_metadata?.user_name;

    // 3. 이메일 (identity_data 체크 포함)
    const identityEmail = userInfo.identities?.find(
      (identity) => identity?.identity_data?.email,
    )?.identity_data?.email;
    const resolvedEmail = email ?? identityEmail;

    const rows = [
      { key: "nickname", value: nickname, label: LABELS.nickname },
      { key: "email", value: resolvedEmail, label: LABELS.email },
    ].filter((item) => item.value);

    return { profileImage, infoRows: rows };
  }, [userInfo]);

  return (
    <Container className="space-y-12 py-12">
      <Section>
        <div className="mx-auto flex max-w-2xl flex-col items-center space-y-6 text-center">
          {/* 프로필 이미지 영역 */}
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-neutral-100 shadow-lg dark:border-neutral-800 dark:bg-neutral-800">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="프로필"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-5xl font-bold text-neutral-300 dark:text-neutral-600">
                  {infoRows
                    .find((r) => r.key === "nickname" || r.key === "email")
                    ?.value?.[0]?.toUpperCase() ?? "?"}
                </span>
              )}
            </div>
          </div>

          {/* 정보 텍스트 영역 */}
          <div className="w-full space-y-2">
            {!userInfo && (
              <p className="text-sm text-neutral-500">
                로그인이 필요합니다.
              </p>
            )}

            {userInfo && (
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {infoRows.find(r => r.key === 'nickname')?.value || '사용자'}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400">
                  {infoRows.find(r => r.key === 'email')?.value}
                </p>
                  </div>
            )}
          </div>

          <Link
            to={PATHS.HOME}
            onClick={() => logout()}
            className="mt-4 inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
          >
            로그아웃
          </Link>
        </div>
      </Section>

      <Section header={<SectionHeader title={`내 위시리스트 (${wishlist.length})`} className="mb-6" />}>
        {wishlist.length === 0 ? (
          <EmptyState message="아직 위시리스트에 담은 영화가 없습니다." />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {wishlist.map((movie) => (
              <Card key={movie.id} movie={movie} />
                ))}
          </div>
        )}
      </Section>
    </Container>
  );
}
