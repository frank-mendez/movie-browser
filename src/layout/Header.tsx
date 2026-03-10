import { Link, useLocation } from "react-router-dom";
import ThemeSwitcher from "../components/ThemeSwitcher.tsx";

const Header = () => {
  const location = useLocation();

  return (
    <div data-testid="header-element" className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="container m-auto flex w-full items-center">
            <div className="mx-2 navbar-start hidden px-2 lg:flex">
              <Link
                className={location.pathname === "/" ? "font-semibold" : ""}
                to="/"
              >
                Movie Browser
              </Link>
            </div>
            <div className="hidden navbar-center flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <Link
                    className={
                      location.pathname === "/movies" ? "menu-active" : ""
                    }
                    data-testid="movie-link-element"
                    to="/movies"
                  >
                    Movies
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname === "/tv-shows" ? "menu-active" : ""
                    }
                    data-testid="tvshow-link-element"
                    to="/tv-shows"
                  >
                    TV Shows
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname === "/people" ? "menu-active" : ""
                    }
                    data-testid="people-link-element"
                    to="/people"
                  >
                    People
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-end ml-auto flex lg:hidden">
              <ThemeSwitcher />
            </div>
            <div className="navbar-end hidden lg:flex font-dm-sans">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
      <div data-testid="drawer-element" className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/tv-shows">Tv Shows</Link>
          </li>
          <li>
            <Link to="/people">People</Link>
          </li>
          <li>
            <Link to="/more">More</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
