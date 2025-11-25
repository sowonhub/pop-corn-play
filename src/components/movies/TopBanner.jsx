import TopBannerSkeleton from "@/components/movies/TopBannerSkeleton";
import chevronDownIcon from "@/assets/icons/chevron-down.svg?raw";
import { useTopMovies } from "@/hooks/movies";
import { PATHS } from "@/router";
import { getMovieImageUrl } from "@/services/movie-database";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BANNER_AUTO_SLIDE_INTERVAL_MS = 4000;

const getImageUrl = (path, size = "w1280") =>
  getMovieImageUrl(path, "backdrop", size);

const getNextIndex = (i, len) => (i + 1) % len;

export default function TopBanner() {
  const { data, isLoading, error } = useTopMovies();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading || !data?.length || paused) return;

    timerRef.current = setInterval(
      () => setIndex((i) => getNextIndex(i, data.length)),
      BANNER_AUTO_SLIDE_INTERVAL_MS,
    );

    return () => clearInterval(timerRef.current);
  }, [data?.length, isLoading, paused]);

  if (isLoading) {
    return <TopBannerSkeleton />;
  }

  if (error || !data?.length) {
    return null;
  }

  const currentMovie = data[index];
  const backgroundImageUrl = getImageUrl(
    currentMovie.backdrop_path || currentMovie.poster_path,
  );

  return (
    <section
      onClick={() => navigate(PATHS.MOVIE(currentMovie.id))}
      className="relative aspect-video w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label="Top 10 영화 배너"
    >
      <img
        key={currentMovie.id}
        src={backgroundImageUrl}
        alt={currentMovie.title || currentMovie.name}
        className="animate-ken-burns absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

      <div className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2 animate-bounce text-white/70">
        <span
          className="inline-block h-10 w-10 md:h-12 md:w-12"
          aria-hidden
          dangerouslySetInnerHTML={{ __html: chevronDownIcon }}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-8 pb-32 text-white">
        <div className="mb-1">
          <h2 className="flex items-center gap-2 text-[clamp(1.5rem,5vw,2.5rem)] font-bold tracking-tight text-white">
            <span className="h-9 w-1.5 rounded-full bg-linear-to-b from-rose-500 to-orange-400 md:h-10" />
            Top 10
          </h2>
        </div>
        <h2 className="line-clamp-1 text-[clamp(2rem,5vw,3.5rem)] font-bold drop-shadow-lg">
          <span className="mr-3 text-rose-500 drop-shadow-md">
            {index + 1}위
          </span>
          {currentMovie.title || currentMovie.name}
        </h2>
        <div className="mt-2 text-base font-medium text-white/80 drop-shadow-md">
          오늘 가장 많이 본 영화
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-20 h-1 w-full bg-white/20">
        {!paused && (
          <div
            key={index}
            className="h-full origin-left bg-white"
            style={{
              animation: `progress ${BANNER_AUTO_SLIDE_INTERVAL_MS}ms linear forwards`,
            }}
          />
        )}
      </div>
    </section>
  );
}
