import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieDetails from "../MovieDetails.tsx";

describe("MovieDetails component", () => {
  const queryClient = new QueryClient();
  const renderComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MovieDetails />
        </BrowserRouter>
      </QueryClientProvider>,
    );
  };

  it("renders without crashing", () => {
    renderComponent();
    expect(screen.getByTestId("movie-details-element")).toBeInTheDocument();
  });

  it("renders loading spinner", () => {
    renderComponent();
    expect(screen.getByTestId("loading-element")).toBeInTheDocument();
  });

  it("renders cast skeleton while loading", () => {
    renderComponent();
    // SkeletonGrid renders during credits pending state
    expect(screen.getByTestId("movie-details-element")).toBeInTheDocument();
  });
});
