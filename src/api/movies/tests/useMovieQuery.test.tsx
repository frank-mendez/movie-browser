import { useTrendingMoviesQuery } from "../query/useMovieQuery.ts";
import { TrendingParamsEnum } from "../../../enums";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useTrendingMoviesQuery", () => {
  it("should return trending movies", async () => {
    const { result } = renderHook(
      () => useTrendingMoviesQuery({ params: TrendingParamsEnum.TODAY }),
      { wrapper },
    );

    // Wait for the query to succeed
    await waitFor(() => result.current.isSuccess);
  });

  it("should return error", async () => {
    const { result } = renderHook(
      () => useTrendingMoviesQuery({ params: TrendingParamsEnum.TODAY }),
      { wrapper },
    );

    await waitFor(() => result.current.isError);

    expect(result.current.error).toBeDefined();
  });

  it("should return loading", async () => {
    const { result } = renderHook(
      () => useTrendingMoviesQuery({ params: TrendingParamsEnum.TODAY }),
      { wrapper },
    );

    expect(result.current.isLoading).toBeTruthy();
  });
});
