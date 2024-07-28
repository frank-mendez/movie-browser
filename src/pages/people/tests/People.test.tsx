import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import People from "../People.tsx";

describe("Home component", () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <People />
            </BrowserRouter>
        );
        expect(screen.getByTestId('people-element')).toBeInTheDocument();
    });

    it('contains the expected content', () => {
        render(
            <BrowserRouter>
                <People />
            </BrowserRouter>
        );
        expect(screen.getByTestId('people-h1-element')).toBeInTheDocument();
    });
});