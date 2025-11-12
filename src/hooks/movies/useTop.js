// [7-1-1단계] 인기 영화 데이터를 가져오는 훅
import { getTrendingMovies } from "@/services/movie-database";
import useFetch from "../useFetch.js";

export default function useTop() {
  const { data, loading, error } = useFetch(
    ({ signal }) => getTrendingMovies({ signal }),
    [],
  );

  return {
    data: (data?.results ?? []).slice(0, 10),
    loading,
    error,
  };
}
