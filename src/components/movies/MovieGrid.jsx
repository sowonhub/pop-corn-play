import { Card } from "@/components/movies";
import { Grid, Spinner } from "@/components/ui";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { cn } from "@/utils/cn";

export default function MovieGrid({
  movies,
  className,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}) {
  const loadMoreRef = useInfiniteScroll(() => {
    if (onLoadMore && !isFetchingNextPage) {
      onLoadMore();
    }
  }, hasNextPage);

  if (!movies?.length) return null;

  return (
    <div className="w-full">
      <Grid className={className}>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </Grid>
      {(hasNextPage || isFetchingNextPage) && (
        <div ref={loadMoreRef} className="mt-8 flex justify-center py-4">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </div>
  );
}
