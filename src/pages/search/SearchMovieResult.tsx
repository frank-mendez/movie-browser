import Loading from "../../components/Loading.tsx";
import { hasValidImageExtension, truncateString } from "../../utils/utils.ts";
import { DateTime } from "luxon";
import SearchPagination from "./SearchPagination.tsx";
import { SearchMovieResultProps } from "../../types";
import { useNavigate } from "react-router-dom";

const SearchMovieResult = ({
  loading,
  data,
  currentPage,
  handlePageChange,
  mediaType,
}: SearchMovieResultProps) => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    if (mediaType === "movie") {
      navigate(`/movies/${id}`);
    } else if (mediaType === "tv") {
      navigate(`/tv-shows/${id}`);
    }
  };

  return (
    <div
      data-testid="search-movie-result-element"
      className="flex flex-1 flex-col gap-6"
    >
      {loading && <Loading />}
      {data?.results.map((movie) => {
        const releaseDate =
          movie.release_date ?? movie.first_air_date ?? undefined;
        const imgSrc = hasValidImageExtension(movie.poster_path)
          ? `${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.poster_path}`
          : "/assets/images/default.png";

        return (
          <button
            type="button"
            key={movie.id}
            className="card w-full overflow-hidden bg-base-200 text-left shadow-xl transition-transform hover:-translate-y-0.5 md:card-side"
            onClick={() => handleClick(movie.id.toString())}
          >
            <figure className="bg-base-300 md:max-w-[200px] md:flex-none">
              <img
                className="h-56 w-full object-cover md:h-full md:w-[200px]"
                src={imgSrc}
                alt={movie.title ?? movie.name ?? "Movie"}
              />
            </figure>
            <div className="card-body flex-1 gap-2">
              <h2 className="card-title">{movie.title ?? movie.name}</h2>
              <p className="text-sm text-base-content/70">
                Release Date:{" "}
                {releaseDate
                  ? DateTime.fromISO(releaseDate).toFormat("DDD")
                  : "N/A"}
              </p>
              <p className="text-sm">
                Vote average: {movie.vote_average ?? "N/A"}
              </p>
              <p className="text-sm text-base-content/80">
                {movie.overview
                  ? truncateString(movie.overview, 200)
                  : "No overview available."}
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
