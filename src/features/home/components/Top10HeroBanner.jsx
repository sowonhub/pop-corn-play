import useTop10Movies from "@/features/home/hooks/useTop10Movies.js";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const IMG = (path, size = "original") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "";

export default function Top10HeroBanner() {
  const { list, loading } = useTop10Movies();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // 자동재생 (호버/탭 포커스 시 일시정지)
  useEffect(() => {
    if (loading || !list.length || paused) return;
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % list.length);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [list, loading, paused]);

  // 다음 이미지 미리 로드
  useEffect(() => {
    if (!list.length) return;
    const next = list[(idx + 1) % list.length];
    const src = IMG(next?.backdrop_path || next?.poster_path, "w1280");
    if (src) {
      const im = new Image();
      im.src = src;
    }
  }, [idx, list]);

  if (loading) {
    return (
      <div className="aspect-video w-full animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900" />
    );
  }
  if (!list.length) return null;

  const cur = list[idx];
  const bg = IMG(cur.backdrop_path || cur.poster_path, "w1280");

  const goPrev = () => setIdx((i) => (i - 1 + list.length) % list.length);
  const goNext = () => setIdx((i) => (i + 1) % list.length);

  return (
    <section
      className="relative aspect-video w-full overflow-hidden rounded-xl"
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
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      {/* 콘텐츠 */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-8">
        <div className="mb-2 text-sm opacity-80">
          Top 10 · {idx + 1} / {list.length}
        </div>
        <h2 className="line-clamp-2 text-2xl font-semibold md:text-4xl">
          {cur.title || cur.name}
        </h2>
        <p className="mt-2 line-clamp-3 max-w-3xl text-sm opacity-90 md:text-base">
          {cur.overview || "줄거리 정보가 없습니다."}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Link
            to={`/movie/${cur.id}`}
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
            onClick={() => setIdx(i)}
            aria-label={`${i + 1}번째 배너로 이동`}
            className={`h-2.5 w-2.5 rounded-full ${
              i === idx ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
