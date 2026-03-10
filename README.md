# Movie browser

Movie Browser — TMDB-powered React App

A modern movie discovery web application built with React and TypeScript, designed to explore, search, and browse movies using the TMDB API. This project focuses on clean architecture, performance, and real-world frontend best practices.

The UI layer is built with Tailwind CSS 4 and daisyUI 5.

Why this project

I built this project to demonstrate how I approach API-driven frontend applications — handling async data, caching, UI state, testing, and performance in a clean and scalable way.

It’s intentionally designed as a production-style frontend, not a tutorial demo.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Features

- Browse popular and trending movies
- Search movies with debounced input
- Movie detail pages with metadata
- Client-side caching and request deduplication using React Query
- Responsive layout with Tailwind CSS 4 and daisyUI 5
- Unit tests for core components and logic

## Tech Stack

- React 18 + TypeScript + Vite
- React Router + React Query
- Tailwind CSS 4 + daisyUI 5
- Vitest + Testing Library

## Screenshots

![Home page](screenshots/Movie-Browser-02-08-2026_12_47_AM.png)
![Search results](screenshots/Movie-Browser-02-08-2026_12_48_AM.png)
![Details view](<screenshots/Movie-Browser-02-08-2026_12_48_AM%20(1).png>)

## Roadmap

See [roadmap.md](roadmap.md) for upcoming enhancements and planned phases.

## Architecture & Decisions

React Query for data fetching to reduce unnecessary API calls and manage cache consistency

Component-driven structure for reuse and maintainability

Typed API responses to prevent runtime errors

Clear separation between UI, hooks, and API layers

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_TMDB_API_KEY`,
`VITE_TMDB_API_URL`,
`VITE_TMDB_IMAGE_URL`,
`VITE_TMDB_IMAGE_MULTI_FACE`

Check the `.env.sample` file for the required variables

## Run Locally

Clone the project

```bash
  git clone https://github.com/frank-mendez/movie-browser
```

Go to the project directory

```bash
  cd movie-browser
```

Install dependencies

```bash
  npm install
```

This installs the Tailwind CSS 4 and daisyUI 5 toolchain used by the app.

Start the server

```bash
  npm run dev
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## License

[MIT](https://choosealicense.com/licenses/mit/)
