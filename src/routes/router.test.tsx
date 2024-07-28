import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

describe('Router', () => {
    it('renders the home page correctly', () => {
        render(<RouterProvider router={router} />)
        expect(screen.getByText('Home')).toBeInTheDocument()
    })
})