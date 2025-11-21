import { MovieGrid, MovieGridSkeleton } from "@/components/movies";
import {
  Container,
  EmptyState,
  ErrorState,
  Section,
  SectionHeader,
  Spinner,
} from "@/components/ui";
import { useInfiniteMovieSearch } from "@/hooks/movies";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const SKELETON_COUNT = 10;

export default function SearchPage() {
  const [params] = useSearchParams();
  const keyword = urlKeyword(params.get("keyword"));
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMovieSearch(keyword);

  const movies = useMemo(
    () => data?.pages?.flatMap((page) => page.results) ?? [],
    [data],
  );

  return (
    <Container className="max-w-6xl px-8 py-6 pt-12 md:py-8 md:pt-16 lg:py-10 lg:pt-20">
      <Section>
        <SearchResults
          state={{ isLoading, error, isEmpty: movies.length === 0 }}
          data={{ movies, keyword }}
          pagination={{ fetchNextPage, hasNextPage, isFetchingNextPage }}
        />
      </Section>
    </Container>
  );
}

// --- Sub Components & Helpers ---

function SearchResults({ state, data, pagination }) {
  const { isLoading, error, isEmpty } = state;
  const { movies, keyword } = data;
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = pagination;

  const handleLoadMore = useCallback(() => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, fetchNextPage]);

  const loadMoreRef = useInfiniteScroll(handleLoadMore, hasNextPage);

  if (isLoading) {
    return <MovieGridSkeleton count={SKELETON_COUNT} />;
  }

  if (error) {
    return (
      <ErrorState message="검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." />
    );
  }

  if (isEmpty) {
    return <EmptyState message={`"${keyword}"에 대한 검색 결과가 없습니다.`} />;
  }

  return (
    <div>
      <MovieGrid movies={movies} />
      {(hasNextPage || isFetchingNextPage) && (
        <div ref={loadMoreRef} className="mt-8 flex justify-center py-4">
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </div>
  );
}

function urlKeyword(value) {
  return (value || "").replace(/^"|"$/g, "").trim();
}
