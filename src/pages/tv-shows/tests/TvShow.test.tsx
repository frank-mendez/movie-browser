import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import TvShow from "../TvShow.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Home component", () => {
  const queryClient = new QueryClient();
  const tvShowComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TvShow />
        </BrowserRouter>
      </QueryClientProvider>,
    );
  };
  it("renders without crashing", () => {
    tvShowComponent();
    expect(screen.getByTestId("tvshow-element")).toBeInTheDocument();
  });

  it("contains the expected searchbar", () => {
    tvShowComponent();
    expect(screen.getByTestId("searchbar-element")).toBeInTheDocument();
  });
});
