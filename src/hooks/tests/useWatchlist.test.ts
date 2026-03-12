import { renderHook, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { useWatchlist } from "../useWatchlist";
import type { WatchlistItem } from "../../types/movies.ts";

const mockItem: WatchlistItem = {
  id: 1,
  title: "Inception",
  poster_path: "/inception.jpg",
  vote_average: 8.8,
  release_date: "2010-07-16",
  media_type: "movie",
  genre_ids: [28],
  overview: "A mind-bending thriller.",
  backdrop_path: "/inception-backdrop.jpg",
  adult: false,
  original_language: "en",
  popularity: 95.4,
  vote_count: 32000,
  original_title: "Inception",
  video: false,
};

describe("useWatchlist hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("initializes with empty watchlist", () => {
    const { result } = renderHook(() => useWatchlist());
    expect(result.current.watchlist).toEqual([]);
  });

  it("loads existing watchlist from localStorage", () => {
    localStorage.setItem("movie-browser-watchlist", JSON.stringify([mockItem]));
    const { result } = renderHook(() => useWatchlist());
    expect(result.current.watchlist).toHaveLength(1);
    expect(result.current.watchlist[0].id).toBe(1);
  });

  it("returns empty array when localStorage contains invalid JSON", () => {
    localStorage.setItem("movie-browser-watchlist", "not-valid-json");
    const { result } = renderHook(() => useWatchlist());
    expect(result.current.watchlist).toEqual([]);
  });

  it("addToWatchlist adds an item", () => {
    const { result } = renderHook(() => useWatchlist());
    act(() => {
      result.current.addToWatchlist(mockItem);
    });
    expect(result.current.watchlist).toHaveLength(1);
    expect(result.current.watchlist[0].id).toBe(1);
  });

  it("addToWatchlist does not add duplicate items", () => {
    const { result } = renderHook(() => useWatchlist());
    act(() => {
      result.current.addToWatchlist(mockItem);
      result.current.addToWatchlist(mockItem);
    });
    expect(result.current.watchlist).toHaveLength(1);
  });

  it("addToWatchlist persists to localStorage", () => {
    const { result } = renderHook(() => useWatchlist());
    act(() => {
      result.current.addToWatchlist(mockItem);
    });
    const stored = JSON.parse(
      localStorage.getItem("movie-browser-watchlist") ?? "[]",
    );
    expect(stored).toHaveLength(1);
  });

  it("removeFromWatchlist removes an item", () => {
    const { result } = renderHook(() => useWatchlist());
    act(() => {
      result.current.addToWatchlist(mockItem);
    });
    act(() => {
      result.current.removeFromWatchlist(1);
    });
    expect(result.current.watchlist).toHaveLength(0);
  });

  it("removeFromWatchlist persists removal to localStorage", () => {
    const { result } = renderHook(() => useWatchlist());
    act(() => {
      result.current.addToWatchlist(mockItem);
    });
    act(() => {
      result.current.removeFromWatchlist(1);
    });
    const stored = JSON.parse(
      localStorage.getItem("movie-browser-watchlist") ?? "[]",
    );
    expect(stored).toHaveLength(0);
  });

  it("isInWatchlist returns true for added item", () => {
    const { result } = renderHook(() => useWatchlist());
    act(() => {
      result.current.addToWatchlist(mockItem);
    });
    expect(result.current.isInWatchlist(1)).toBe(true);
  });

  it("isInWatchlist returns false for item not in watchlist", () => {
    const { result } = renderHook(() => useWatchlist());
    expect(result.current.isInWatchlist(999)).toBe(false);
  });

  it("clearWatchlist removes all items", () => {
    const { result } = renderHook(() => useWatchlist());
    act(() => {
      result.current.addToWatchlist(mockItem);
      result.current.addToWatchlist({ ...mockItem, id: 2 });
    });
    act(() => {
      result.current.clearWatchlist();
    });
    expect(result.current.watchlist).toHaveLength(0);
  });

  it("clearWatchlist removes key from localStorage", () => {
    const { result } = renderHook(() => useWatchlist());
    act(() => {
      result.current.addToWatchlist(mockItem);
    });
    act(() => {
      result.current.clearWatchlist();
    });
    expect(localStorage.getItem("movie-browser-watchlist")).toBeNull();
  });
});
