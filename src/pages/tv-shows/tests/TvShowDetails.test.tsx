import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TvShowDetails from "../TvShowDetails.tsx";

describe("Tv Show Details Component", () => {
    const queryClient = new QueryClient();
    const tvShowComponent = () => {
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <TvShowDetails />
                </BrowserRouter>
            </QueryClientProvider>,
        );
    };
    it("renders without crashing", () => {
        tvShowComponent();
        expect(screen.getByTestId("tv-show-details-element")).toBeInTheDocument();
    });

    it("renders loading", () => {
        tvShowComponent();
        expect(screen.getByTestId("loading-element")).toBeInTheDocument();
    });

    it("contains the casts element", () => {
        tvShowComponent();
        expect(screen.getByTestId("cast-element")).toBeInTheDocument();
    });

    it("contains the crew element", () => {
        tvShowComponent();
        expect(screen.getByTestId("crew-element")).toBeInTheDocument();
    });
});
