/**
 * [9단계] pages/QueryPage.jsx - 검색 결과 페이지 컴포넌트
 * 
 * 이 페이지는:
 * 1. URL에서 검색어를 가져옵니다 (/search?keyword=영화)
 * 2. 검색 결과를 가져와서 보여줍니다
 * 
 * 실행 순서:
 * - URL이 "/search?keyword=..."일 때 router.jsx에서 이 컴포넌트를 보여줍니다
 * 
 * 다음 단계:
 *   [9-1단계] hooks/movies/useQuery.js (검색 결과 가져오기)
 */

import { useSearchParams } from "react-router-dom";

import { Card } from "@/components/movies";
import { Container, EmptyState, ErrorState, Section, Skeleton } from "@/components/ui";
import { useQuery } from "@/hooks/movies";

export default function QueryPage() {
  const [params] = useSearchParams();
  const keyword = (params.get("keyword") || "").replace(/^"|"$/g, "").trim();
  const { data, loading, error } = useQuery(keyword);

  const list = data?.results ?? [];

  return (
    <Container className="py-6 md:py-8 lg:py-10">
      <Section title={keyword ? `검색 결과: ${keyword}` : "검색"}>
        {loading ? (
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
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {list.map((m) => (
              <Card key={m.id} movie={m} />
            ))}
          </div>
        )}
      </Section>
    </Container>
  );
}
