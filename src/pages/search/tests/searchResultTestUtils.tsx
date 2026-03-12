import { vi } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MediaTypeEnum } from "../../../enums/MovieTabEnum.ts";
import { SearchMovieResultProps } from "../../../types";
import type { JSX } from "react";

export const emptySearchResult = {
  results: [] as never[],
  page: 1,
  total_pages: 0,
  total_results: 0,
};

export function makeSearchResultProps(
  mediaType: MediaTypeEnum,
  overrides: Partial<SearchMovieResultProps> = {},
): SearchMovieResultProps {
  return {
    loading: false,
    data: undefined,
    currentPage: 1,
    handlePageChange: vi.fn(),
    mediaType,
    ...overrides,
  };
}

export function renderInBrowserRouter(ui: JSX.Element) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}
