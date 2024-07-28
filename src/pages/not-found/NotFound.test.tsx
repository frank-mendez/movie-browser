import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./NotFound.tsx";

describe("Home component", () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );
        expect(screen.getByTestId('not-found-element')).toBeInTheDocument();
    });

    it('contains the expected 404 content', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );
        expect(screen.getByText('404')).toBeInTheDocument();
    });
});