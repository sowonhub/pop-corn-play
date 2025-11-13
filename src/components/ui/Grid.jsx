/**
 * [7-2단계] components/ui/Grid.jsx - 영화 그리드 컴포넌트
 * 
 * 이 컴포넌트는:
 * 1. 인기 영화 목록을 가져옵니다
 * 2. 영화 카드들을 그리드 형태로 보여줍니다
 * 
 * 실행 순서:
 * - HomePage에서 이 컴포넌트를 사용합니다
 * 
 * 다음 단계:
 *   [7-2-1단계] hooks/movies/usePopularMovies.js (영화 데이터 가져오기)
 *   [7-2-2단계] components/movies/Card.jsx (각 영화 카드)
 */

import { Card } from "@/components/movies";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui";
import { usePopularMovies } from "@/hooks/movies";

export default function Grid() {
  const { data, loading, error } = usePopularMovies();

  if (loading) {
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
    return (
      <ErrorState
        message="불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        onRetry={() => location.reload()}
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
