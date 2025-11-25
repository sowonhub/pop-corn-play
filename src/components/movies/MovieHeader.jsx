import { WishlistButton } from "@/components/movies";
import { Button, Image } from "@/components/ui";
import arrowLeftIcon from "@/assets/icons/arrow-left.svg?raw";
import playIcon from "@/assets/icons/play.svg?raw";
import starIcon from "@/assets/icons/star.svg";
import useWishlist from "@/hooks/useWishlist";
import { minToHM } from "@/utils/format";

const TRAILER_TYPE = "Trailer";
const TRAILER_SITE = "YouTube";
const YOUTUBE_WATCH_URL = "https://www.youtube.com/watch";

export default function MovieHeader({ movie, navigate }) {
  const { toggle, contains, isAuthenticated, isAuthLoading } = useWishlist();
  const inWish = contains(movie?.id);
  const wishlistDisabled = !isAuthenticated || isAuthLoading;

  const toggleWish = () => {
    if (movie && !wishlistDisabled) {
      toggle(movie);
    }
  };

  const genres = (movie.genres || []).map((genre) => genre.name);
  const year = movie.release_date ? movie.release_date.split("-")[0] : "-";
  const runtimeLabel = movie.runtime ? minToHM(movie.runtime) : "-";
  const languageLabel = (movie.original_language || "").toUpperCase() || "-";

  const trailerResults = movie.videos?.results ?? [];
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
    <>
      <div className="mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/50 px-4 py-2 text-sm font-medium text-neutral-600 backdrop-blur-sm transition-all hover:border-neutral-300 hover:bg-white hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
        >
          <span
            className="inline-block h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden
            dangerouslySetInnerHTML={{ __html: arrowLeftIcon }}
          />
          뒤로가기
        </button>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr] xl:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="group relative mx-auto aspect-2/3 w-full max-w-[380px] overflow-hidden rounded-2xl bg-neutral-100 shadow-2xl ring-1 ring-black/5 transition-transform duration-500 hover:scale-[1.02] dark:bg-neutral-900 dark:ring-white/10">
            <Image
              src={movie.poster_path}
              type="poster"
              alt={movie.title}
              width={380}
              height={570}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-xl bg-black/60 px-3 py-1.5 text-sm font-semibold text-white shadow-lg ring-1 ring-white/10 backdrop-blur-md">
              <img
                src={starIcon}
                alt="별점"
                className="h-4 w-4"
                loading="lazy"
              />
              <span>{movie.vote_average?.toFixed(1) ?? "-"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center py-2">
          <div className="space-y-4">
            <h1 className="text-3xl leading-tight font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl dark:text-white">
              {movie.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              <span>{year}</span>
              <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span>{runtimeLabel}</span>
              <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span>{languageLabel}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {genres.map((genreName) => (
              <span
                key={genreName}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
              >
                {genreName}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="mb-3 text-lg font-semibold text-neutral-900 dark:text-white">
              줄거리
            </h3>
            <p className="text-base leading-8 text-neutral-600 dark:text-neutral-300">
              {movie.overview || "줄거리 정보가 없습니다."}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-neutral-100 pt-8 dark:border-neutral-800">
            <Button
              type="button"
              onClick={handleWatchTrailer}
              disabled={!hasTrailer}
              className="h-12 min-w-[140px] rounded-xl bg-neutral-900 px-6 text-base font-medium text-white hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 dark:hover:shadow-white/10"
            >
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-5 w-5"
                  aria-hidden
                  dangerouslySetInnerHTML={{ __html: playIcon }}
                />
                예고편 보기
              </span>
            </Button>

            <WishlistButton
              isWishlisted={inWish}
              onClick={toggleWish}
              disabled={wishlistDisabled}
              variant="text"
              label={inWish ? "위시리스트에 담김" : "위시리스트 담기"}
              className="h-12 min-w-[140px] rounded-xl border px-6 text-base transition-all"
            />
          </div>
        </div>
      </div>
    </>
  );
}
