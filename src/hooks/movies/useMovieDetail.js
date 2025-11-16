import { useQuery } from "@tanstack/react-query";
import { getMovieDetail } from "@/services/movie-database";

export default function useMovieDetail(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movieDetail", id],
    queryFn: ({ signal }) => getMovieDetail(id, { signal }),
    enabled: Boolean(id),
  });

  if (!id) {
    return { data: null, isLoading: false, error: null };
  }

  return { data, isLoading, error };
}
