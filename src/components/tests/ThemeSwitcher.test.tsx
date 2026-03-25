import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ThemeSwitcher from "../ThemeSwitcher.tsx";

describe('ThemeSwitcher component', () => {
    it('renders without crashing', () => {
        render(<ThemeSwitcher />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('label has cursor-pointer class for mobile tap support', () => {
        const { container } = render(<ThemeSwitcher />);
        const label = container.querySelector('label');
        expect(label).toHaveClass('cursor-pointer');
    });
});