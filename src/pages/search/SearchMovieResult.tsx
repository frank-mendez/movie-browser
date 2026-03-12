import { hasValidImageExtension } from "../../utils/utils.ts";
import { DateTime } from "luxon";
import SearchPagination from "./SearchPagination.tsx";
import { SearchMovieResultProps } from "../../types";
import { useNavigate } from "react-router-dom";

const getRatingColor = (r: number) => {
  if (r >= 7) return "badge-success";
  if (r >= 5) return "badge-warning";
  return "badge-error";
};

const MOVIE_SKELETON_KEYS = ["ms-0", "ms-1", "ms-2", "ms-3", "ms-4", "ms-5"];

const SkeletonRow = () => (
  <div className="flex gap-4 rounded-xl bg-base-200 p-3">
    <div className="skeleton h-36 w-24 shrink-0 rounded-lg" />
    <div className="flex flex-1 flex-col gap-3 py-1">
      <div className="skeleton h-5 w-2/3 rounded" />
      <div className="skeleton h-4 w-1/4 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-4/5 rounded" />
    </div>
  </div>
);

const SearchMovieResult = ({
  loading,
  data,
  currentPage,
  handlePageChange,
  mediaType,
}: SearchMovieResultProps) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    if (mediaType === "movie") navigate(`/movies/${id}`);
    else if (mediaType === "tv") navigate(`/tv-shows/${id}`);
  };

  return (
    <div
      data-testid="search-movie-result-element"
      className="flex flex-1 flex-col gap-4"
    >
      {loading && (
        <div data-testid="loading-element" className="flex flex-col gap-4">
          {!data?.results?.length &&
            MOVIE_SKELETON_KEYS.map((key) => <SkeletonRow key={key} />)}
          {data?.results?.length ? (
            <progress className="progress progress-primary w-full" />
          ) : null}
        </div>
      )}

      {!loading && !data?.results?.length && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20 text-center text-base-content/40">
          <svg
            className="h-14 w-14 opacity-40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <p className="text-lg font-medium">No results found</p>
          <p className="text-sm">Try adjusting your search terms</p>
        </div>
      )}

      {data?.results?.map((movie) => {
        const releaseDate =
          movie.release_date ?? movie.first_air_date ?? undefined;
        const imgSrc = hasValidImageExtension(movie.poster_path)
          ? `${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.poster_path}`
          : "/assets/images/default.png";
        const rating = movie.vote_average ?? 0;

        return (
          <button
            type="button"
            key={movie.id}
            className="group flex w-full gap-4 rounded-xl bg-base-200 p-3 text-left transition-all hover:bg-base-300 hover:shadow-lg"
            onClick={() => handleClick(movie.id.toString())}
          >
            <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-lg">
              <img
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={imgSrc}
                alt={movie.title ?? movie.name ?? "Movie"}
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1 overflow-hidden">
              <div className="flex items-start justify-between gap-2">
                <h3 className="line-clamp-2 text-base font-semibold leading-tight transition-colors group-hover:text-primary">
                  {movie.title ?? movie.name}
                </h3>
                {rating > 0 && (
                  <span
                    className={`badge badge-sm shrink-0 ${getRatingColor(rating)}`}
                  >
                    ★ {rating.toFixed(1)}
                  </span>
                )}
              </div>
              {releaseDate && (
                <p className="text-xs text-base-content/50">
                  {DateTime.fromISO(releaseDate).toFormat("MMM d, yyyy")}
                </p>
              )}
              <p className="mt-1 line-clamp-3 text-sm text-base-content/70">
                {movie.overview || "No overview available."}
              </p>
            </div>
          </button>
        );
      })}

      <SearchPagination
        currentPage={currentPage}
        data={data}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchMovieResult;
