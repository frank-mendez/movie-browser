import type { ReactNode } from "react";
import ReactCountryFlag from "react-country-flag";
import { Genre } from "../types/movies.ts";

type DetailHeroBannerProps = {
  isPending: boolean;
  backdropPath?: string;
  posterPath?: string;
  title?: string;
  voteAverage?: number;
  ratingColor: string;
  originCountry?: string[];
  mediaBadge?: ReactNode;
  year?: string;
  tagline?: string;
  genres?: Genre[];
  overview?: string;
  hasTrailer: boolean;
  inWatchlist: boolean;
  onOpenTrailer: () => void;
  onToggleWatchlist: () => void;
};

const DetailHeroBanner = ({
  isPending,
  backdropPath,
  posterPath,
  title,
  voteAverage = 0,
  ratingColor,
  originCountry,
  mediaBadge,
  year,
  tagline,
  genres = [],
  overview = "",
  hasTrailer,
  inWatchlist,
  onOpenTrailer,
  onToggleWatchlist,
}: DetailHeroBannerProps) => {
  const backdropUrl = backdropPath
    ? import.meta.env.VITE_TMDB_IMAGE_MULTI_FACE + backdropPath
    : undefined;
  const posterUrl = posterPath
    ? import.meta.env.VITE_TMDB_IMAGE_URL + posterPath
    : undefined;

  return (
    <div className="relative w-full min-h-[60vh] flex items-end overflow-hidden">
      {backdropPath ? (
        <img
          src={backdropUrl}
          alt={title ?? ""}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 bg-base-200" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/60 to-transparent" />

      {isPending && (
        <div
          data-testid="loading-element"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      )}

      {title && (
        <div className="relative z-10 container mx-auto px-4 md:px-8 pb-8 flex flex-col md:flex-row gap-6 items-end">
          {/* Poster */}
          <img
            src={posterUrl}
            alt={title}
            loading="lazy"
            className="w-40 md:w-56 rounded-xl shadow-2xl flex-none border border-white/10"
          />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`badge font-bold ${ratingColor}`}>
                ★ {voteAverage.toFixed(1)}
              </span>
              {originCountry?.[0] && (
                <ReactCountryFlag
                  countryCode={originCountry[0]}
                  svg
                  className="text-xl"
                />
              )}
              {mediaBadge}
              <span className="text-sm opacity-60">{year}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-1 leading-tight">
              {title}
            </h1>
            {tagline && (
              <p className="italic text-base-content/60 mb-3 text-sm">
                "{tagline}"
              </p>
            )}

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {genres.map((g) => (
                <span key={g.id} className="badge badge-outline badge-sm">
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-sm md:text-base leading-relaxed text-base-content/80 max-w-2xl mb-5 line-clamp-4">
              {overview}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {hasTrailer && (
                <button
                  className="btn btn-primary btn-sm md:btn-md"
                  onClick={onOpenTrailer}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82Z" />
                  </svg>
                  Watch Trailer
                </button>
              )}
              <button
                className={`btn btn-sm md:btn-md ${inWatchlist ? "btn-secondary" : "btn-outline"}`}
                onClick={onToggleWatchlist}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={inWatchlist ? "currentColor" : "none"}
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
                {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailHeroBanner;
