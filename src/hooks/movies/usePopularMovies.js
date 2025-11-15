// [4-1단계] 인기 영화 데이터 조회 훅 - React Query로 상태 관리
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "@/services/movie-database";

export default function usePopularMovies(page = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popularMovies", page],
    queryFn: ({ signal }) => getPopularMovies(page, { signal }),
  });

  return { data, isLoading, error };
}
