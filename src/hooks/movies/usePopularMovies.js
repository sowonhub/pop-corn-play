import { useInfiniteQuery } from "@tanstack/react-query";
import { getPopularMovies } from "@/services/movie-database";

export default function usePopularMovies() {
  return useInfiniteQuery({
    queryKey: ["popularMovies"],
    queryFn: ({ pageParam = 1, signal }) => getPopularMovies(pageParam, { signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
}
