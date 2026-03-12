import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import PeopleCard from "../PeopleCard";

describe("PeopleCard component", () => {
  const defaultProps = {
    onClick: vi.fn(),
    name: "John Doe",
    description: "Actor",
  };

  it("renders without crashing", () => {
    const { container } = render(<PeopleCard {...defaultProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders the person name", () => {
    render(<PeopleCard {...defaultProps} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<PeopleCard {...defaultProps} />);
    expect(screen.getByText("Actor")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<PeopleCard {...defaultProps} onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("uses provided imageSrc", () => {
    render(
      <PeopleCard {...defaultProps} imageSrc="https://example.com/photo.jpg" />,
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://example.com/photo.jpg");
  });

  it("uses female placeholder when gender is 1 and no imageSrc", () => {
    render(<PeopleCard {...defaultProps} gender={1} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/assets/images/woman.png");
  });

  it("uses male placeholder when gender is 2 and no imageSrc", () => {
    render(<PeopleCard {...defaultProps} gender={2} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/assets/images/man.png");
  });

  it("uses default alt text when imageAlt not provided", () => {
    render(<PeopleCard {...defaultProps} />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Person");
  });

  it("uses provided imageAlt", () => {
    render(<PeopleCard {...defaultProps} imageAlt="Custom Alt" />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Custom Alt");
  });

  it("applies custom className", () => {
    const { container } = render(
      <PeopleCard {...defaultProps} className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("does not render description paragraph when description is empty", () => {
    render(<PeopleCard {...defaultProps} description="" />);
    expect(screen.queryByText("Actor")).not.toBeInTheDocument();
  });
});
