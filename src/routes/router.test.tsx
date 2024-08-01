import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

describe('Router', () => {
    const queryClient = new QueryClient()

    const routerComponent = () => {
        render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        )
    }

    it('renders the home page correctly', () => {
        routerComponent()
        expect(screen.getByText('Trending')).toBeInTheDocument()
    })
})