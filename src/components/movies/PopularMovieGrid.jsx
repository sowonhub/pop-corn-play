import { MovieGrid, MovieGridSkeleton } from "@/components/movies";
import { EmptyState, ErrorState } from "@/components/ui";
import { usePopularMovies } from "@/hooks/movies";

export default function PopularMovieGrid() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePopularMovies();

  if (isLoading) {
    return <MovieGridSkeleton />;
  }

  if (error) {
    const isApiKeyError = error?.message?.includes("API key is not set");

    const errorMessage = isApiKeyError
      ? "영화 데이터를 불러오려면 .env 파일에 VITE_MOVIE_DATABASE_API_KEY를 설정해주세요."
      : "불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

    return (
      <ErrorState
        message={errorMessage}
        onRetry={isApiKeyError ? undefined : () => location.reload()}
      />
    );
  }

  const list = data?.pages?.flatMap((page) => page.results) ?? [];
  if (list.length === 0) {
    return <EmptyState message="표시할 영화가 없어요." />;
  }

  return (
    <MovieGrid
      movies={list}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
