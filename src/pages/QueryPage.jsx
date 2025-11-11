import { Card } from "@/components/movies";
import { Container, Section, Skeleton } from "@/components/ui";
import { useQuery } from "@/hooks/movies";
import { cn } from "@/utils/cn";
import { useSearchParams } from "react-router-dom";

export default function QueryPage() {
  const [params] = useSearchParams();
  const keyword = (params.get("keyword") || "").replace(/^"|"$/g, "").trim();
  const { data, loading, error } = useQuery();

  const list = data?.results ?? [];

  return (
    <Container className={cn("py-6 md:py-8 lg:py-10")}>
      <Section title={keyword ? `검색 결과: ${keyword}` : "검색"}>
        {loading ? (
          <div
            className={cn(
              "grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4",
            )}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900",
                )}
              >
                <Skeleton className={cn("aspect-2/3 w-full")} />
                <div className={cn("space-y-2 p-3")}>
                  <Skeleton className={cn("h-4 w-3/4")} />
                  <Skeleton className={cn("h-3 w-1/3")} />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            className={cn(
              "rounded-lg border border-red-700 bg-red-900/20 p-4 text-sm text-red-300",
            )}
          >
            검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </div>
        ) : list.length === 0 ? (
          <div
            className={cn(
              "rounded-lg border border-neutral-800 bg-neutral-900 p-6 text-center text-neutral-300",
            )}
          >
            "{keyword}"에 대한 검색 결과가 없습니다.
          </div>
        ) : (
          <div
            className={cn(
              "grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4",
            )}
          >
            {list.map((m) => (
              <Card key={m.id} movie={m} />
            ))}
          </div>
        )}
      </Section>
    </Container>
  );
}
