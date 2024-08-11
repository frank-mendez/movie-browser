import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home.tsx";
import More from "../pages/more/More.tsx";
import Movies from "../pages/movies/Movies.tsx";
import People from "../pages/people/People.tsx";
import TvShow from "../pages/tv-shows/TvShow.tsx";
import NotFound from "../pages/not-found/NotFound.tsx";
import Search from "../pages/search/Search.tsx";
import MovieDetails from "../pages/movies/MovieDetails.tsx";
import TvShowDetails from "../pages/tv-shows/TvShowDetails.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/more",
    element: <More />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/movies/:movieId",
    element: <MovieDetails />,
  },
  {
    path: "/people",
    element: <People />,
  },
  {
    path: "/tv-shows",
    element: <TvShow />,
  },
  {
    path: "/tv-shows/:tvShowId",
    element: <TvShowDetails />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
