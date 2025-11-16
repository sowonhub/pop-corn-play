import { authClient, useAuth } from "@/auth";
import { Card } from "@/components/movies";
import { Container, EmptyState, Section, SectionHeader } from "@/components/ui";
import useWishlist from "@/hooks/useWishlist";
import { PATHS } from "@/router";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

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
  const { user, logout } = useAuth();
  const { items: wishlist } = useWishlist();
  const [info, setInfo] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    let mounted = true;
    setStatus("loading");
    authClient.auth
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
      id: userInfo.id,
      email: resolvedEmail,
      phone: userInfo.phone,
      provider: userInfo.app_metadata?.provider,
      created_at: userInfo.created_at,
      last_sign_in_at: userInfo.last_sign_in_at,
      confirmed_at: userInfo.confirmed_at,
    })
      .filter(([, value]) => value != null && value !== "")
      .map(([key, value]) => ({
        label: LABELS[key] ?? key,
        value,
        key,
      }));
  }, [userInfo]);

  return (
    <Container className="space-y-6 py-6">
      <Section
        header={
          <SectionHeader
            title="내 정보"
            description="Supabase에 저장된 계정 정보"
          />
        }
      >
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
          {/* {status !== "loading" && userInfo && infoRows.length > 0 && (
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
          )} */}
          {status !== "loading" && userInfo && infoRows.length === 0 && (
            <p className="text-sm text-neutral-500">
              현재 표시할 수 있는 추가 정보가 없습니다.
            </p>
          )}
          {/* {userInfo?.user_metadata && (
            <div className="rounded-xl border border-dashed border-neutral-300/80 bg-neutral-50/60 p-4 text-sm text-neutral-700 dark:border-neutral-700/60 dark:bg-neutral-950/40 dark:text-neutral-200">
              <p className="mb-1 font-medium text-neutral-900 dark:text-neutral-100">
                사용자 메타데이터
              </p>
              <pre className="max-h-48 overflow-auto text-[11px] leading-4">
                {JSON.stringify(userInfo.user_metadata, null, 2)}
              </pre>
            </div>
          )} */}
        </div>
      </Section>

      <Section
        header={
          <SectionHeader
            title="위시리스트"
            description="좋아하는 영화들을 모아볼 수 있어요."
          />
        }
      >
        {wishlist.length === 0 ? (
          <EmptyState message="위시리스트에 추가된 영화가 없습니다. 영화 상세에서 위시 버튼을 눌러보세요." />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {wishlist.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
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
