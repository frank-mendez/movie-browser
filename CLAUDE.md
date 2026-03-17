# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at localhost
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint (zero warnings allowed)
npm run test         # Run tests with Vitest (watch mode)
npm run coverage     # Run tests with coverage report
```

To run a single test file:
```bash
npx vitest run src/api/movies/tests/useMovieQuery.test.tsx
```

## Environment Setup

Copy `.env.sample` to `.env` and fill in your TMDB credentials:

```
VITE_TMDB_API_KEY=<YOUR_TMDB_API>
VITE_TMDB_API_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/w500
VITE_TMDB_IMAGE_MULTI_FACE=https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces
```

## Architecture

This is a React 18 + TypeScript app built with Vite that browses movies, TV shows, and people using the [TMDB API](https://www.themoviedb.org/documentation/api).

**Stack:** React Router v6, TanStack Query v5, Axios, Tailwind CSS v4, DaisyUI v5, Vitest + Testing Library

### Data Layer Pattern

Each API domain (`movies`, `tv-show`, `people`, `search`) follows a three-layer pattern:

1. **Service** (`src/api/<domain>/service/<domain>.service.ts`) — raw Axios calls returning typed promises
2. **Query key factory** (`src/api/<domain>/query/query-<domain>-key-factory.ts`) — structured cache key arrays for TanStack Query
3. **Query hooks** (`src/api/<domain>/query/use<Domain>Query.ts`) — `useQuery` wrappers consumed by components

The shared Axios instance is in `src/config/axios.ts`, built via `createBaseAxiosInstance` which injects `VITE_TMDB_API_KEY` as a default param and `VITE_TMDB_API_URL` as the base URL.

### Page/Layout Structure

All pages wrap their content in `<AppLayout>` (Header + Footer). Pages are flat components in `src/pages/<section>/`.

Routes are defined in `src/routes/router.tsx`. Main routes:
- `/` → Home (trending content)
- `/movies`, `/movies/:movieId`
- `/tv-shows`, `/tv-shows/:tvShowId`
- `/people`, `/people/:personId`
- `/search`

### Styling

Uses Tailwind CSS v4 (via `@tailwindcss/vite` plugin) and DaisyUI v5. Theme switching is handled by `ThemeSwitcher` component. Images use `VITE_TMDB_IMAGE_URL` (posters) and `VITE_TMDB_IMAGE_MULTI_FACE` (hero backdrops) env vars.

### Commit Convention

Commits must follow [Conventional Commits](https://www.conventionalcommits.org/) — enforced by commitlint + husky. Valid prefixes: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, etc.
