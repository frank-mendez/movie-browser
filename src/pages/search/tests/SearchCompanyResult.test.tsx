import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import SearchCompanyResult from "../SearchCompanyResult";
import { MediaTypeEnum } from "../../../enums/MovieTabEnum.ts";
import {
  makeSearchResultProps,
  renderInBrowserRouter,
} from "./searchResultTestUtils.tsx";

const renderComponent = (overrides = {}) =>
  renderInBrowserRouter(
    <SearchCompanyResult
      {...makeSearchResultProps(MediaTypeEnum.COMPANY, overrides)}
    />,
  );

describe("SearchCompanyResult component", () => {
  it("renders loading skeletons when loading is true", () => {
    renderComponent({ loading: true });
    const skeletons = document.querySelectorAll(".skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders empty state when data has no results", () => {
    renderComponent({
      data: { results: [], page: 1, total_pages: 0, total_results: 0 },
    });
    expect(screen.getByText("No companies found")).toBeInTheDocument();
  });

  it("renders empty state when data is undefined", () => {
    renderComponent({ data: undefined });
    expect(screen.getByText("No companies found")).toBeInTheDocument();
  });

  it("renders company name when results are present", () => {
    renderComponent({
      data: {
        results: [
          { id: 1, name: "Warner Bros", logo_path: null, origin_country: "US" },
        ],
        page: 1,
        total_pages: 1,
        total_results: 1,
      },
    });
    expect(screen.getByText("Warner Bros")).toBeInTheDocument();
  });

  it("renders company logo when logo_path is provided", () => {
    renderComponent({
      data: {
        results: [
          {
            id: 1,
            name: "Disney",
            logo_path: "/disney.png",
            origin_country: "",
          },
        ],
        page: 1,
        total_pages: 1,
        total_results: 1,
      },
    });
    const imgs = screen.getAllByRole("img");
    const logo = imgs.find((img) => img.getAttribute("alt") === "Disney");
    expect(logo).toBeDefined();
  });

  it("renders placeholder icon when no logo_path", () => {
    renderComponent({
      data: {
        results: [
          { id: 1, name: "Indie Studio", logo_path: null, origin_country: "" },
        ],
        page: 1,
        total_pages: 1,
        total_results: 1,
      },
    });
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders origin country when provided", () => {
    renderComponent({
      data: {
        results: [
          { id: 1, name: "Studio A", logo_path: null, origin_country: "FR" },
        ],
        page: 1,
        total_pages: 1,
        total_results: 1,
      },
    });
    expect(screen.getByText("FR")).toBeInTheDocument();
  });

  it("does not render country section when origin_country is empty", () => {
    renderComponent({
      data: {
        results: [
          { id: 1, name: "Studio B", logo_path: null, origin_country: "" },
        ],
        page: 1,
        total_pages: 1,
        total_results: 1,
      },
    });
    const countrySpan = screen.queryByText("FR");
    expect(countrySpan).not.toBeInTheDocument();
  });

  it("renders multiple companies", () => {
    renderComponent({
      data: {
        results: [
          { id: 1, name: "Studio One", logo_path: null, origin_country: "" },
          { id: 2, name: "Studio Two", logo_path: null, origin_country: "" },
        ],
        page: 1,
        total_pages: 1,
        total_results: 2,
      },
    });
    expect(screen.getByText("Studio One")).toBeInTheDocument();
    expect(screen.getByText("Studio Two")).toBeInTheDocument();
  });

  it("renders pagination when multiple pages exist", () => {
    renderComponent({
      data: {
        results: [
          { id: 1, name: "Studio X", logo_path: null, origin_country: "" },
        ],
        page: 1,
        total_pages: 5,
        total_results: 50,
      },
    });
    expect(screen.getByTestId("search-pagination-element")).toBeInTheDocument();
  });
});
