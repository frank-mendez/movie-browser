import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../components/ThemeSwitcher.tsx";
import { useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Movies", to: "/movies", testId: "movie-link-element" },
  { label: "TV Shows", to: "/tv-shows", testId: "tvshow-link-element" },
  { label: "People", to: "/people", testId: "people-link-element" },
  { label: "Watchlist", to: "/watchlist", testId: "watchlist-link-element" },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSearchKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div data-testid="header-element" className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar fixed top-0 left-0 right-0 z-50 bg-base-300/80 backdrop-blur-md border-b border-base-content/10 shadow-lg">
          <div className="container mx-auto flex items-center gap-2 px-4">
            {/* Mobile hamburger */}
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost btn-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>

            {/* Logo */}
            <div className="flex-none">
              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7 text-primary"
                >
                  <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                  <path
                    fillRule="evenodd"
                    d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline">Modern Movie Browser</span>
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <ul className="menu menu-horizontal gap-1 p-0">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      data-testid={link.testId}
                      to={link.to}
                      className={`rounded-btn text-sm font-medium transition-colors ${
                        isActive(link.to)
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-content/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Search + Theme toggle */}
            <div className="flex items-center gap-2 ml-auto">
              {searchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-1"
                >
                  <input
                    ref={searchRef}
                    autoFocus
                    className="input input-sm input-bordered w-40 sm:w-56 transition-all"
                    type="text"
                    placeholder="Search…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKey}
                  />
                  <button type="submit" className="btn btn-sm btn-primary">
                    Go
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                  >
                    ✕
                  </button>
                </form>
              ) : (
                <button
                  aria-label="Open search"
                  className="btn btn-sm btn-ghost btn-square"
                  onClick={() => setSearchOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              )}
              <ThemeSwitcher />
            </div>
          </div>
        </div>
        {/* Navbar height spacer */}
        <div className="h-16" />
      </div>

      {/* Mobile drawer */}
      <div data-testid="drawer-element" className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu bg-base-200 min-h-full w-72 p-4 gap-1">
          <li className="menu-title text-lg font-bold mb-2">
            <Link to="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-primary"
              >
                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                <path
                  fillRule="evenodd"
                  d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              Modern Movie Browser
            </Link>
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className={isActive(link.to) ? "active" : ""}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
