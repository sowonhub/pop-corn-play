import { useDatabaseAuth } from "@/auth/context";
import { useCallback, useEffect, useState } from "react";

const BASE_KEY = "mini-project.wishlist";
const listeners = new Set();

// Global state to sync between components in the same session
let globalState = {
  userId: null,
  items: [],
};

const getStorageKey = (userId) => (userId ? `${BASE_KEY}.${userId}` : null);

const readStoredWishlist = (userId) => {
  if (!userId || typeof window === "undefined") return [];

  try {
    const key = getStorageKey(userId);
    const stored = window.localStorage.getItem(key);
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

const persistWishlist = (userId, nextItems) => {
  if (!userId || typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      getStorageKey(userId),
      JSON.stringify(nextItems),
    );
  } catch {
    return;
  }
};

const notifyListeners = (items) => {
  listeners.forEach((listener) => listener(items));
};

const updateGlobalState = (userId, nextItems) => {
  globalState = { userId, items: nextItems };
  persistWishlist(userId, nextItems);
  notifyListeners(nextItems);
};

export default function useWishlist() {
  const { user } = useDatabaseAuth();
  const userId = user?.id ?? null;

  // Initialize state based on current user and global state
  const [items, setItems] = useState(() => {
    if (globalState.userId === userId) {
      return globalState.items;
    }
    return readStoredWishlist(userId);
  });

  // Sync with global state and handle user changes
  useEffect(() => {
    // Update global state if user switched
    if (globalState.userId !== userId) {
      const newItems = readStoredWishlist(userId);
      globalState = { userId, items: newItems };
      // Notify others effectively resets them to the new user's list
      notifyListeners(newItems);
    }

    // Update local state if it differs (e.g. initially loaded from storage vs global)
    if (items !== globalState.items) {
      setItems(globalState.items);
    }

    const handleChange = (nextItems) => {
      setItems(nextItems);
    };

    listeners.add(handleChange);

    // Handle multi-tab sync
    const handleStorageEvent = (event) => {
      if (event.key === getStorageKey(userId)) {
        const newItems = readStoredWishlist(userId);
        if (globalState.userId === userId) {
          globalState.items = newItems;
          notifyListeners(newItems);
        }
      }
    };

    window.addEventListener("storage", handleStorageEvent);

    return () => {
      listeners.delete(handleChange);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, [userId]); // Re-run when user changes

  const add = useCallback(
    (movie) => {
      if (!userId || !movie || movie.id == null) return;

      const prev = globalState.items;
      if (prev.some((item) => item.id === movie.id)) return;

      const nextItems = [...prev, normalizeMovie(movie)];
      updateGlobalState(userId, nextItems);
    },
    [userId],
  );

  const remove = useCallback(
    (movieId) => {
      if (!userId || movieId == null) return;

      const prev = globalState.items;
      const nextItems = prev.filter((item) => item.id !== movieId);

      if (prev.length === nextItems.length) return; // No change

      updateGlobalState(userId, nextItems);
    },
    [userId],
  );

  const toggle = useCallback(
    (movie) => {
      if (!userId || !movie || movie.id == null) return;

      const prev = globalState.items;
      const exists = prev.some((item) => item.id === movie.id);

      let nextItems;
      if (exists) {
        nextItems = prev.filter((item) => item.id !== movie.id);
      } else {
        nextItems = [...prev, normalizeMovie(movie)];
      }

      updateGlobalState(userId, nextItems);
    },
    [userId],
  );

  const contains = useCallback(
    (movieId) => {
      if (!userId || movieId == null) return false;
      return items.some((item) => item.id === movieId);
    },
    [items, userId],
  );

  return {
    items,
    add,
    remove,
    toggle,
    contains,
  };
}
