import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import MovieCard from "../MovieCard.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MediaTypeEnum } from "../../enums/MovieTabEnum.ts";

const queryClient = new QueryClient();

const renderCard = (movies: object[], extra = {}) =>
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MovieCard
          mediaType={MediaTypeEnum.MOVIE}
          movies={movies as never}
          {...extra}
        />
      </BrowserRouter>
    </QueryClientProvider>,
  );

describe("MovieCard", () => {
  const baseMovie = {
    backdrop_path: "/bg.jpg",
    id: 762441,
    title: "A Quiet Place: Day One",
    original_title: "A Quiet Place: Day One",
    overview: "Sci-fi horror film.",
    poster_path: "/poster.jpg",
    media_type: "movie",
    adult: false,
    original_language: "en",
    genre_ids: [27, 878, 53],
    popularity: 1899.794,
    release_date: "2024-06-26",
    video: false,
    vote_average: 7,
    vote_count: 724,
  };

  it("renders movie information correctly", () => {
    renderCard([baseMovie], {
      genreMapByType: {
        movie: { 27: "Horror", 878: "Science Fiction", 53: "Thriller" },
      },
    });
    expect(screen.getByText("A Quiet Place: Day One")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Horror · Science Fiction")).toBeInTheDocument();
    expect(screen.getByText("70%")).toBeInTheDocument();
  });

  it("renders TV show using name and first_air_date", () => {
    const tvMovie = {
      ...baseMovie,
      id: 1,
      title: undefined,
      name: "Breaking Bad",
      media_type: "tv",
      release_date: undefined,
      first_air_date: "2008-01-20",
      genre_ids: [18],
    };
    renderCard([tvMovie], {
      genreMapByType: { tv: { 18: "Drama" } },
    });
    expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
    expect(screen.getByText("2008")).toBeInTheDocument();
    expect(screen.getByText("Drama")).toBeInTheDocument();
  });

  it("renders nothing for unsupported media_type", () => {
    const { container } = renderCard([{ ...baseMovie, media_type: "person" }]);
    expect(container.querySelector("button")).toBeNull();
  });

  it("uses mediaType prop when movie.media_type is absent", () => {
    const noMediaType = { ...baseMovie, media_type: undefined };
    renderCard([noMediaType]);
    expect(screen.getByText("A Quiet Place: Day One")).toBeInTheDocument();
  });

  it("renders placeholder when no poster_path", () => {
    renderCard([{ ...baseMovie, poster_path: null }]);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders without year when no release or air date", () => {
    renderCard([
      { ...baseMovie, release_date: undefined, first_air_date: undefined },
    ]);
    expect(screen.queryByText(/^\d{4}$/)).not.toBeInTheDocument();
  });

  it("renders without genres when no genre map", () => {
    renderCard([baseMovie]);
    expect(screen.queryByText("Horror")).not.toBeInTheDocument();
  });

  it("uses movie.name as alt fallback when title is undefined", () => {
    renderCard([{ ...baseMovie, title: undefined, name: "Fallback Name" }]);
    expect(screen.getByText("Fallback Name")).toBeInTheDocument();
  });

  it("navigates to tv-shows route on tv item click", () => {
    const tvMovie = {
      ...baseMovie,
      id: 42,
      media_type: "tv",
      name: "Show",
      title: undefined,
    };
    renderCard([tvMovie]);
    fireEvent.click(screen.getByRole("button"));
    expect(window.location.pathname).toBe("/tv-shows/42");
  });

  it("navigates to movies route on movie click", () => {
    renderCard([baseMovie]);
    fireEvent.click(screen.getByRole("button"));
    expect(window.location.pathname).toBe("/movies/762441");
  });
});
