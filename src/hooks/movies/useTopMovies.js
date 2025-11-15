// [4-2단계] 트렌딩 영화 데이터 조회 훅 - React Query로 상태 관리
import { useQuery } from "@tanstack/react-query";
import { getTopMovies } from "@/services/movie-database";

export default function useTopMovies() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["topMovies"],
    queryFn: ({ signal }) => getTopMovies({ signal }),
  });

  return {
    data: (data?.results ?? []).slice(0, 10),
    isLoading,
    error,
  };
}
