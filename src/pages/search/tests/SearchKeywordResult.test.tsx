import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import SearchKeywordResult from "../SearchKeywordResult";
import { MediaTypeEnum } from "../../../enums/MovieTabEnum.ts";
import {
  makeSearchResultProps,
  renderInBrowserRouter,
} from "./searchResultTestUtils.tsx";

const renderComponent = (overrides = {}) =>
  renderInBrowserRouter(
    <SearchKeywordResult
      {...makeSearchResultProps(MediaTypeEnum.KEYWORD, overrides)}
    />,
  );

describe("SearchKeywordResult component", () => {
  it("renders loading skeletons when loading is true", () => {
    renderComponent({ loading: true });
    const skeletons = document.querySelectorAll(".skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders empty state when data has no results", () => {
    renderComponent({
      data: { results: [], page: 1, total_pages: 0, total_results: 0 },
    });
    expect(screen.getByText("No keywords found")).toBeInTheDocument();
  });

  it("renders empty state when data is undefined", () => {
    renderComponent({ data: undefined });
    expect(screen.getByText("No keywords found")).toBeInTheDocument();
  });

  it("renders keyword buttons when results are present", () => {
    renderComponent({
      data: {
        results: [
          { id: 1, name: "action" },
          { id: 2, name: "thriller" },
        ],
        page: 1,
        total_pages: 1,
        total_results: 2,
      },
    });
    expect(screen.getByText("action")).toBeInTheDocument();
    expect(screen.getByText("thriller")).toBeInTheDocument();
  });

  it("renders pagination when multiple pages exist", () => {
    renderComponent({
      data: {
        results: [{ id: 1, name: "action" }],
        page: 1,
        total_pages: 5,
        total_results: 50,
      },
    });
    expect(screen.getByTestId("search-pagination-element")).toBeInTheDocument();
  });

  it("navigates on keyword button click", () => {
    renderComponent({
      data: {
        results: [{ id: 1, name: "action" }],
        page: 1,
        total_pages: 1,
        total_results: 1,
      },
    });
    fireEvent.click(screen.getByText("action"));
    expect(globalThis.location.href).toContain("action");
  });
});
