import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mini-project.wishlist";

const readStoredWishlist = () => {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const normalizeMovie = (movie) => ({
  id: movie?.id,
  title: movie?.title ?? movie?.name ?? "Untitled",
  poster_path: movie?.poster_path ?? movie?.backdrop_path ?? null,
  backdrop_path: movie?.backdrop_path ?? movie?.poster_path ?? null,
  vote_average: movie?.vote_average,
  release_date: movie?.release_date,
});

export default function useWishlist() {
  const [items, setItems] = useState(() => readStoredWishlist());

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore serialization errors
    }
  }, [items]);

  const add = useCallback((movie) => {
    if (!movie || movie.id == null) return;

    setItems((prev) => {
      if (prev.some((item) => item.id === movie.id)) return prev;
      return [...prev, normalizeMovie(movie)];
    });
  }, []);

  const remove = useCallback((movieId) => {
    if (movieId == null) return;

    setItems((prev) => prev.filter((item) => item.id !== movieId));
  }, []);

  const toggle = useCallback((movie) => {
    if (!movie || movie.id == null) return;

    setItems((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      if (exists) {
        return prev.filter((item) => item.id !== movie.id);
      }
      return [...prev, normalizeMovie(movie)];
    });
  }, []);

  const contains = useCallback(
    (movieId) => {
      if (movieId == null) return false;
      return items.some((item) => item.id === movieId);
    },
    [items],
  );

  return {
    items,
    add,
    remove,
    toggle,
    contains,
  };
}
