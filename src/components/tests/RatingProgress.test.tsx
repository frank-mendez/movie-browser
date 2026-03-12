import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import RatingProgress from "../RatingProgress";

describe("RatingProgress component", () => {
  it("renders without crashing", () => {
    render(<RatingProgress rating={75} />);
    expect(screen.getByTestId("circular-progress-element")).toBeInTheDocument();
  });

  it("displays the rating value as percentage text", () => {
    render(<RatingProgress rating={85} />);
    expect(screen.getByText("85%")).toBeInTheDocument();
  });

  it("displays rating of 0", () => {
    render(<RatingProgress rating={0} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <RatingProgress rating={50} className="w-20 h-20" />,
    );
    expect(container.firstChild).toHaveClass("w-20", "h-20");
  });

  it("applies default className when none provided", () => {
    const { container } = render(<RatingProgress rating={50} />);
    expect(container.firstChild).toHaveClass("w-12", "h-12");
  });

  it("renders correctly for high rating (green threshold)", () => {
    render(<RatingProgress rating={70} />);
    expect(screen.getByTestId("circular-progress-element")).toBeInTheDocument();
    expect(screen.getByText("70%")).toBeInTheDocument();
  });

  it("renders correctly for medium rating (yellow threshold)", () => {
    render(<RatingProgress rating={40} />);
    expect(screen.getByTestId("circular-progress-element")).toBeInTheDocument();
    expect(screen.getByText("40%")).toBeInTheDocument();
  });

  it("renders correctly for low rating (red threshold)", () => {
    render(<RatingProgress rating={20} />);
    expect(screen.getByTestId("circular-progress-element")).toBeInTheDocument();
    expect(screen.getByText("20%")).toBeInTheDocument();
  });
});
