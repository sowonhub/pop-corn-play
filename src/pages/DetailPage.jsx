import { useNavigate, useParams } from "react-router-dom";

import {
  Card,
  MovieBackdrop,
  MovieGallery,
  MovieHeader,
} from "@/components/movies";
import {
  Button,
  Container,
  ErrorState,
  Section,
  SectionHeader,
  Skeleton,
} from "@/components/ui";
import { useMovieDetail, useSimilarMovies } from "@/hooks/movies";

export default function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: movieDetail, isLoading, error } = useMovieDetail(Number(id));
  const { data: similarMovies } = useSimilarMovies(Number(id));

  if (isLoading) {
    return (
      <Container className="max-w-5xl py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr]">
          <Skeleton className="aspect-2/3 w-full rounded-2xl" />
          <div className="space-y-6 py-4">
            <Skeleton className="h-12 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <Skeleton className="h-32 w-full" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-32 rounded-xl" />
              <Skeleton className="h-12 w-32 rounded-xl" />
            </div>
          </div>
        </div>
      </Container>
    );
  }

  if (error || !movieDetail) {
    return (
      <Container className="max-w-5xl py-12">
        <ErrorState
          message="상세 정보를 불러오는 중 오류가 발생했습니다."
          onRetry={() => location.reload()}
        >
          <div className="mt-4">
            <Button onClick={() => navigate(-1)}>이전 페이지로</Button>
          </div>
        </ErrorState>
      </Container>
    );
  }

  return (
    <div className="relative min-h-screen pb-20">
      <MovieBackdrop
        images={movieDetail.images?.backdrops}
        backdropPath={movieDetail.backdrop_path}
      />

      <Container className="relative max-w-6xl px-4 py-8 md:py-12">
        <MovieHeader movie={movieDetail} navigate={navigate} />

        {/* Similar Movies */}
        {similarMovies && similarMovies.length > 0 && (
          <div className="mt-24 border-t border-neutral-200 pt-16 dark:border-neutral-800">
            <Section header={<SectionHeader title="이 영화와 비슷한 작품" />}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {similarMovies.slice(0, 10).map((movie) => (
                  <Card key={movie.id} movie={movie} />
                ))}
              </div>
            </Section>
          </div>
        )}

        <MovieGallery images={movieDetail.images?.backdrops} />
      </Container>
    </div>
  );
}
