import { Movie } from "../types/movies.ts";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../hooks/useWatchlist.ts";

type HeroSectionProps = {
  movie: Movie;
  onPlayTrailer?: () => void;
};

const HeroSection = ({ movie, onPlayTrailer }: HeroSectionProps) => {
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);
  const backdropUrl =
    import.meta.env.VITE_TMDB_IMAGE_MULTI_FACE + movie.backdrop_path;
  const title = movie.title ?? movie.name ?? "Untitled";
  const rating = Math.round(movie.vote_average * 10);
  const mediaType = movie.media_type ?? "movie";

  const handleViewDetails = () => {
    if (mediaType === "movie") navigate(`/movies/${movie.id}`);
    else if (mediaType === "tv") navigate(`/tv-shows/${movie.id}`);
  };

  const toggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({ ...movie });
    }
  };

  return (
    <div className="relative w-full min-h-[70vh] flex items-end overflow-hidden rounded-2xl">
      {/* Backdrop */}
      {movie.backdrop_path ? (
        <img
          src={backdropUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-[10s] ease-out"
          loading="eager"
        />
      ) : (
        <div className="absolute inset-0 bg-base-200" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-base-100/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-12 max-w-2xl animate-[slidein_0.8s_ease_100ms_both]">
        {/* Media type badge */}
        <span className="badge badge-primary badge-sm uppercase tracking-wider mb-3">
          {mediaType === "tv" ? "TV Show" : "Movie"}
        </span>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-3 text-white drop-shadow-2xl">
          {title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-white/80">
          <span
            className={`badge font-bold ${
              rating >= 70
                ? "badge-success"
                : rating >= 40
                  ? "badge-warning"
                  : "badge-error"
            }`}
          >
            ★ {movie.vote_average.toFixed(1)}
          </span>
          {(movie.release_date ?? movie.first_air_date) && (
            <span className="opacity-80">
              {(movie.release_date ?? movie.first_air_date ?? "").slice(0, 4)}
            </span>
          )}
        </div>

        {movie.overview && (
          <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-3 mb-6 max-w-xl">
            {movie.overview}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleViewDetails}
            className="btn btn-primary btn-sm md:btn-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82Z" />
            </svg>
            View Details
          </button>
          {onPlayTrailer && (
            <button
              onClick={onPlayTrailer}
              className="btn btn-outline btn-sm md:btn-md text-white border-white/40 hover:bg-white/10 hover:border-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                />
              </svg>
              Watch Trailer
            </button>
          )}
          <button
            onClick={toggleWatchlist}
            className={`btn btn-sm md:btn-md ${
              inWatchlist
                ? "btn-secondary"
                : "btn-outline border-white/40 text-white hover:bg-white/10 hover:border-white"
            }`}
          >
            {inWatchlist ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                    clipRule="evenodd"
                  />
                </svg>
                Saved
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
                Watchlist
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
