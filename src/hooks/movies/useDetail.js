// [8-1단계] 영화 상세 정보를 가져오는 커스텀 훅
import { getMovieDetail } from "@/services/movie-database";
import useFetch from "../useFetch.js";

export default function useDetail(id) {
  const { data, loading, error } = useFetch(
    ({ signal }) => getMovieDetail(id, { signal }),
    [id],
  );

  if (!id) {
    return { data: null, loading: false, error: null };
  }

  return { data, loading, error };
}
