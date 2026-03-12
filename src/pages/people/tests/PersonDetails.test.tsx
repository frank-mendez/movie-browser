import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PersonDetails from "../PersonDetails.tsx";

vi.mock("../../../api/people/query/usePeopleQuery.ts", () => ({
  usePersonDetailsQuery: () => ({
    data: {
      id: 1,
      name: "Test Person",
      biography: "A great biography. ".repeat(40), // longer than 600 chars to trigger Read More
      birthday: "1990-01-15",
      deathday: null,
      gender: 2,
      known_for_department: "Acting",
      place_of_birth: "Los Angeles, CA",
      popularity: 85.3,
      profile_path: "/test.jpg",
      also_known_as: ["Test Alias", "Another Name"],
    },
    isPending: false,
  }),
  usePersonCreditsQuery: () => ({
    data: { cast: [], crew: [], id: 1 },
    isPending: false,
  }),
  usePersonExternalIdsQuery: () => ({
    data: {
      facebook_id: null,
      instagram_id: null,
      twitter_id: null,
      youtube_id: null,
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
          <Route path="/people/:personId" element={<PersonDetails />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

describe("PersonDetails", () => {
  it("renders person name", () => {
    renderComponent();
    expect(screen.getByText("Test Person")).toBeInTheDocument();
  });

  it("renders known for department", () => {
    renderComponent();
    expect(screen.getAllByText("Acting").length).toBeGreaterThan(0);
  });

  it("renders place of birth", () => {
    renderComponent();
    expect(screen.getByText("Los Angeles, CA")).toBeInTheDocument();
  });

  it("renders Personal Info section heading", () => {
    renderComponent();
    expect(screen.getByText("Personal Info")).toBeInTheDocument();
  });

  it("shows also-known-as aliases as badges", () => {
    renderComponent();
    expect(screen.getByText("Test Alias")).toBeInTheDocument();
    expect(screen.getByText("Another Name")).toBeInTheDocument();
  });

  it("truncates long biography and shows Read more button", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: /read more/i }),
    ).toBeInTheDocument();
  });

  it("expands biography when Read more is clicked", () => {
    renderComponent();
    const btn = screen.getByRole("button", { name: /read more/i });
    fireEvent.click(btn);
    expect(
      screen.getByRole("button", { name: /show less/i }),
    ).toBeInTheDocument();
  });

  it("renders section headings for Known For and Career Timeline", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: "Known For" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Career Timeline" }),
    ).toBeInTheDocument();
  });
});
