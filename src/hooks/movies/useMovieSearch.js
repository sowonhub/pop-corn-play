// [4-3단계] 영화 검색 데이터 조회 훅 - React Query로 상태 관리 (조건부 실행)
// 주의: useQuery는 React Query의 훅 이름, searchKeyword는 검색어를 의미
import { useQuery } from "@tanstack/react-query";
import { EMPTY_SEARCH_RESULT, getMovieSearch } from "@/services/movie-database";

export default function useMovieSearch(searchKeyword, page = 1) {
  const trimmedKeyword = (searchKeyword || "").trim();
  const hasKeyword = Boolean(trimmedKeyword);

  const { data, isLoading, error } = useQuery({
    queryKey: ["movieSearch", trimmedKeyword, page],
    queryFn: ({ signal }) =>
      hasKeyword
        ? getMovieSearch(trimmedKeyword, page, { signal })
        : Promise.resolve(EMPTY_SEARCH_RESULT),
    enabled: hasKeyword,
  });

  if (!hasKeyword) {
    return { data: null, isLoading: false, error: null };
  }

  return { data, isLoading, error };
}
