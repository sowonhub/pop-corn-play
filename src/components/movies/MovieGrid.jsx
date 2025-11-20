import { Card } from "@/components/movies";
import { cn } from "@/utils/cn";

export default function MovieGrid({ movies, className }) {
  if (!movies?.length) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        className,
      )}
    >
      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
