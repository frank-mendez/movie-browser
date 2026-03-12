import { Movie } from "../types/movies.ts";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import { MediaTypeEnum } from "../enums/MovieTabEnum.ts";

type GenreMapByType = {
  movie?: Record<number, string>;
  tv?: Record<number, string>;
};

const getRatingColor = (rating: number) => {
  if (rating >= 70) return "badge-success";
  if (rating >= 40) return "badge-warning";
  return "badge-error";
};

const MovieCard = ({
  movies,
  mediaType,
  genreMapByType,
}: {
  movies: Movie[];
  mediaType?: MediaTypeEnum;
  genreMapByType?: GenreMapByType;
}) => {
  const navigate = useNavigate();
  const handleClick = (id: string, type: string) => {
    if (type === "movie") {
      navigate(`/movies/${id}`);
    } else if (type === "tv") {
      navigate(`/tv-shows/${id}`);
    }
  };

  return (
    <>
      {movies.map((movie) => {
        const releaseDate = movie.release_date ?? movie.first_air_date;
        const rating = Math.round(movie.vote_average * 10);
        const currentMediaType = movie.media_type ?? mediaType;
        const isSupportedMediaType =
          currentMediaType === "movie" || currentMediaType === "tv";

        if (!isSupportedMediaType) return null;

        const genreMap =
          currentMediaType === "tv"
            ? genreMapByType?.tv
            : genreMapByType?.movie;
        const genreNames = (movie.genre_ids ?? [])
          .map((id) => genreMap?.[id])
          .filter(Boolean)
          .slice(0, 2)
          .join(" · ");

        const year = releaseDate
          ? DateTime.fromISO(releaseDate).toFormat("yyyy")
          : null;

        return (
          <button
            onClick={() => handleClick(movie.id.toString(), currentMediaType)}
            key={movie.id}
            className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {/* Poster */}
            <div className="aspect-[2/3] w-full overflow-hidden bg-base-300">
              {movie.poster_path ? (
                <img
                  loading="lazy"
                  src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.poster_path}`}
                  alt={movie.title ?? movie.name ?? "Movie poster"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-base-200 text-base-content/30">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="h-16 w-16"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125h-.625a1.125 1.125 0 0 1-1.125-1.125V4.875A1.125 1.125 0 0 1 3 3.75h17.25A1.125 1.125 0 0 1 21.375 4.875v13.5A1.125 1.125 0 0 1 20.25 19.5h-.625"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Rating badge */}
            <span
              className={`badge ${getRatingColor(rating)} absolute top-2 right-2 font-bold text-xs`}
            >
              {rating}%
            </span>

            {/* Bottom overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 translate-y-0 transition-transform duration-300">
              <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 mb-1">
                {movie.title ?? movie.name}
              </h3>
              <div className="flex items-center gap-2 text-white/70 text-xs">
                {year && <span>{year}</span>}
                {genreNames && (
                  <>
                    <span className="opacity-40">·</span>
                    <span className="truncate">{genreNames}</span>
                  </>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </>
  );
};

export default MovieCard;
