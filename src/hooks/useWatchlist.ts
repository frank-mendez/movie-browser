import { useState, useCallback } from "react";
import { WatchlistItem } from "../types/movies.ts";

const WATCHLIST_KEY = "movie-browser-watchlist";

const loadWatchlist = (): WatchlistItem[] => {
  try {
    const data = localStorage.getItem(WATCHLIST_KEY);
    return data ? (JSON.parse(data) as WatchlistItem[]) : [];
  } catch {
    return [];
  }
};

const saveWatchlist = (items: WatchlistItem[]): void => {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(items));
};

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(loadWatchlist);

  const addToWatchlist = useCallback((item: WatchlistItem) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === item.id)) return prev;
      const updated = [...prev, item];
      saveWatchlist(updated);
      return updated;
    });
  }, []);

  const removeFromWatchlist = useCallback((itemId: number) => {
    setWatchlist((prev) => {
      const updated = prev.filter((m) => m.id !== itemId);
      saveWatchlist(updated);
      return updated;
    });
  }, []);

  const isInWatchlist = useCallback(
    (itemId: number) => {
      return watchlist.some((m) => m.id === itemId);
    },
    [watchlist],
  );

  const clearWatchlist = useCallback(() => {
    localStorage.removeItem(WATCHLIST_KEY);
    setWatchlist([]);
  }, []);

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist,
  };
};
