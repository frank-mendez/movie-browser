import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Search from "../Search.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Search component", () => {
  const queryClient = new QueryClient();
  const searchComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </QueryClientProvider>,
    );
  };
  it("renders without crashing", () => {
    searchComponent();
    expect(screen.getByTestId("search-result")).toBeInTheDocument();
  });
  it("renders search input", () => {
    searchComponent();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });
});
