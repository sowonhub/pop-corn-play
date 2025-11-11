/**
 * [7-1단계] components/movies/TopBanner.jsx - Top 10 영화 배너 컴포넌트
 * 
 * 이 컴포넌트는:
 * 1. 인기 영화 10개를 가져옵니다
 * 2. 4초마다 자동으로 다음 영화로 넘어갑니다
 * 3. 마우스를 올리면 자동 넘김을 멈춥니다
 * 
 * 실행 순서:
 * - HomePage에서 이 컴포넌트를 사용합니다
 * 
 * 다음 단계:
 *   [7-1-1단계] hooks/movies/useTop.js (영화 데이터 가져오기)
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useTop } from "@/hooks/movies";
import { ROUTES } from "@/router";
import { tmdbImgSrc } from "@/services/tmdb";
import { cn } from "@/utils/cn";

const INTERVAL_TIME = 4000; // 4초마다 자동 넘김

// 이미지 URL 생성 함수
const getImageUrl = (path, size = "w1280") =>
  tmdbImgSrc(path, "backdrop", size);

// 다음 인덱스 계산 (마지막이면 처음으로)
const getNextIndex = (i, len) => (i + 1) % len;
// 이전 인덱스 계산 (처음이면 마지막으로)
const getPrevIndex = (i, len) => (i - 1 + len) % len;

export default function TopBanner() {
  const { list, loading } = useTop();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (loading || !list.length || paused) return;

    timerRef.current = setInterval(
      () => setIndex((i) => getNextIndex(i, list.length)),
      INTERVAL_TIME,
    );

    return () => clearInterval(timerRef.current);
  }, [list.length, loading, paused]);

  if (loading) {
    return (
      <div className="aspect-video w-full animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900" />
    );
  }

  if (!list.length) {
    return null;
  }

  const cur = list[index];
  const bg = getImageUrl(cur.backdrop_path || cur.poster_path);

  const goPrev = () => setIndex((i) => getPrevIndex(i, list.length));
  const goNext = () => setIndex((i) => getNextIndex(i, list.length));

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
