import Container from "@/components/common/Container.jsx";
import Section from "@/components/common/Section.jsx";
import Skeleton from "@/components/common/Skeleton.jsx";
import MovieCard from "@/features/movie/components/MovieCard.jsx";
import { useSearchMovies } from "@/features/search/hooks/useSearchMovies.js";
import { useDebounce } from "@/hooks/useDebounce.js";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const qDebounced = useDebounce(q, 300);
  const { data, loading, error } = useSearchMovies(qDebounced);

  const list = data?.results ?? [];

  return (
    <Container className="py-6 md:py-8 lg:py-10">
      <Section title={`Search: "${q}"`}>
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
          <div className="rounded-lg border border-red-700 bg-red-900/20 p-4 text-sm text-red-300">
            검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
          </div>
        ) : list.length === 0 ? (
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 text-center text-neutral-300">
            "{q}"에 대한 검색 결과가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {list.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </Section>
    </Container>
  );
}
