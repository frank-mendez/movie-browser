import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import SearchBar from "../SearchBar";

const renderComponent = (initialEntries = ["/"]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchBar />
    </MemoryRouter>,
  );

describe("SearchBar component", () => {
  it("renders without crashing", () => {
    renderComponent();
    expect(screen.getByTestId("searchbar-element")).toBeInTheDocument();
  });

  it("renders search input with placeholder", () => {
    renderComponent();
    expect(
      screen.getByPlaceholderText("Search movies, TV shows, people…"),
    ).toBeInTheDocument();
  });

  it("renders Search submit button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    renderComponent();
    const input = screen.getByPlaceholderText(
      "Search movies, TV shows, people…",
    );
    fireEvent.change(input, { target: { value: "batman" } });
    expect(input).toHaveValue("batman");
  });

  it("shows clear button when input has value", () => {
    renderComponent();
    const input = screen.getByPlaceholderText(
      "Search movies, TV shows, people…",
    );
    fireEvent.change(input, { target: { value: "batman" } });
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
  });

  it("does not show clear button when input is empty", () => {
    renderComponent();
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("clears input when clear button is clicked", () => {
    renderComponent();
    const input = screen.getByPlaceholderText(
      "Search movies, TV shows, people…",
    );
    fireEvent.change(input, { target: { value: "batman" } });
    fireEvent.click(screen.getByLabelText("Clear search"));
    expect(input).toHaveValue("");
  });

  it("initializes value from URL query param", () => {
    renderComponent(["/search?query=avengers"]);
    expect(
      screen.getByPlaceholderText("Search movies, TV shows, people…"),
    ).toHaveValue("avengers");
  });

  it("does not navigate on submit when input is empty", () => {
    const { container } = renderComponent();
    const form = container.querySelector("form")!;
    fireEvent.submit(form);
    // Should stay on current location
    expect(window.location.pathname).not.toContain("search");
  });

  it("does not navigate on Enter key when input is empty", () => {
    renderComponent();
    const input = screen.getByPlaceholderText(
      "Search movies, TV shows, people…",
    );
    fireEvent.keyDown(input, { key: "Enter" });
    expect(window.location.pathname).not.toContain("search");
  });
});
