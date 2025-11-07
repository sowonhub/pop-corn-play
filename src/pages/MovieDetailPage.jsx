// src/pages/MovieDetailPage.jsx
import Button from "@/components/common/Button.jsx";
import Container from "@/components/common/Container.jsx";
import Skeleton from "@/components/common/Skeleton.jsx";
import { useMovieDetail } from "@/features/movie/hooks/useMovieDetail.js";
import { Link, useParams } from "react-router-dom";

function minToHM(min = 0) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}시간 ${m}분` : `${m}분`;
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const { data: m, loading, error } = useMovieDetail(Number(id));

  if (loading) {
    return (
      <Container className="max-w-5xl py-8 md:py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr] lg:grid-cols-[320px_1fr]">
          <Skeleton className="aspect-2/3 w-full" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </Container>
    );
  }

  if (error || !m) {
    return (
      <Container className="max-w-5xl py-8 md:py-10">
        <div className="rounded-lg border border-red-600/40 bg-red-500/10 p-4 text-sm">
          상세 정보를 불러오는 중 오류가 발생했습니다.
          <div className="mt-3 flex gap-2">
            <Button onClick={() => location.reload()}>새로고침</Button>
            <Link to="/">
              <Button as="a">홈으로</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  const bg = m.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}`
    : m.poster_path
      ? `https://image.tmdb.org/t/p/w780${m.poster_path}`
      : "";

  const poster = m.poster_path
    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";

  const genres = (m.genres || []).map((g) => g.name);
  const meta = [
    m.release_date || "-",
    m.runtime ? minToHM(m.runtime) : "-",
    (m.original_language || "").toUpperCase() || "-",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="relative">
      {/* Hero: backdrop + gradient + blur */}
      <div className="absolute inset-0 -z-10">
        {bg && (
          <img
            src={bg}
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-black/80 dark:from-neutral-900/60 dark:via-neutral-950 dark:to-neutral-950" />
        <div className="absolute inset-0 backdrop-blur-[6px]" />
      </div>

      <Container className="max-w-5xl">
        <div className="pt-5">
          <Link
            to="/"
            className="text-sm text-neutral-700 hover:underline dark:text-neutral-300"
          >
            ← 홈으로
          </Link>
        </div>

        {/* Main two-column */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr] lg:grid-cols-[320px_1fr]">
          {/* Poster (sticky on large) */}
          <div className="md:justify-self-start lg:sticky lg:top-24">
            <div className="relative w-full max-w-[320px] lg:max-w-[360px] xl:max-w-[420px]">
              <img
                src={poster}
                alt={m.title}
                className="aspect-2/3 max-h-[80vh] w-full rounded-xl border border-neutral-200 object-cover shadow-2xl dark:border-neutral-800"
              />
              {/* Rating badge */}
              <span className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white shadow-sm ring-1 ring-white/20 backdrop-blur-sm">
                ⭐ {m.vote_average?.toFixed?.(1) ?? "-"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-2xl self-start xl:max-w-3xl">
            <h1 className="text-2xl leading-tight font-semibold md:text-3xl">
              {m.title}
            </h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
              {meta}
            </p>

            {/* Genres / chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {genres.map((g) => (
                <span
                  key={g}
                  className="rounded-full border border-neutral-300 bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700 dark:border-neutral-700/60 dark:bg-neutral-900/60 dark:text-neutral-200"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mt-5">
              <p className="max-w-[68ch] text-[15px] leading-7 break-words text-neutral-800 md:text-base md:leading-8 dark:text-neutral-200">
                {m.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>

            {/* Actions (placeholder) */}
            <div className="mt-6 flex gap-2">
              <Button className="!border-transparent !bg-neutral-900 !text-white dark:!bg-neutral-100 dark:!text-neutral-900">
                예고편 보기
              </Button>
              <Button className="border-neutral-300 bg-white text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
                위시리스트
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
