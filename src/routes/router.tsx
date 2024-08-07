import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home.tsx";
import More from "../pages/more/More.tsx";
import Movies from "../pages/movies/Movies.tsx";
import People from "../pages/people/People.tsx";
import TvShow from "../pages/tv-shows/TvShow.tsx";
import NotFound from "../pages/not-found/NotFound.tsx";
import Search from "../pages/search/Search.tsx";

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
    path: "/people",
    element: <People />,
  },
  {
    path: "/tv-shows",
    element: <TvShow />,
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
