# AGENTS.md

This file provides project-specific instructions for coding agents working in this repository. Use it together with `.github/copilot-instructions.md`. When the two overlap, follow the more specific rule for the files you are changing.

## Mission

Build and maintain a TMDB-powered movie discovery app with minimal, focused changes. Favor solutions that fit the existing architecture over introducing new patterns.

## Project Snapshot

- Stack: Vite, React 18, TypeScript, React Router, TanStack React Query, Axios, Tailwind CSS v4, daisyUI v5.
- App type: page-driven frontend for browsing movies, TV shows, people, and search results from TMDB.
- Entry points: `src/main.tsx` bootstraps the app, `src/App.tsx` mounts the router, and `src/routes/router.tsx` owns route definitions.
- Shared layout: `src/layout/AppLayout.tsx` wraps page content with the common header and footer.

## Core Rules

- Keep changes narrow and local to the task.
- Preserve the existing folder layout and naming style.
- Use TypeScript everywhere. Do not introduce plain JavaScript files for app code.
- Follow the repo's existing import style. Relative imports commonly include explicit `.ts` and `.tsx` extensions; do not normalize imports unless the file already uses a different convention.
- Prefer updating an existing component, hook, or service over creating a parallel abstraction.
- Do not introduce a new state management or data-fetching library.
- Do not bypass the shared Axios setup for TMDB requests.
- Do not move route ownership out of `src/routes/router.tsx`.
- Avoid large formatting-only rewrites.

## Architecture Map

- `src/pages/*`: route-level screens and detail pages.
- `src/components/*`: reusable UI elements.
- `src/layout/*`: app chrome and shared shell.
- `src/api/<domain>/service/*`: request functions for a domain.
- `src/api/<domain>/query/*`: React Query hooks and query-key factories.
- `src/types/*`: shared API and UI types.
- `src/enums/*`: enum-driven tab and filter values.
- `src/config/*`: Axios configuration and shared request setup.
- `tests/setup.ts`: global Vitest and Testing Library setup.

## Data Fetching Rules

- React Query is the only supported async data-fetching mechanism.
- Every new API capability should follow the existing domain pattern:
  1. Add or extend the relevant type in `src/types`.
  2. Add the service call in `src/api/<domain>/service`.
  3. Add a query key in the domain query-key factory.
  4. Add a `use*Query` hook in `src/api/<domain>/query`.
- Use the shared Axios instance created from `src/config/createBaseAxiosInstance.ts` through `src/config/axios.ts`.
- Assume the TMDB base URL and API key come from Vite env vars. Do not hardcode API configuration.
- Keep query keys deterministic and domain-scoped.
- Reuse existing hooks when the data shape already matches the screen need.

## Routing And URL State

- Add or change routes in `src/routes/router.tsx`.
- Keep route components page-oriented under `src/pages`.
- Search behavior relies on URL params. Prefer `useSearchParams` and URL-driven state over duplicating search state locally.
- Preserve existing route paths unless the task explicitly requires a route change.

## UI And Styling Rules

- Use Tailwind utility classes and daisyUI primitives for styling.
- Keep styling inline with `className` strings unless a shared global style belongs in `src/styles/index.css`.
- Do not introduce CSS modules or a separate styling system.
- Respect the current typography and theme setup already defined in `src/styles/index.css` and `tailwind.config.ts`.
- Keep components responsive and consistent with the current app shell.
- Prefer small presentational components over bloating route components with repeated markup.

## Component And Page Conventions

- Reusable display logic belongs in `src/components`.
- Page composition, route params, and screen-specific orchestration belong in `src/pages`.
- Shared layout concerns belong in `src/layout`.
- Keep props typed explicitly.
- Prefer enums and shared types that already exist before adding new literals or duplicate interfaces.

## Testing Expectations

- Test runner: Vitest.
- UI testing library: Testing Library with jsdom.
- Global test setup lives in `tests/setup.ts`.
- Keep tests colocated in `tests` folders beside the relevant source when adding or updating unit tests.
- Add or update tests when changing behavior in hooks, utilities, routes, or reusable components.
- Prefer focused tests over broad snapshot-only coverage.
- Run the smallest relevant test set first, then broader validation if the change touches shared behavior.

## Common Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Run tests: `npm run test`
- Run coverage: `npm run coverage`
- Lint: `npm run lint`
- Build: `npm run build`

## Environment

Expected Vite env vars:

- `VITE_TMDB_API_KEY`
- `VITE_TMDB_API_URL`
- `VITE_TMDB_IMAGE_URL`
- `VITE_TMDB_IMAGE_MULTI_FACE`

Use `.env.sample` as the source of truth when env details are needed.

## Change Strategy

When implementing a feature or fix:

1. Inspect the closest existing page, component, hook, and test for the same pattern.
2. Extend the current domain structure instead of creating a new parallel path.
3. Keep API work typed end to end.
4. Update tests for behavior changes.
5. Validate with the most relevant commands for the files touched.

## What To Avoid

- Do not fetch directly inside components when an existing query hook pattern should be used.
- Do not add global state for values that already live naturally in React Query, route params, or local component state.
- Do not scatter route definitions across pages.
- Do not mix unrelated refactors into a task-focused change.
- Do not add dependencies unless the task clearly requires them and the repo has no equivalent already installed.

## Roadmap Awareness

If you are asked to build a new feature without detailed product direction, align with the current roadmap in `roadmap.md`. Current priorities favor filtering, pagination or infinite loading, better empty and error states, favorites persistence, richer detail media, personalization, and accessibility improvements.

## Definition Of Done

Before finishing, confirm that:

- The change follows the existing folder and architecture patterns.
- Data fetching uses the established service plus query-hook flow.
- UI changes match the current Tailwind and daisyUI approach.
- Relevant tests were added or updated when behavior changed.
- The touched area was validated with the appropriate lint, test, or build command when practical.
