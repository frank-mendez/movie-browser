import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import People from "../People.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Home component", () => {
  const queryClient = new QueryClient();
  const peopleComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <People />
        </BrowserRouter>
      </QueryClientProvider>,
    );
  };
  it("renders without crashing", () => {
    peopleComponent();
    expect(screen.getByTestId("people-element")).toBeInTheDocument();
  });

  it("contains the expected content", () => {
    peopleComponent();
    expect(screen.getByTestId("searchbar-element")).toBeInTheDocument();
  });
});
