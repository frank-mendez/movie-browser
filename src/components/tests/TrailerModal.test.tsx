import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import TrailerModal from "../TrailerModal";

const renderModal = (props: {
  trailerKey?: string | null;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
}) =>
  render(
    <TrailerModal
      trailerKey={props.trailerKey !== undefined ? props.trailerKey : "abc123"}
      isOpen={props.isOpen ?? true}
      onClose={props.onClose ?? vi.fn()}
      title={props.title}
    />,
  );

describe("TrailerModal component", () => {
  it("renders without crashing", () => {
    const { container } = renderModal({});
    expect(container.firstChild).toBeInTheDocument();
  });

  it("shows the title when provided", () => {
    renderModal({ title: "Inception" });
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("falls back to 'Trailer' when title is not provided", () => {
    renderModal({});
    expect(screen.getByText("Trailer")).toBeInTheDocument();
  });

  it("renders iframe when isOpen and trailerKey are set", () => {
    renderModal({ isOpen: true, trailerKey: "key123" });
    const iframe = document.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe?.src).toContain("key123");
  });

  it("does not render iframe when isOpen is false", () => {
    renderModal({ isOpen: false });
    expect(document.querySelector("iframe")).not.toBeInTheDocument();
  });

  it("does not render iframe when trailerKey is null", () => {
    renderModal({ trailerKey: null });
    expect(document.querySelector("iframe")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();
    renderModal({ onClose });
    fireEvent.click(screen.getByLabelText("Close trailer"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("uses provided title in iframe title attribute", () => {
    renderModal({ title: "Dune" });
    const iframe = document.querySelector("iframe");
    expect(iframe?.title).toBe("Dune");
  });

  it("falls back to 'Movie Trailer' for iframe title when title prop is absent", () => {
    renderModal({});
    const iframe = document.querySelector("iframe");
    expect(iframe?.title).toBe("Movie Trailer");
  });
});
