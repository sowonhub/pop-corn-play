import { useDatabaseAuth } from "@/auth/context";
import { PATHS } from "@/router";
import { wishlistService } from "@/services/wishlist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const normalizeMovie = (movie) => ({
  id: movie?.id,
  title: movie?.title ?? movie?.name ?? "Untitled",
  poster_path: movie?.poster_path ?? movie?.backdrop_path ?? null,
  backdrop_path: movie?.backdrop_path ?? movie?.poster_path ?? null,
  vote_average: movie?.vote_average,
  release_date: movie?.release_date,
});

export default function useWishlist() {
  const { user, busy: authBusy } = useDatabaseAuth();
  const userId = user?.id ?? null;
  const isAuthenticated = Boolean(userId);
  const isAuthLoading = Boolean(authBusy);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const queryKey = ["wishlist", userId];

  const { data: items = [] } = useQuery({
    queryKey,
    queryFn: () => wishlistService.getItems(userId),
    enabled: !!userId,
    initialData: [],
  });

  const { mutate: addMutate } = useMutation({
    mutationFn: (movie) => wishlistService.addItem(userId, movie),
    onMutate: async (movie) => {
      await queryClient.cancelQueries({ queryKey });
      const previousItems = queryClient.getQueryData(queryKey) || [];

      if (!previousItems.some((item) => item.id === movie.id)) {
        queryClient.setQueryData(queryKey, [movie, ...previousItems]);
      }

      return { previousItems };
    },
    onError: (err, newMovie, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(queryKey, context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { mutate: removeMutate } = useMutation({
    mutationFn: (movieId) => wishlistService.removeItem(userId, movieId),
    onMutate: async (movieId) => {
      await queryClient.cancelQueries({ queryKey });
      const previousItems = queryClient.getQueryData(queryKey) || [];

      queryClient.setQueryData(
        queryKey,
        previousItems.filter((item) => item.id !== movieId),
      );

      return { previousItems };
    },
    onError: (err, movieId, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData(queryKey, context.previousItems);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const add = useCallback(
    (movie) => {
      if (!isAuthenticated) {
        if (!isAuthLoading) {
          navigate(PATHS.LOGIN, { state: { from: location } });
        }
        return;
      }
      const normalized = normalizeMovie(movie);
      addMutate(normalized);
    },
    [isAuthenticated, isAuthLoading, navigate, location, addMutate],
  );

  const remove = useCallback(
    (movieId) => {
      if (!isAuthenticated) {
        if (!isAuthLoading) {
          navigate(PATHS.LOGIN, { state: { from: location } });
        }
        return;
      }
      removeMutate(movieId);
    },
    [isAuthenticated, isAuthLoading, navigate, location, removeMutate],
  );

  const toggle = useCallback(
    (movie) => {
      if (!isAuthenticated) {
        if (!isAuthLoading) {
          navigate(PATHS.LOGIN, { state: { from: location } });
        }
        return;
      }
      const exists = items.some((item) => item.id === movie.id);
      if (exists) {
        remove(movie.id);
      } else {
        add(movie);
      }
    },
    [isAuthenticated, isAuthLoading, navigate, location, items, add, remove],
  );

  const contains = useCallback(
    (movieId) => {
      if (!isAuthenticated) {
        return false;
      }
      return items.some((item) => item.id === movieId);
    },
    [items, isAuthenticated],
  );

  return {
    items,
    add,
    remove,
    toggle,
    contains,
    isAuthenticated,
    isAuthLoading,
  };
}
