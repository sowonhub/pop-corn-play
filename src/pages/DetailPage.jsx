import { cn } from "@/cn";
import { Image } from "@/components";
import Button from "@/components/Button.jsx";
import Container from "@/components/Container.jsx";
import Skeleton from "@/components/Skeleton.jsx";
import { useDetail } from "@/features/movies/hooks/useDetail.js";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function minToHM(min = 0) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}시간 ${m}분` : `${m}분`;
}

export default function DetailPage() {
  const { id } = useParams();
  const { data: m, loading, error } = useDetail(Number(id));
  const [inWish, setInWish] = useState(false);
  const toggleWish = () => setInWish((v) => !v);

  if (loading) {
    return (
      <Container className={cn("max-w-5xl py-8 md:py-10")}>
        <div
          className={cn(
            "grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr] lg:grid-cols-[320px_1fr]",
          )}
        >
          <Skeleton className={cn("aspect-2/3 w-full")} />
          <div className={cn("space-y-3")}>
            <Skeleton className={cn("h-8 w-3/4")} />
            <Skeleton className={cn("h-4 w-1/2")} />
            <Skeleton className={cn("h-4 w-full")} />
            <Skeleton className={cn("h-4 w-5/6")} />
          </div>
        </div>
      </Container>
    );
  }

  if (error || !m) {
    return (
      <Container className={cn("max-w-5xl py-8 md:py-10")}>
        <div
          className={cn(
            "rounded-lg border border-red-600/40 bg-red-500/10 p-4 text-sm",
          )}
        >
          상세 정보를 불러오는 중 오류가 발생했습니다.
          <div className={cn("mt-3 flex gap-2")}>
            <Button onClick={() => location.reload()}>새로고침</Button>
            <Link to="/">
              <Button as="a">홈으로</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  const genres = (m.genres || []).map((g) => g.name);
  const meta = [
    m.release_date || "-",
    m.runtime ? minToHM(m.runtime) : "-",
    (m.original_language || "").toUpperCase() || "-",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={cn("relative")}>
      {/* Hero: backdrop  gradient  blur */}
      <div className={cn("absolute inset-0 -z-10")}>
        {(m.backdrop_path || m.poster_path) && (
          <Image
            // 백드롭이 없으면 포스터로 대체 표시
            src={m.backdrop_path || m.poster_path}
            type={m.backdrop_path ? "backdrop" : "poster"}
            alt={`${m.title} backdrop`}
            width={1280}
            height={720}
            className={cn("w-full object-cover")}
          />
        )}
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-black/80 dark:from-neutral-900/60 dark:via-neutral-950 dark:to-neutral-950",
          )}
        />
        <div className={cn("absolute inset-0 backdrop-blur-[6px]")} />
      </div>

      <Container className={cn("max-w-5xl")}>
        <div className={cn("pt-5")}>
          <Link
            to="/"
            className={cn(
              "text-sm text-neutral-700 hover:underline dark:text-neutral-300",
            )}
          >
            ← 홈으로
          </Link>
        </div>

        {/* Main two-column */}
        <div
          className={cn(
            "mt-6 grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr] lg:grid-cols-[320px_1fr]",
          )}
        >
          {/* Poster (sticky on large) */}
          <div className={cn("md:justify-self-start lg:sticky lg:top-24")}>
            <div
              className={cn(
                "relative aspect-2/3 w-full max-w-[320px] overflow-hidden rounded-2xl bg-neutral-100 shadow-lg ring-1 ring-black/5 lg:max-w-[360px] xl:max-w-[420px] dark:bg-neutral-900 dark:ring-white/10",
              )}
            >
              <Image
                src={m.poster_path}
                type="poster"
                alt={m.title}
                width={342}
                height={513}
                className={cn("h-full w-full object-cover")}
              />
              {/* Rating badge */}
              <span
                className={cn(
                  "absolute top-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white shadow-sm ring-1 ring-white/20 backdrop-blur-sm",
                )}
              >
                ⭐ {m.vote_average?.toFixed?.(1) ?? "-"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className={cn("max-w-2xl self-start xl:max-w-3xl")}>
            <h1
              className={cn("text-2xl leading-tight font-semibold md:text-3xl")}
            >
              {m.title}
            </h1>
            <p
              className={cn(
                "mt-1 text-sm text-neutral-600 dark:text-neutral-300",
              )}
            >
              {meta}
            </p>

            {/* Genres / chips */}
            <div className={cn("mt-4 flex flex-wrap items-center gap-2")}>
              {genres.map((g) => (
                <span
                  key={g}
                  className={cn(
                    "rounded-full border border-neutral-300 bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700 dark:border-neutral-700/60 dark:bg-neutral-900/60 dark:text-neutral-200",
                  )}
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className={cn("mt-5")}>
              <p
                className={cn(
                  "max-w-[68ch] text-[15px] leading-7 wrap-break-word text-neutral-800 md:text-base md:leading-8 dark:text-neutral-200",
                )}
              >
                {m.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>

            {/* Actions (placeholder) */}
            <div className={cn("mt-6 flex gap-2")}>
              <Button
                className={cn(
                  "h-10 border border-transparent bg-neutral-900 px-4 text-white transition-none hover:bg-neutral-900 hover:text-white dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-100 dark:hover:text-neutral-900",
                )}
              >
                예고편 보기
              </Button>

              <Button
                type="button"
                aria-label={inWish ? "위시리스트에서 제거" : "위시리스트 추가"}
                aria-pressed={inWish}
                onClick={toggleWish}
                className={cn(
                  "h-10 border border-neutral-300 bg-white px-4 text-neutral-900 transition-none hover:bg-white hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
                )}
              >
                위시리스트
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
