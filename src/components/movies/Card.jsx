import { Image } from "@/components/ui";
import { PATHS } from "@/router";
import { Link } from "react-router-dom";
import starIcon from "@/assets/icons/star.svg";

import WishlistButton from "@/components/movies/WishlistButton";
import useWishlist from "@/hooks/useWishlist";
import { formatMovieData } from "@/utils/format";

export default function Card({ movie }) {
  const { title, voteAverage, year, posterPath, id } = formatMovieData(movie);
  const { contains, toggle, isAuthenticated, isAuthLoading } = useWishlist();
  const isWishlisted = contains(id);
  const disabled = !isAuthenticated || isAuthLoading;

  return (
    <article className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-900 transition hover:-translate-y-0.5 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
      <WishlistButton
        isWishlisted={isWishlisted}
        onClick={() => toggle(movie)}
        disabled={disabled}
        className="absolute top-3 right-3 z-10"
      />
      <Link
        to={PATHS.MOVIE(id)}
        aria-label={`${title} 상세보기`}
        className="block overflow-hidden"
      >
        <Image
          src={posterPath}
          type="poster"
          alt={title}
          width={342}
          height={513}
          className="aspect-2/3 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      <div className="relative space-y-1 p-4">
        <h3 className="line-clamp-1 overflow-hidden text-base font-semibold text-ellipsis text-neutral-900 group-hover:text-rose-600 dark:text-neutral-100 dark:group-hover:text-rose-400">
          {title}
        </h3>
        <div className="flex items-center justify-between text-xs font-medium text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <img src={starIcon} alt="별점" className="h-4 w-4" loading="lazy" />{" "}
            {voteAverage}
          </span>
          <span>{year}</span>
        </div>
      </div>
    </article>
  );
}
