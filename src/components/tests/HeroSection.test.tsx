import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import HeroSection from "../HeroSection";

const mockMovie = {
  id: 1,
  title: "Inception",
  backdrop_path: "/inception_bg.jpg",
  poster_path: "/inception.jpg",
  overview: "A mind-bending thriller.",
  vote_average: 8.8,
  vote_count: 10000,
  release_date: "2010-07-16",
  media_type: "movie",
  adult: false,
  original_language: "en",
  original_title: "Inception",
  genre_ids: [28, 878],
  popularity: 99.9,
};

const renderComponent = (props = {}) =>
  render(
    <BrowserRouter>
      <HeroSection movie={mockMovie} {...props} />
    </BrowserRouter>,
  );

describe("HeroSection component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders without crashing", () => {
    const { container } = renderComponent();
    expect(container.firstChild).toBeInTheDocument();
  });

  it("displays the movie title", () => {
    renderComponent();
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("displays the overview", () => {
    renderComponent();
    expect(screen.getByText("A mind-bending thriller.")).toBeInTheDocument();
  });

  it("displays the rating", () => {
    renderComponent();
    expect(screen.getByText("★ 8.8")).toBeInTheDocument();
  });

  it("renders Movie badge for movie media type", () => {
    renderComponent();
    expect(screen.getByText("Movie")).toBeInTheDocument();
  });

  it("renders TV Show badge for tv media type", () => {
    renderComponent({
      movie: {
        ...mockMovie,
        media_type: "tv",
        name: "Breaking Bad",
        title: undefined,
      },
    });
    expect(screen.getByText("TV Show")).toBeInTheDocument();
  });

  it("uses movie name when title is undefined", () => {
    renderComponent({
      movie: { ...mockMovie, name: "Breaking Bad", title: undefined },
    });
    expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
  });

  it("renders Watchlist button when not in watchlist", () => {
    renderComponent();
    expect(screen.getByText("Watchlist")).toBeInTheDocument();
  });

  it("toggles watchlist state when Watchlist is clicked", () => {
    renderComponent();
    const btn = screen.getByText("Watchlist");
    fireEvent.click(btn);
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  it("removes from watchlist when Saved is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Watchlist"));
    fireEvent.click(screen.getByText("Saved"));
    expect(screen.getByText("Watchlist")).toBeInTheDocument();
  });

  it("calls onPlayTrailer when Watch Trailer button is clicked", () => {
    const onPlayTrailer = vi.fn();
    renderComponent({ onPlayTrailer });
    fireEvent.click(screen.getByText("Watch Trailer"));
    expect(onPlayTrailer).toHaveBeenCalledTimes(1);
  });

  it("renders View Details button", () => {
    renderComponent();
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });

  it("navigates to movie details on View Details click", () => {
    renderComponent();
    fireEvent.click(screen.getByText("View Details"));
    expect(globalThis.location.pathname).toBe("/movies/1");
  });

  it("navigates to tv-show details for tv media type", () => {
    renderComponent({
      movie: {
        ...mockMovie,
        id: 99,
        media_type: "tv",
        name: "Show",
        title: undefined,
      },
    });
    fireEvent.click(screen.getByText("View Details"));
    expect(globalThis.location.pathname).toBe("/tv-shows/99");
  });

  it("renders backdrop image when backdrop_path is provided", () => {
    renderComponent();
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });

  it("renders fallback div when backdrop_path is missing", () => {
    const { container } = renderComponent({
      movie: { ...mockMovie, backdrop_path: null },
    });
    expect(container.querySelector(".bg-base-200")).toBeInTheDocument();
  });
});
