import { describe, expect, it } from "vitest";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import AppLayout from "../AppLayout";
import {BrowserRouter} from "react-router-dom";

describe("AppLayout", () => {
    it('renders without crashing', () => {
        render(
            <BrowserRouter>
                <AppLayout><h1>Test Content</h1></AppLayout>
            </BrowserRouter>
        );
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders Header and Footer components', () => {
        render(
            <BrowserRouter>
                <AppLayout><h1>Test Content</h1></AppLayout>
            </BrowserRouter>
        );
        expect(screen.getByTestId('header-element')).toBeInTheDocument();
        expect(screen.getByTestId('footer-element')).toBeInTheDocument();
    });
});