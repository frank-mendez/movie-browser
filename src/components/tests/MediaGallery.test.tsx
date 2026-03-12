import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import MediaGallery from "../MediaGallery.tsx";
import type { MovieImage } from "../../types/movies.ts";

const makeImage = (path: string): MovieImage => ({
  aspect_ratio: 1.78,
  height: 1080,
  iso_639_1: null,
  file_path: path,
  vote_average: 0,
  vote_count: 0,
  width: 1920,
});

const backdrops = [makeImage("/b1.jpg"), makeImage("/b2.jpg")];
const posters = [makeImage("/p1.jpg")];

describe("MediaGallery", () => {
  it("renders nothing when no images are provided", () => {
    const { container } = render(<MediaGallery backdrops={[]} posters={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the gallery section with backdrops", () => {
    render(<MediaGallery backdrops={backdrops} posters={[]} />);
    expect(screen.getByTestId("media-gallery-section")).toBeInTheDocument();
    expect(screen.getByText("Gallery")).toBeInTheDocument();
    expect(screen.getByText("Backdrops")).toBeInTheDocument();
  });

  it("shows poster tab when posters are provided", () => {
    render(<MediaGallery backdrops={backdrops} posters={posters} />);
    expect(screen.getByText("Posters")).toBeInTheDocument();
  });

  it("switches to posters tab on click", () => {
    render(<MediaGallery backdrops={backdrops} posters={posters} />);
    fireEvent.click(screen.getByText("Posters"));
    const imgs = screen.getAllByRole("img");
    expect(imgs[0].getAttribute("src")).toContain("/p1.jpg");
  });

  it("opens lightbox when an image is clicked", () => {
    render(<MediaGallery backdrops={backdrops} posters={[]} title="Test" />);
    const buttons = screen.getAllByRole("button", {
      name: /View backdrop image/i,
    });
    fireEvent.click(buttons[0]);
    // Lightbox should show a larger version of the image
    const lightboxImgs = screen.getAllByRole("img");
    const bigImg = lightboxImgs.find((img) =>
      img.getAttribute("src")?.includes("/b1.jpg"),
    );
    expect(bigImg).toBeDefined();
  });

  it("closes lightbox on close button click", () => {
    render(<MediaGallery backdrops={backdrops} posters={[]} />);
    const thumbButtons = screen.getAllByRole("button", {
      name: /View backdrop image/i,
    });
    fireEvent.click(thumbButtons[0]);
    const closeBtn = screen.getByRole("button", { name: /Close lightbox/i });
    fireEvent.click(closeBtn);
    expect(
      screen.queryByRole("button", { name: /Close lightbox/i }),
    ).toBeNull();
  });
});
