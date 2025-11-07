import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const img = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://placehold.co/300x450?text=No+Image";

  return (
    <article className="group overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-900 transition hover:-translate-y-0.5 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
      <Link to={`/movie/${movie.id}`} aria-label={`${movie.title} 상세보기`}>
        <img
          src={img}
          alt={movie.title}
          className="aspect-2/3 w-full object-cover transition group-hover:opacity-95"
          loading="lazy"
        />
      </Link>
      <div className="space-y-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold">{movie.title}</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          ⭐ {movie.vote_average?.toFixed?.(1) ?? "-"}
        </p>
      </div>
    </article>
  );
}
