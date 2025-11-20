import { Image } from "@/components/ui";
import { PATHS } from "@/router";
import { Link } from "react-router-dom";

import WishlistButton from "@/components/movies/WishlistButton";
import useWishlist from "@/hooks/useWishlist";

export default function Card({ movie }) {
  const title = movie?.title || movie?.name || "Untitled";
  const voteAverage = movie.vote_average?.toFixed?.(1) ?? "-";
  const { contains, toggle } = useWishlist();
  const isWishlisted = contains(movie?.id);

  return (
    <article className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-900 transition hover:-translate-y-0.5 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
      <WishlistButton
        isWishlisted={isWishlisted}
        onClick={() => toggle(movie)}
        className="absolute top-3 right-3 z-10"
      />
      <Link
        to={PATHS.MOVIE(movie.id)}
        aria-label={`${title} 상세보기`}
        className="block overflow-hidden"
      >
        <Image
          src={movie?.poster_path}
          type="poster"
          alt={title}
          width={342}
          height={513}
          className="aspect-2/3 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      <div className="relative space-y-1 p-4">
        <h3 className="line-clamp-1 overflow-hidden text-base font-semibold text-neutral-900 text-ellipsis group-hover:text-rose-600 dark:text-neutral-100 dark:group-hover:text-rose-400">
          {title}
        </h3>
        <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <span className="text-yellow-400">★</span> {voteAverage}
          </span>
          <span>{movie.release_date?.split("-")[0]}</span>
        </div>
      </div>
    </article>
  );
}
