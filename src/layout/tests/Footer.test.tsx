import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Footer from "../Footer";
import { describe, it, expect } from "vitest";
import {BrowserRouter} from "react-router-dom";

describe("Footer component", () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );
        expect(screen.getByTestId('footer-element')).toBeInTheDocument();
    });

    it('contains expected text', () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );
        expect(screen.getByText('Copyright © 2024 - Frank Mendez')).toBeInTheDocument();
    });
});