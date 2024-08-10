# Movie browser
This is a modern movie browser that uses the [TheMovie Database API](https://www.themoviedb.org/documentation/api) to fetch movies and display them in a grid.
This uses Vite, React, TypeScript, and Tailwind CSS 🚀

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Features

- Light/dark mode toggle
- Search movies, tv shows, and people
- Unit tests using React Testing Library, Vite, and Jest
- Data Caching using React Query
- Code Coverage Report
- Pre commit hooks
- Github actions for CI/CD

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
