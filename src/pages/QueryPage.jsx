import { useSearchParams } from "react-router-dom";

import { Card } from "@/components/movies";
import {
  Container,
  EmptyState,
  ErrorState,
  Section,
  SectionHeader,
  Skeleton,
} from "@/components/ui";
import { useMovieSearch } from "@/hooks/movies";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function QueryPage() {
  const [params] = useSearchParams();
  const keyword = (params.get("keyword") || "").replace(/^"|"$/g, "").trim();
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovieSearch(keyword);

  const loadMoreRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, hasNextPage);

  const list = data?.pages?.flatMap((page) => page.results) ?? [];

  return (
    <Container className="py-6 md:py-8 lg:py-10">
      <Section
        header={
          <SectionHeader title={keyword ? `검색 결과: ${keyword}` : "검색"} />
        }
      >
        {isLoading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
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
        ) : error ? (
          <ErrorState message="검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." />
        ) : list.length === 0 ? (
          <EmptyState message={`"${keyword}"에 대한 검색 결과가 없습니다.`} />
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
              {list.map((m) => (
                <Card key={m.id} movie={m} />
              ))}
            </div>
            {/* Infinite Scroll Trigger */}
            {(hasNextPage || isFetchingNextPage) && (
              <div ref={loadMoreRef} className="mt-8 flex justify-center py-4">
                {isFetchingNextPage && (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-400 border-t-transparent dark:border-neutral-600" />
                )}
              </div>
            )}
          </div>
        )}
      </Section>
    </Container>
  );
}
