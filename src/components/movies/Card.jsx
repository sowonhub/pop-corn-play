// [7-2-2단계] 영화 카드 컴포넌트
import { Image } from "@/components/ui";
import { PATHS } from "@/router";
import { Link } from "react-router-dom";

export default function Card({ movie }) {
  const title = movie?.title || movie?.name || "Untitled";
  const voteAverage = movie.vote_average?.toFixed?.(1) ?? "-";

  return (
    <article className="group overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-900 transition hover:-translate-y-0.5 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
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
        <h3 className="line-clamp-2 text-sm font-semibold">{title}</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          ⭐ {voteAverage}
        </p>
      </div>
    </article>
  );
}
