import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Movies from "../Movies.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Movies component", () => {
  const queryClient = new QueryClient();
  const movieComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Movies />
        </BrowserRouter>
      </QueryClientProvider>,
    );
  };
  it("renders without crashing", () => {
    movieComponent();
    expect(screen.getByTestId("movies-element")).toBeInTheDocument();
  });

  it("contains the expected searchbar", () => {
    movieComponent();
    expect(screen.getByTestId("searchbar-element")).toBeInTheDocument();
  });
});
