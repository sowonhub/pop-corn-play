import { Card } from "@/components/movies";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui";
import { usePopularMovies } from "@/hooks/movies";

export default function Grid() {
  const { data, isLoading, error } = usePopularMovies();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
          >
            <Skeleton className="aspect-2/3 w-full" />
            <div className="space-y-2 p-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
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

  const list = data?.results ?? [];
  if (list.length === 0) {
    return <EmptyState message="표시할 영화가 없어요." />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {list.map((m) => (
        <Card key={m.id} movie={m} />
      ))}
    </div>
  );
}
