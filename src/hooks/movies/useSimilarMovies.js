import { useQuery } from "@tanstack/react-query";
import { getSimilarMovies } from "@/services/movie-database";

export default function useSimilarMovies(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["similarMovies", id],
    queryFn: ({ signal }) => getSimilarMovies(id, { signal }),
    enabled: Boolean(id),
  });

  return { data: data?.results ?? [], isLoading, error };
}

