import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home.tsx";

describe("Home component", () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        expect(screen.getByTestId('home-element')).toBeInTheDocument();
    });

    it('contains the expected content', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
    });
});