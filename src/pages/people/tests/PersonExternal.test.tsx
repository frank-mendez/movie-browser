import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PersonExternal from "../PersonExternal.tsx";

vi.mock("../../../api/people/query/usePeopleQuery.ts", () => ({
  usePersonExternalIdsQuery: () => ({
    data: {
      id: 1,
      facebook_id: "testfb",
      instagram_id: "testig",
      twitter_id: null,
      youtube_id: null,
      freebase_mid: "",
      freebase_id: "",
      imdb_id: "",
      tvrage_id: 0,
      wikidata_id: "",
      tiktok_id: "",
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
          <Route path="/people/:personId" element={<PersonExternal />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

describe("PersonExternal", () => {
  it("renders Facebook and Instagram links when IDs are present", () => {
    renderComponent();
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
  });

  it("does not render X or YouTube links when IDs are absent", () => {
    renderComponent();
    expect(screen.queryByLabelText("X (Twitter)")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("YouTube")).not.toBeInTheDocument();
  });

  it("uses correct href for Facebook link", () => {
    renderComponent();
    const fbLink = screen.getByLabelText("Facebook");
    expect(fbLink).toHaveAttribute("href", "https://facebook.com/testfb");
  });

  it("uses correct href for Instagram link", () => {
    renderComponent();
    const igLink = screen.getByLabelText("Instagram");
    expect(igLink).toHaveAttribute("href", "https://instagram.com/testig");
  });
});
