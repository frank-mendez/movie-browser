import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Header from "../Header";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("Header component", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(screen.getByTestId("header-element")).toBeInTheDocument();
  });

  it("contains expected navigation links", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const moviesLinks = screen.getAllByText("Movies");
    expect(moviesLinks[0]).toBeInTheDocument();
    const tvShowsLinks = screen.getAllByText("TV Shows");
    expect(tvShowsLinks[0]).toBeInTheDocument();
    const peopleLinks = screen.getAllByText("People");
    expect(peopleLinks[0]).toBeInTheDocument();
  });

  it("navigates to Movies page on click", async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const user = userEvent.setup();
    const moviesLinks = screen.getAllByText("Movies");
    await user.click(moviesLinks[0]); // Click the first 'Movies' link
    expect(window.location.pathname).toBe("/movies");
  });

  it("navigates to TV Shows page on click", async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("TV Shows"));
    expect(window.location.pathname).toBe("/tv-shows");
    await user.click(screen.getByTestId("movie-link-element"));
    expect(window.location.pathname).toBe("/movies");
    await user.click(screen.getByTestId("people-link-element"));
    expect(window.location.pathname).toBe("/people");
  });
});
