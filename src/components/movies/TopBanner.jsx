import TopBannerSkeleton from "@/components/movies/TopBannerSkeleton";
import { useTopMovies } from "@/hooks/movies";
import { PATHS } from "@/router";
import { getMovieImageUrl } from "@/services/movie-database";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BANNER_AUTO_SLIDE_INTERVAL_MS = 4000;

const getImageUrl = (path, size = "w1280") =>
  getMovieImageUrl(path, "backdrop", size);

const getNextIndex = (i, len) => (i + 1) % len;
// const getPrevIndex = (i, len) => (i - 1 + len) % len;

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

  // const goPrev = () => setIndex((i) => getPrevIndex(i, data.length));
  // const goNext = () => setIndex((i) => getNextIndex(i, data.length));

  return (
    <section
      onClick={() => navigate(PATHS.MOVIE(currentMovie.id))}
      className="relative aspect-video w-full overflow-hidden rounded-xl"
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
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="text-sm opacity-80">
          Top 10 · {index + 1} / {data.length}
        </div>
        <h2 className="line-clamp-1 text-[clamp(1.75rem,4.5vw,3rem)] font-semibold">
          {currentMovie.title || currentMovie.name}
        </h2>
      </div>

      {/* Progress Bar */}
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
