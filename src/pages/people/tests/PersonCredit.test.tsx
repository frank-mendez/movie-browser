import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PersonCredit from "../PersonCredit.tsx";

vi.mock("../../../api/people/query/usePeopleQuery.ts", () => ({
  usePersonCreditsQuery: () => ({
    data: {
      cast: [
        {
          id: 101,
          credit_id: "c1",
          title: "Movie One",
          character: "Hero",
          poster_path: "/poster1.jpg",
          popularity: 90,
          media_type: "movie",
          genre_ids: [],
          original_language: "en",
          overview: "",
          vote_average: 7,
          vote_count: 100,
          adult: false,
        },
        {
          id: 102,
          credit_id: "c2",
          name: "Show Two",
          character: "Villain",
          poster_path: "/poster2.jpg",
          popularity: 80,
          media_type: "tv",
          genre_ids: [],
          original_language: "en",
          overview: "",
          vote_average: 8,
          vote_count: 200,
          adult: false,
        },
        {
          id: 103,
          credit_id: "c3",
          title: "No Poster Film",
          character: "Extra",
          poster_path: null,
          popularity: 10,
          media_type: "movie",
          genre_ids: [],
          original_language: "en",
          overview: "",
          vote_average: 5,
          vote_count: 50,
          adult: false,
        },
      ],
      crew: [],
      id: 1,
    },
    isPending: false,
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/people/1"]}>
        <Routes>
          <Route path="/people/:personId" element={<PersonCredit />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

describe("PersonCredit", () => {
  it("renders credit titles with poster paths", () => {
    renderComponent();
    expect(screen.getByText("Movie One")).toBeInTheDocument();
    expect(screen.getByText("Show Two")).toBeInTheDocument();
  });

  it("renders character names", () => {
    renderComponent();
    expect(screen.getByText("Hero")).toBeInTheDocument();
    expect(screen.getByText("Villain")).toBeInTheDocument();
  });

  it("filters out credits without a poster path", () => {
    renderComponent();
    expect(screen.queryByText("No Poster Film")).not.toBeInTheDocument();
  });

  it("sorts credits by popularity (highest first)", () => {
    renderComponent();
    const titles = screen
      .getAllByRole("button")
      .map((btn) => btn.textContent ?? "");
    const movieOneIndex = titles.findIndex((t) => t.includes("Movie One"));
    const showTwoIndex = titles.findIndex((t) => t.includes("Show Two"));
    expect(movieOneIndex).toBeLessThan(showTwoIndex);
  });
});
