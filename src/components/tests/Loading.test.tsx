import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Loading from "../Loading";
import { describe, it, expect } from "vitest";

describe("Loading component", () => {
    it('renders without crashing', () => {
        render(<Loading />);
        expect(screen.getByTestId('loading-element')).toBeInTheDocument();
    });

    it('contains the loading bars', () => {
        render(<Loading />);
        expect(screen.getByTestId('loading-bar-element')).toBeInTheDocument();
    });
});