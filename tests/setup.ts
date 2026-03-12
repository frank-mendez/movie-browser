import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Mock dialog methods not implemented in jsdom
HTMLDialogElement.prototype.showModal = vi.fn();
HTMLDialogElement.prototype.close = vi.fn();

// Silence window.scrollTo not-implemented noise
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
})