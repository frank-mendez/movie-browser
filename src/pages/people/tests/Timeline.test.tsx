import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import Timeline from "../Timeline.tsx";
import {
  makePeopleQueryClient,
  renderPeopleRoute,
} from "./peopleTestUtils.tsx";

vi.mock("../../../api/people/query/usePeopleQuery.ts", () => ({
  usePersonCreditsQuery: () => ({
    data: {
      cast: [
        {
          id: 101,
          credit_id: "c1",
          title: "Movie One",
          character: "Hero",
          release_date: "2020-05-01",
          popularity: 90,
          media_type: "movie",
          poster_path: "/poster1.jpg",
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
          character: "Lead",
          first_air_date: "2019-03-10",
          popularity: 80,
          media_type: "tv",
          poster_path: "/poster2.jpg",
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
          title: "Same Year Film",
          character: "Sidekick",
          release_date: "2020-11-20",
          popularity: 70,
          media_type: "movie",
          poster_path: "/poster3.jpg",
          genre_ids: [],
          original_language: "en",
          overview: "",
          vote_average: 6,
          vote_count: 80,
          adult: false,
        },
      ],
      crew: [],
      id: 1,
    },
    isPending: false,
  }),
}));

const queryClient = makePeopleQueryClient();
const renderComponent = () => renderPeopleRoute(<Timeline />, queryClient);

describe("Timeline", () => {
  it("renders year markers", () => {
    renderComponent();
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("2019")).toBeInTheDocument();
  });

  it("renders credit titles grouped by year", () => {
    renderComponent();
    expect(screen.getByText("Movie One")).toBeInTheDocument();
    expect(screen.getByText("Show Two")).toBeInTheDocument();
    expect(screen.getByText("Same Year Film")).toBeInTheDocument();
  });

  it("renders years in descending order", () => {
    renderComponent();
    const badges = screen.getAllByText(/^20\d\d$/);
    const years = badges.map((el) => Number.parseInt(el.textContent ?? "0"));
    for (let i = 0; i < years.length - 1; i++) {
      expect(years[i]).toBeGreaterThanOrEqual(years[i + 1]);
    }
  });

  it("renders character attribution", () => {
    renderComponent();
    expect(screen.getByText(/as Hero/)).toBeInTheDocument();
    expect(screen.getByText(/as Lead/)).toBeInTheDocument();
  });
});
