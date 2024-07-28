import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import TvShow from "../TvShow.tsx";

describe("Home component", () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <TvShow />
            </BrowserRouter>
        );
        expect(screen.getByTestId('tvshow-element')).toBeInTheDocument();
    });

    it('contains the expected content', () => {
        render(
            <BrowserRouter>
                <TvShow />
            </BrowserRouter>
        );
        expect(screen.getByTestId('tvshow-h1-element')).toBeInTheDocument();
    });
});