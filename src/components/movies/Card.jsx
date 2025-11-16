import { Image } from "@/components/ui";
import { PATHS } from "@/router";
import { Link } from "react-router-dom";

import useWishlist from "@/hooks/useWishlist";
import { cn } from "@/utils/cn";

export default function Card({ movie }) {
  const title = movie?.title || movie?.name || "Untitled";
  const voteAverage = movie.vote_average?.toFixed?.(1) ?? "-";
  const { contains, toggle } = useWishlist();
  const isWishlisted = contains(movie?.id);
  const heartLabel = isWishlisted ? "위시리스트에서 제거" : "위시리스트에 추가";

  return (
    <article className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-900 transition hover:-translate-y-0.5 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggle(movie);
        }}
        aria-pressed={isWishlisted}
        aria-label={heartLabel}
        className={cn(
          "absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border bg-white/90 text-lg shadow-lg transition hover:bg-white dark:border-neutral-700/70 dark:bg-neutral-900/70 dark:text-neutral-50",
          isWishlisted
            ? "border-rose-500 text-rose-500"
            : "border-neutral-300 text-neutral-500",
        )}
      >
        <span aria-hidden="true">{isWishlisted ? "❤️" : "🖤"}</span>
      </button>
      <Link to={PATHS.MOVIE(movie.id)} aria-label={`${title} 상세보기`}>
        <Image
          src={movie?.poster_path}
          type="poster"
          alt={title}
          width={342}
          height={513}
          className="aspect-2/3 w-full object-cover transition group-hover:opacity-95"
        />
      </Link>
      <div className="space-y-1 p-3">
        <h3 className="line-clamp-2 h-5.5 overflow-hidden text-sm font-semibold text-ellipsis">
          {title}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          ⭐ {voteAverage}
        </p>
      </div>
    </article>
  );
}
