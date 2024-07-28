import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ThemeSwitcher from "../ThemeSwitcher.tsx";

describe('ThemeSwitcher component', () => {
    it('renders without crashing', () => {
        render(<ThemeSwitcher />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
});