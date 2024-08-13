import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {describe, expect, it} from "vitest";
import MovieCard from "../MovieCard.tsx";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {MediaTypeEnum} from "../../enums/MovieTabEnum.ts";

describe("MovieCard", () => {
  const mockMovies = [
    {
      backdrop_path: "/2RVcJbWFmICRDsVxRI8F5xRmRsK.jpg",
      id: 762441,
      title: "A Quiet Place: Day One",
      original_title: "A Quiet Place: Day One",
      overview:
        "As New York City is invaded by alien creatures who hunt by sound, a woman named Sam fights to survive with her cat.",
      poster_path: "/yrpPYKijwdMHyTGIOd1iK1h0Xno.jpg",
      media_type: "movie",
      adult: false,
      original_language: "en",
      genre_ids: [27, 878, 53],
      popularity: 1899.794,
      release_date: "2024-06-26",
      video: false,
      vote_average: 7.0,
      vote_count: 724,
    },
  ];
  const queryClient = new QueryClient();

  const movieCardComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MovieCard mediaType={MediaTypeEnum.MOVIE} movies={mockMovies} />
        </BrowserRouter>
      </QueryClientProvider>,
    );
  };

  it("renders movie information correctly", () => {
    movieCardComponent();

    expect(screen.getByText("A Quiet Place: Day One")).toBeInTheDocument();
    expect(screen.getByText("Release Date: June 26, 2024")).toBeInTheDocument();
    expect(screen.getByTestId("circular-progress-element")).toBeInTheDocument();
  });
});
