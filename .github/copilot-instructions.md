# Copilot instructions

## Project overview
- Vite + React + TypeScript app for TMDB browsing.
- Routing is centralized in src/routes/router.tsx and mounted via `RouterProvider` in src/App.tsx; app bootstraps in src/main.tsx with `Suspense` fallback.
- UI structure is page-driven: src/pages/* for screens, src/layout/* for shared chrome, src/components/* for reusable widgets.

## Data flow & API patterns
- All API calls go through the shared Axios instance in src/config/axios.ts (created by src/config/createBaseAxiosInstance.ts). It injects the TMDB base URL and `api_key` param.
- React Query is the only data-fetching mechanism. Each domain has:
  - query key factory (e.g., src/api/movies/query/query-key-factory.ts),
  - hooks in src/api/<domain>/query/use*Query.ts,
  - service functions in src/api/<domain>/service/*.service.ts.
- New endpoints should follow the same pattern: add types in src/types, service call in service/, key in query-key-factory, hook in query/.

## State, params, and navigation
- Search flow relies on URL params via `useSearchParams` (see src/components/SearchBar.tsx and src/pages/search/Search.tsx).
- Tabs are enum-driven (see src/enums/*) and passed through typed props in src/types/*.

## Styling & UI conventions
- Tailwind + daisyUI are the UI primitives (see tailwind.config.ts); components use className strings instead of CSS modules.
- Layout wraps pages with AppLayout (Header + Footer) in src/layout/AppLayout.tsx.

## Tests & tooling
- Vitest + Testing Library (jsdom) configured in vitest.config.ts; global setup in tests/setup.ts.
- Unit tests live beside code in src/**/tests/*.

## Local dev & env
- Required env vars: VITE_TMDB_API_KEY, VITE_TMDB_API_URL, VITE_TMDB_IMAGE_URL, VITE_TMDB_IMAGE_MULTI_FACE (see .env.sample).
- Common scripts: npm run dev, npm run test, npm run coverage, npm run build, npm run lint.
