import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Watchlist from "../Watchlist";

const queryClient = new QueryClient();

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Watchlist />
      </BrowserRouter>
    </QueryClientProvider>,
  );

describe("Watchlist page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders without crashing", () => {
    renderComponent();
    expect(screen.getByTestId("watchlist-element")).toBeInTheDocument();
  });

  it("shows empty state when watchlist is empty", () => {
    renderComponent();
    expect(screen.getByText("Your watchlist is empty")).toBeInTheDocument();
    expect(screen.getByText("0 titles saved")).toBeInTheDocument();
  });

  it("renders watchlist items when items exist", () => {
    localStorage.setItem(
      "movie-browser-watchlist",
      JSON.stringify([
        {
          id: 1,
          title: "Inception",
          poster_path: "/inception.jpg",
          vote_average: 8.8,
          release_date: "2010-07-16",
          media_type: "movie",
          genre_ids: [28],
          overview: "A mind-bending thriller.",
        },
      ]),
    );
    renderComponent();
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("1 title saved")).toBeInTheDocument();
  });

  it("shows 'titles' plural when multiple items", () => {
    localStorage.setItem(
      "movie-browser-watchlist",
      JSON.stringify([
        {
          id: 1,
          title: "Inception",
          poster_path: "/inception.jpg",
          vote_average: 8.8,
          release_date: "2010-07-16",
          media_type: "movie",
          genre_ids: [],
          overview: "",
        },
        {
          id: 2,
          title: "Interstellar",
          poster_path: "/interstellar.jpg",
          vote_average: 8.6,
          release_date: "2014-11-07",
          media_type: "movie",
          genre_ids: [],
          overview: "",
        },
      ]),
    );
    renderComponent();
    expect(screen.getByText("2 titles saved")).toBeInTheDocument();
  });

  it("shows Clear All button when items exist", () => {
    localStorage.setItem(
      "movie-browser-watchlist",
      JSON.stringify([
        {
          id: 1,
          title: "Inception",
          poster_path: null,
          vote_average: 8,
          release_date: "2010-07-16",
          media_type: "movie",
          genre_ids: [],
          overview: "",
        },
      ]),
    );
    renderComponent();
    expect(screen.getByText("Clear All")).toBeInTheDocument();
  });

  it("does not show Clear All button when watchlist is empty", () => {
    renderComponent();
    expect(screen.queryByText("Clear All")).not.toBeInTheDocument();
  });

  it("clears all items when Clear All is clicked", () => {
    localStorage.setItem(
      "movie-browser-watchlist",
      JSON.stringify([
        {
          id: 1,
          title: "Inception",
          poster_path: null,
          vote_average: 8,
          release_date: "2010-07-16",
          media_type: "movie",
          genre_ids: [],
          overview: "",
        },
      ]),
    );
    renderComponent();
    fireEvent.click(screen.getByText("Clear All"));
    expect(screen.getByText("Your watchlist is empty")).toBeInTheDocument();
  });

  it("navigates to movies when a movie item is clicked", () => {
    localStorage.setItem(
      "movie-browser-watchlist",
      JSON.stringify([
        {
          id: 42,
          title: "The Dark Knight",
          poster_path: null,
          vote_average: 9.0,
          release_date: "2008-07-18",
          media_type: "movie",
          genre_ids: [],
          overview: "",
        },
      ]),
    );
    renderComponent();
    fireEvent.click(screen.getByText("The Dark Knight"));
    expect(window.location.pathname).toBe("/movies/42");
  });

  it("navigates to tv-shows when a TV item is clicked", () => {
    localStorage.setItem(
      "movie-browser-watchlist",
      JSON.stringify([
        {
          id: 99,
          name: "Breaking Bad",
          poster_path: null,
          vote_average: 9.5,
          first_air_date: "2008-01-20",
          media_type: "tv",
          genre_ids: [],
          overview: "",
        },
      ]),
    );
    renderComponent();
    fireEvent.click(screen.getByText("Breaking Bad"));
    expect(window.location.pathname).toBe("/tv-shows/99");
  });

  it("removes item from watchlist when remove button is clicked", () => {
    localStorage.setItem(
      "movie-browser-watchlist",
      JSON.stringify([
        {
          id: 1,
          title: "Inception",
          poster_path: null,
          vote_average: 8.8,
          release_date: "2010-07-16",
          media_type: "movie",
          genre_ids: [],
          overview: "",
        },
      ]),
    );
    renderComponent();
    const removeBtn = screen.getByLabelText("Remove Inception from watchlist");
    fireEvent.click(removeBtn);
    expect(screen.queryByText("Inception")).not.toBeInTheDocument();
  });

  it("renders placeholder when no poster_path", () => {
    localStorage.setItem(
      "movie-browser-watchlist",
      JSON.stringify([
        {
          id: 1,
          title: "No Poster",
          poster_path: null,
          vote_average: 5.0,
          release_date: "2020-01-01",
          media_type: "movie",
          genre_ids: [],
          overview: "",
        },
      ]),
    );
    renderComponent();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
