import { databaseAuthClient, useDatabaseAuth } from "@/auth";
import { Card } from "@/components/movies";
import { Container, EmptyState, Section, SectionHeader } from "@/components/ui";
import useWishlist from "@/hooks/useWishlist";
import { PATHS } from "@/router";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const WISHLIST_SWIPE_GAP = 16;
const WISHLIST_SWIPE_PADDING = 18;
const WISHLIST_CARD_MIN_WIDTH = 180;
const WISHLIST_SCROLL_STYLE = {
  gap: `${WISHLIST_SWIPE_GAP}px`,
  paddingLeft: `${WISHLIST_SWIPE_PADDING}px`,
  paddingRight: `${WISHLIST_SWIPE_PADDING}px`,
  touchAction: "pan-y",
  WebkitOverflowScrolling: "touch",
};

const LABELS = {
  id: "사용자 ID",
  email: "이메일 계정",
  phone: "전화번호",
  provider: "가입 / 인증 제공자",
  created_at: "가입일",
  last_sign_in_at: "마지막 로그인",
  confirmed_at: "이메일 확인",
};

export default function MyPage() {
  const { user, logout } = useDatabaseAuth();
  const { items: wishlist } = useWishlist();
  const [info, setInfo] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    setStatus("loading");
    databaseAuthClient.auth
      .getUser()
      .then(({ data, error: fetchError }) => {
        if (!mounted) return;
        if (fetchError) {
          setError(fetchError.message);
          setStatus("error");
          return;
        }
        setInfo(data.user ?? null);
        setStatus("success");
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message ?? "정보를 불러오지 못했습니다.");
        setStatus("error");
      });

    return () => {
      mounted = false;
    };
  }, [user]);

  const userInfo = info ?? user;

  const infoRows = useMemo(() => {
    if (!userInfo) return [];

    const identityEmail = userInfo.identities?.find(
      (identity) => identity?.identity_data?.email,
    )?.identity_data?.email;
    const resolvedEmail = userInfo.email ?? identityEmail;

    return Object.entries({
      email: resolvedEmail,
      phone: userInfo.phone,
    })
      .filter(([, value]) => value != null && value !== "")
      .map(([key, value]) => ({
        label: LABELS[key] ?? key,
        value,
        key,
      }));
  }, [userInfo]);

  return (
    <Container className="space-y-6">
      <Section header={<SectionHeader title="내 정보" />}>
        <div className="space-y-4 rounded-2xl border border-neutral-200/60 bg-white/60 p-6 shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900/60">
          {status === "loading" && (
            <p className="text-sm text-neutral-500">
              정보를 불러오는 중입니다...
            </p>
          )}
          {status === "error" && error && (
            <p className="text-sm text-rose-500">
              정보를 불러오는 중 오류가 발생했습니다: {error}
            </p>
          )}
          {!userInfo && status !== "loading" && (
            <p className="text-sm text-neutral-500">
              로그인이 필요합니다. 다시 로그인한 후 확인해주세요.
            </p>
          )}
          {status !== "loading" && userInfo && infoRows.length > 0 && (
            <dl className="grid gap-3 md:grid-cols-2">
              {infoRows.map(({ key, label, value }) => (
                <div
                  key={key}
                  className="rounded-xl border border-neutral-200/60 bg-neutral-50/60 p-3 dark:border-neutral-700/60 dark:bg-neutral-950/40"
                >
                  <dt className="text-xs tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium wrap-break-word text-neutral-900 dark:text-neutral-100">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Section>

      <Section header={<SectionHeader title="위시리스트" />}>
        {wishlist.length === 0 ? (
          <EmptyState message="위시리스트에 추가된 영화가 없습니다. 영화 상세에서 위시 버튼을 눌러보세요." />
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              카드들을 좌우로 스와이프해서 위시리스트 영화를 확인해보세요.
            </p>
            <div className="relative">
              <div
                role="region"
                aria-label="위시리스트 영화 스크롤"
                className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-3"
                style={WISHLIST_SCROLL_STYLE}
              >
                {wishlist.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex-0 snap-start"
                    style={{ minWidth: `${WISHLIST_CARD_MIN_WIDTH}px` }}
                  >
                    <Card movie={movie} />
                  </div>
                ))}
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-white to-transparent dark:from-neutral-900/80"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-white to-transparent dark:from-neutral-900/80"
              />
            </div>
          </div>
        )}
      </Section>
      <Link
        to={PATHS.HOME}
        onClick={() => {
          logout();
        }}
        className="rounded-xl border border-neutral-300 px-3 py-2 text-sm whitespace-nowrap text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
      >
        로그아웃
      </Link>
    </Container>
  );
}
