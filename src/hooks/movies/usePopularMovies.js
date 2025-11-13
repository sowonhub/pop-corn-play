// [7-2-1단계] 인기 영화 데이터를 가져오는 훅
import { getPopularMovies } from "@/services/movie-database";
import useFetch from "../useFetch.js";

export default function usePopularMovies(page = 1) {
  return useFetch(({ signal }) => getPopularMovies(page, { signal }), [page]);
}
