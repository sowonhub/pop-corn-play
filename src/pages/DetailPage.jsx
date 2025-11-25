import {
  MovieBackdrop,
  MovieGallery,
  MovieGrid,
  MovieHeader,
} from "@/components/movies";
import DetailPageError from "@/components/movies/detail/DetailPageError";
import DetailPageSkeleton from "@/components/movies/detail/DetailPageSkeleton";
import { Container, Section, SectionHeader } from "@/components/ui";
import { useMovieDetail, useSimilarMovies } from "@/hooks/movies";
import { useNavigate, useParams } from "react-router-dom";

const SIMILAR_MOVIES_LIMIT = 10;

export default function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: movieDetail, isLoading, error } = useMovieDetail(Number(id));
  const { data: similarMovies } = useSimilarMovies(Number(id));

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  if (error || !movieDetail) {
    return (
      <DetailPageError
        onRetry={() => location.reload()}
        onBack={() => navigate(-1)}
      />
    );
  }

  return (
    <div className="relative isolate min-h-screen pb-20">
      <MovieBackdrop
        images={movieDetail.images?.backdrops}
        backdropPath={movieDetail.backdrop_path}
      />

      <Container className="relative max-w-6xl px-8 py-8 md:py-12">
        <MovieHeader movie={movieDetail} navigate={navigate} />

        {similarMovies && similarMovies.length > 0 && (
          <div className="mt-24 border-t border-neutral-200 pt-16 dark:border-neutral-800">
            <Section header={<SectionHeader title="이 영화와 비슷한 작품" />}>
              <MovieGrid
                movies={similarMovies.slice(0, SIMILAR_MOVIES_LIMIT)}
              />
            </Section>
          </div>
        )}

        <MovieGallery images={movieDetail.images?.backdrops} />
      </Container>
    </div>
  );
}
