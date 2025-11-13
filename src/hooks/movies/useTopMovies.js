// [7-1-1단계] 인기 영화 데이터를 가져오는 훅
import { getTopMovies } from "@/services/movie-database";
import useFetch from "../useFetch.js";

export default function useTopMovies() {
  const { data, loading, error } = useFetch(
    ({ signal }) => getTopMovies({ signal }),
    [],
  );

  return {
    data: (data?.results ?? []).slice(0, 10),
    loading,
    error,
  };
}
