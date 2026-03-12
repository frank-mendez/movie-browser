import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TvShowDetails from "../TvShowDetails.tsx";

const mockTvShow = {
  id: 42,
  name: "Breaking Bad",
  tagline: "Change the channel.",
  overview: "A chemistry teacher turns drug lord.",
  backdrop_path: "/backdrop.jpg",
  poster_path: "/poster.jpg",
  vote_average: 9.5,
  vote_count: 12000,
  first_air_date: "2008-01-20",
  number_of_seasons: 5,
  number_of_episodes: 62,
  origin_country: ["US"],
  original_language: "en",
  original_name: "Breaking Bad",
  adult: false,
  popularity: 200,
  genres: [
    { id: 18, name: "Drama" },
    { id: 80, name: "Crime" },
  ],
};

const mockCredits = {
  cast: [
    {
      id: 1,
      name: "Bryan Cranston",
      profile_path: "/bryan.jpg",
      gender: 2,
      roles: [{ character: "Walter White" }],
    },
    {
      id: 2,
      name: "Anna Gunn",
      profile_path: null,
      gender: 1,
      roles: [{ character: "Skyler White" }],
    },
  ],
  crew: [
    {
      id: 3,
      name: "Vince Gilligan",
      profile_path: "/vince.jpg",
      gender: 2,
      department: "Writing",
    },
  ],
};

const mockVideos = {
  results: [
    {
      id: "v1",
      key: "trailer123",
      type: "Trailer",
      site: "YouTube",
      name: "Official Trailer",
    },
  ],
};

const mockImages = {
  backdrops: [
    {
      file_path: "/back1.jpg",
      aspect_ratio: 1.78,
      height: 1080,
      width: 1920,
      vote_average: 5,
      vote_count: 10,
      iso_639_1: null,
    },
  ],
  posters: [
    {
      file_path: "/post1.jpg",
      aspect_ratio: 0.67,
      height: 1500,
      width: 1000,
      vote_average: 5,
      vote_count: 10,
      iso_639_1: null,
    },
  ],
};

vi.mock("../../../api/tv-show/query/useTvShowQuery.ts", () => ({
  useTvShowDetailQuery: () => ({ data: mockTvShow, isPending: false }),
  useTvShowCreditsQuery: () => ({ data: mockCredits, isPending: false }),
  useTvShowVideosQuery: () => ({ data: mockVideos }),
  useTvShowImagesQuery: () => ({ data: mockImages }),
}));

const mockAddToWatchlist = vi.fn();
const mockRemoveFromWatchlist = vi.fn();
const mockIsInWatchlist = vi.fn(() => false);

vi.mock("../../../hooks/useWatchlist.ts", () => ({
  useWatchlist: () => ({
    isInWatchlist: mockIsInWatchlist,
    addToWatchlist: mockAddToWatchlist,
    removeFromWatchlist: mockRemoveFromWatchlist,
  }),
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/tv-shows/42"]}>
        <Routes>
          <Route path="/tv-shows/:tvShowId" element={<TvShowDetails />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

describe("Tv Show Details Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsInWatchlist.mockReturnValue(false);
  });

  it("renders without crashing", () => {
    renderComponent();
    expect(screen.getByTestId("tv-show-details-element")).toBeInTheDocument();
  });

  it("contains the cast element", () => {
    renderComponent();
    expect(screen.getByTestId("cast-element")).toBeInTheDocument();
  });

  it("contains the crew element", () => {
    renderComponent();
    expect(screen.getByTestId("crew-element")).toBeInTheDocument();
  });

  it("renders the TV show title", () => {
    renderComponent();
    expect(screen.getAllByText("Breaking Bad").length).toBeGreaterThan(0);
  });

  it("renders the tagline", () => {
    renderComponent();
    expect(screen.getByText('"Change the channel."')).toBeInTheDocument();
  });

  it("renders the overview", () => {
    renderComponent();
    expect(
      screen.getByText("A chemistry teacher turns drug lord."),
    ).toBeInTheDocument();
  });

  it("renders genre badges", () => {
    renderComponent();
    expect(screen.getByText("Drama")).toBeInTheDocument();
    expect(screen.getByText("Crime")).toBeInTheDocument();
  });

  it("renders season count badge", () => {
    renderComponent();
    expect(screen.getByText("5 Seasons")).toBeInTheDocument();
  });

  it("renders cast member names", () => {
    renderComponent();
    expect(screen.getByText("Bryan Cranston")).toBeInTheDocument();
    expect(screen.getByText("Anna Gunn")).toBeInTheDocument();
  });

  it("renders cast member characters", () => {
    renderComponent();
    expect(screen.getByText("Walter White")).toBeInTheDocument();
    expect(screen.getByText("Skyler White")).toBeInTheDocument();
  });

  it("renders crew member names", () => {
    renderComponent();
    expect(screen.getByText("Vince Gilligan")).toBeInTheDocument();
  });

  it("shows Add to Watchlist button when not in watchlist", () => {
    mockIsInWatchlist.mockReturnValue(false);
    renderComponent();
    expect(
      screen.getByRole("button", { name: /add to watchlist/i }),
    ).toBeInTheDocument();
  });

  it("shows Remove from Watchlist button when already in watchlist", () => {
    mockIsInWatchlist.mockReturnValue(true);
    renderComponent();
    expect(
      screen.getByRole("button", { name: /remove from watchlist/i }),
    ).toBeInTheDocument();
  });

  it("calls addToWatchlist when Add to Watchlist is clicked", () => {
    mockIsInWatchlist.mockReturnValue(false);
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /add to watchlist/i }));
    expect(mockAddToWatchlist).toHaveBeenCalledTimes(1);
  });

  it("calls removeFromWatchlist when Remove from Watchlist is clicked", () => {
    mockIsInWatchlist.mockReturnValue(true);
    renderComponent();
    fireEvent.click(
      screen.getByRole("button", { name: /remove from watchlist/i }),
    );
    expect(mockRemoveFromWatchlist).toHaveBeenCalledWith(42);
  });

  it("renders Watch Trailer button when trailer is available", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: /watch trailer/i }),
    ).toBeInTheDocument();
  });

  it("opens TrailerModal when Watch Trailer is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /watch trailer/i }));
    expect(screen.getByTitle("Breaking Bad")).toBeInTheDocument();
  });
});

describe("Tv Show Details Component - loading state", () => {
  it("renders loading skeleton while data is pending", () => {
    vi.doMock("../../../api/tv-show/query/useTvShowQuery.ts", () => ({
      useTvShowDetailQuery: () => ({ data: undefined, isPending: true }),
      useTvShowCreditsQuery: () => ({ data: undefined, isPending: true }),
      useTvShowVideosQuery: () => ({ data: undefined }),
      useTvShowImagesQuery: () => ({ data: undefined }),
    }));

    const pendingQueryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, enabled: false } },
    });
    render(
      <QueryClientProvider client={pendingQueryClient}>
        <MemoryRouter initialEntries={["/tv-shows/42"]}>
          <Routes>
            <Route path="/tv-shows/:tvShowId" element={<TvShowDetails />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
    expect(screen.getByTestId("tv-show-details-element")).toBeInTheDocument();
  });
});
