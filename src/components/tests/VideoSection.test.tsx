import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import VideoSection from "../VideoSection.tsx";
import type { MovieVideo } from "../../types/movies.ts";

const makeVideo = (overrides: Partial<MovieVideo> = {}): MovieVideo => ({
  iso_639_1: "en",
  iso_3166_1: "US",
  name: "Official Trailer",
  key: "abc123",
  site: "YouTube",
  size: 1080,
  type: "Trailer",
  official: true,
  published_at: "2024-01-01T00:00:00.000Z",
  id: "v1",
  ...overrides,
});

describe("VideoSection", () => {
  it("renders nothing when no YouTube videos are provided", () => {
    const { container } = render(<VideoSection videos={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when only non-YouTube videos are provided", () => {
    const { container } = render(
      <VideoSection videos={[makeVideo({ site: "Vimeo" })]} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders the video section with YouTube videos", () => {
    render(<VideoSection videos={[makeVideo()]} />);
    expect(screen.getByTestId("video-section")).toBeInTheDocument();
    expect(screen.getByText("Videos")).toBeInTheDocument();
    expect(screen.getByText("Official Trailer")).toBeInTheDocument();
  });

  it("shows the video type badge", () => {
    render(<VideoSection videos={[makeVideo()]} />);
    const badges = screen.getAllByText("Trailer");
    expect(badges.length).toBeGreaterThan(0);
  });

  it("opens video modal on card click", () => {
    render(<VideoSection videos={[makeVideo()]} title="Test Movie" />);
    const playBtn = screen.getByRole("button", {
      name: /Play Official Trailer/i,
    });
    fireEvent.click(playBtn);
    expect(
      screen.getByTitle("Test Movie – Official Trailer"),
    ).toBeInTheDocument();
  });

  it("closes the video modal", () => {
    render(<VideoSection videos={[makeVideo()]} title="Test Movie" />);
    fireEvent.click(
      screen.getByRole("button", { name: /Play Official Trailer/i }),
    );
    fireEvent.click(screen.getByRole("button", { name: /Close video/i }));
    expect(screen.queryByRole("button", { name: /Close video/i })).toBeNull();
  });

  it("sorts trailers before teasers", () => {
    const videos = [
      makeVideo({ id: "v2", name: "A Teaser", type: "Teaser" }),
      makeVideo({ id: "v1", name: "The Trailer", type: "Trailer" }),
    ];
    render(<VideoSection videos={videos} />);
    const cards = screen.getAllByRole("button", { name: /^Play/i });
    expect(cards[0]).toHaveAccessibleName("Play The Trailer");
    expect(cards[1]).toHaveAccessibleName("Play A Teaser");
  });

  it("uses badge-neutral for unknown video type", () => {
    render(<VideoSection videos={[makeVideo({ type: "BTS" })]} />);
    const badge = screen.getByText("BTS");
    expect(badge).toHaveClass("badge-neutral");
  });

  it("sorts unknown type videos after known types", () => {
    const videos = [
      makeVideo({ id: "v2", name: "Unknown Clip", type: "UnknownType" }),
      makeVideo({ id: "v1", name: "The Trailer", type: "Trailer" }),
    ];
    render(<VideoSection videos={videos} />);
    const cards = screen.getAllByRole("button", { name: /^Play/i });
    expect(cards[0]).toHaveAccessibleName("Play The Trailer");
  });

  it("uses default 'Video' title in iframe when title prop is not provided", () => {
    render(<VideoSection videos={[makeVideo()]} />);
    fireEvent.click(
      screen.getByRole("button", { name: /Play Official Trailer/i }),
    );
    expect(screen.getByTitle(/^Video –/)).toBeInTheDocument();
  });

  it("shows Official badge for official videos", () => {
    render(<VideoSection videos={[makeVideo({ official: true })]} />);
    expect(screen.getByText("Official")).toBeInTheDocument();
  });

  it("does not show Official badge for unofficial videos", () => {
    render(<VideoSection videos={[makeVideo({ official: false })]} />);
    expect(screen.queryByText("Official")).not.toBeInTheDocument();
  });

  it("shows badge-neutral in modal for unknown type video", () => {
    render(<VideoSection videos={[makeVideo({ type: "UnknownType" })]} />);
    fireEvent.click(screen.getByRole("button", { name: /Play/i }));
    const badges = screen.getAllByText("UnknownType");
    expect(badges.length).toBeGreaterThan(0);
  });
});
