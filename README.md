# Movie browser
Movie Browser — TMDB-powered React App

A modern movie discovery web application built with React and TypeScript, designed to explore, search, and browse movies using the TMDB API. This project focuses on clean architecture, performance, and real-world frontend best practices.

Why this project

I built this project to demonstrate how I approach API-driven frontend applications — handling async data, caching, UI state, testing, and performance in a clean and scalable way.

It’s intentionally designed as a production-style frontend, not a tutorial demo.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Features
 - Browse popular and trending movies
 - Search movies with debounced input
 - Movie detail pages with metadata
 - Client-side caching and request deduplication using React Query
 - Responsive layout with Tailwind CSS
 - Unit tests for core components and logic

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

Check the `.env.example` file for the required variables


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
