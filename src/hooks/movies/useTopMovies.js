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
