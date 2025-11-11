import { ROUTES } from "@/constants/routes";
import { useTop } from "@/hooks/movies";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";
const INTERVAL_TIME = 4000;

const getImageUrl = ({ path, size = "original" }) =>
  path ? `${BASE_IMAGE_URL}${size}${path}` : "";

const getNextCircularIndex = (currentIndex, arrayLength) =>
  (currentIndex + 1) % arrayLength;

export default function TopBanner() {
  const { list, loading } = useTop();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (loading || !list.length || paused) {
      return;
    }

    timerRef.current = setInterval(() => {
      setIndex((i) => getNextCircularIndex(i, list.length));
    }, INTERVAL_TIME);

    return () => clearInterval(timerRef.current);
  }, [list, loading, paused]);

  if (loading) {
    return (
      <div className="aspect-video w-full animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900" />
    );
  }

  if (!list.length) {
    return null;
  }

  const cur = list[index];
  const bg = getImageUrl({
    path: cur.backdrop_path || cur.poster_path,
    size: "w1280",
  });

  const goPrev = () => setIndex((i) => (i - 1 + list.length) % list.length);
  const goNext = () => setIndex((i) => getNextCircularIndex(i, list.length));

  return (
    <section
      className={cn("relative aspect-video w-full overflow-hidden rounded-xl")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label="Top 10 영화 배너"
    >
      {/* 배경 이미지 */}
      <img
        src={bg}
        alt={cur.title || cur.name}
        className={cn("absolute inset-0 h-full w-full object-cover")}
        draggable={false}
      />
      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      {/* 콘텐츠 */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-8">
        <div className="mb-2 text-sm opacity-80">
          Top 10 · {index + 1} / {list.length}
        </div>
        <h2 className="line-clamp-2 text-2xl font-semibold md:text-4xl">
          {cur.title || cur.name}
        </h2>
        <p className="mt-2 line-clamp-3 max-w-3xl text-sm opacity-90 md:text-base">
          {cur.overview || "줄거리 정보가 없습니다."}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Link
            to={ROUTES.MOVIE(cur.id)}
            className="inline-flex h-10 items-center rounded-md bg-white px-4 text-neutral-900 transition-none hover:bg-white hover:text-neutral-900"
          >
            자세히 보기
          </Link>
        </div>
      </div>

      {/* 좌우 네비게이션 */}
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

      {/* 도트 인디케이터 */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {list.map((_, i) => (
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
