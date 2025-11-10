import { cn } from "@/cn";
import { Image } from "@/components";
import { Link } from "react-router-dom";

export default function Card({ movie }) {
  const title = movie?.title || movie?.name || "Untitled";

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-900 transition hover:-translate-y-0.5 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50",
      )}
    >
      <Link to={`/movie/${movie.id}`} aria-label={`${title} 상세보기`}>
        <Image
          src={movie?.poster_path} // TMDB path
          type="poster" // img.js의 SIZE.poster(w342) 사용
          alt={title}
          width={342}
          height={513}
          className={cn(
            "aspect-2/3 w-full object-cover transition group-hover:opacity-95",
          )}
        />
      </Link>
      <div className={cn("space-y-1 p-3")}>
        <h3 className={cn("line-clamp-2 text-sm font-semibold")}>{title}</h3>
        <p className={cn("text-xs text-neutral-500 dark:text-neutral-400")}>
          ⭐ {movie.vote_average?.toFixed?.(1) ?? "-"}
        </p>
      </div>
    </article>
  );
}
