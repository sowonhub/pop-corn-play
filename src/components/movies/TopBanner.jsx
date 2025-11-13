// [7-1단계] Top 10 영화 배너 컴포넌트
import { useTopMovies } from "@/hooks/movies";
import { PATHS } from "@/router";
import { getMovieImageUrl } from "@/services/movie-database";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TopBannerSkeleton from "./TopBannerSkeleton.jsx";

const BANNER_AUTO_SLIDE_INTERVAL_MS = 4000;

const getImageUrl = (path, size = "w1280") =>
  getMovieImageUrl(path, "backdrop", size);

const getNextIndex = (i, len) => (i + 1) % len;
const getPrevIndex = (i, len) => (i - 1 + len) % len;

export default function TopBanner() {
  const { data, loading } = useTopMovies();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (loading || !data?.length || paused) return;

    timerRef.current = setInterval(
      () => setIndex((i) => getNextIndex(i, data.length)),
      BANNER_AUTO_SLIDE_INTERVAL_MS,
    );

    return () => clearInterval(timerRef.current);
  }, [data?.length, loading, paused]);

  if (loading) {
    return <TopBannerSkeleton />;
  }

  if (!data?.length) {
    return null;
  }

  const cur = data[index];
  const bg = getImageUrl(cur.backdrop_path || cur.poster_path);

  const goPrev = () => setIndex((i) => getPrevIndex(i, data.length));
  const goNext = () => setIndex((i) => getNextIndex(i, data.length));

  return (
    <section
      className="relative aspect-video w-full overflow-hidden rounded-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label="Top 10 영화 배너"
    >
      <img
        src={bg}
        alt={cur.title || cur.name}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-8">
        <div className="mb-2 text-sm opacity-80">
          Top 10 · {index + 1} / {data.length}
        </div>
        <h2 className="line-clamp-2 text-2xl font-semibold md:text-4xl">
          {cur.title || cur.name}
        </h2>
        <p className="mt-2 line-clamp-3 max-w-3xl text-sm opacity-90 md:text-base">
          {cur.overview || "줄거리 정보가 없습니다."}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Link
            to={PATHS.MOVIE(cur.id)}
            className="inline-flex h-10 items-center rounded-md bg-white px-4 text-neutral-900 transition-none hover:bg-white hover:text-neutral-900"
          >
            자세히 보기
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={goPrev}
        aria-label="이전"
        className="absolute top-1/2 left-2 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 text-white transition-none hover:bg-black/60"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="다음"
        className="absolute top-1/2 right-2 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 text-white transition-none hover:bg-black/60"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`${i + 1}번째 배너로 이동`}
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              i === index ? "bg-white" : "bg-white/40",
            )}
          />
        ))}
      </div>
    </section>
  );
}
