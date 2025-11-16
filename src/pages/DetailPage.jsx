import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  Container,
  ErrorState,
  Image,
  Skeleton,
} from "@/components/ui";
import { useMovieDetail } from "@/hooks/movies";
import useWishlist from "@/hooks/useWishlist";
import { minToHM } from "@/utils/format";

const TRAILER_TYPE = "Trailer";
const TRAILER_SITE = "YouTube";
const YOUTUBE_WATCH_URL = "https://www.youtube.com/watch";

export default function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: m, isLoading, error } = useMovieDetail(Number(id));
  const { toggle, contains } = useWishlist();
  const inWish = contains(m?.id);
  const toggleWish = () => {
    if (m) {
      toggle(m);
    }
  };

  if (isLoading) {
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
        <ErrorState
          message="상세 정보를 불러오는 중 오류가 발생했습니다."
          onRetry={() => location.reload()}
        >
          <div className="mt-2">
            <Button onClick={() => navigate(-1)}>이전 페이지로</Button>
          </div>
        </ErrorState>
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

  const trailerResults = m.videos?.results ?? [];
  const trailerVideo = trailerResults.find((video) => {
    const key = video?.key?.trim();
    return (
      video?.type === TRAILER_TYPE &&
      video?.site === TRAILER_SITE &&
      Boolean(key)
    );
  });
  const trailerUrl =
    trailerVideo?.key?.trim()?.length > 0
      ? `${YOUTUBE_WATCH_URL}?v=${encodeURIComponent(trailerVideo.key)}`
      : null;
  const hasTrailer = Boolean(trailerUrl);
  const handleWatchTrailer = () => {
    if (!hasTrailer || typeof window === "undefined") {
      return;
    }

    const openedWindow = window.open(
      trailerUrl,
      "_blank",
      "noopener,noreferrer",
    );
    if (openedWindow) {
      openedWindow.focus();
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/5 via-black/10 to-black/40 dark:from-neutral-900/60 dark:via-neutral-950/20 dark:to-neutral-950/80" />

      <Container className="max-w-5xl">
        <div className="pt-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-neutral-700 hover:underline dark:text-neutral-300"
          >
            ← 이전 페이지로
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr] lg:grid-cols-[320px_1fr]">
          <div className="md:justify-self-start lg:sticky lg:top-24">
            <div className="relative aspect-2/3 w-full max-w-[320px] overflow-hidden rounded-2xl bg-neutral-100 shadow-lg ring-1 ring-black/5 lg:max-w-[360px] xl:max-w-[420px] dark:bg-neutral-900 dark:ring-white/10">
              <Image
                src={m.poster_path}
                type="poster"
                alt={m.title}
                width={342}
                height={513}
                className="h-full w-full object-cover"
              />
              <span className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white shadow-sm ring-1 ring-white/20 backdrop-blur-sm">
                ⭐ {m.vote_average?.toFixed?.(1) ?? "-"}
              </span>
            </div>
          </div>

          <div className="max-w-2xl self-start xl:max-w-3xl">
            <h1 className="text-2xl leading-tight font-semibold md:text-3xl">
              {m.title}
            </h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
              {meta}
            </p>

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

            <div className="mt-5">
              <p className="max-w-[68ch] text-[15px] leading-7 wrap-break-word text-neutral-800 md:text-base md:leading-8 dark:text-neutral-200">
                {m.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                type="button"
                onClick={handleWatchTrailer}
                disabled={!hasTrailer}
                title={
                  !hasTrailer ? "예고편 정보를 찾을 수 없습니다." : undefined
                }
                className="h-10 rounded-xl border border-transparent bg-neutral-900 px-4 text-white transition-none hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
              >
                예고편 보기
              </Button>

              <Button
                type="button"
                aria-label={inWish ? "위시리스트에서 제거" : "위시리스트 추가"}
                aria-pressed={inWish}
                onClick={toggleWish}
                className="h-10 rounded-xl border border-neutral-300 bg-white px-4 text-neutral-900 transition-none hover:bg-white hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
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
