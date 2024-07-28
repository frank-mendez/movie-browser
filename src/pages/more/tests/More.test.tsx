import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import More from "../More.tsx";

describe("More component", () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <More />
            </BrowserRouter>
        );
        expect(screen.getByTestId('more-element')).toBeInTheDocument();
    });

    it('contains the expected content', () => {
        render(
            <BrowserRouter>
                <More />
            </BrowserRouter>
        );
        expect(screen.getByTestId('more-h1-element')).toBeInTheDocument();
    });
});