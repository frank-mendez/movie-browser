import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

describe("Home component", () => {

    const queryClient = new QueryClient();

    const homeComponent = () => {
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </QueryClientProvider>
        );
    }

    it('renders without crashing', () => {
        homeComponent();
        expect(screen.getByTestId('home-element')).toBeInTheDocument();
    });

    it('contains the expected content', () => {
        homeComponent();
        expect(screen.getByText('Trending')).toBeInTheDocument();
    });
});