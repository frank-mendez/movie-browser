import Loading from "../../components/Loading.tsx";
import { hasGoodImageExtension, truncateString } from "../../utils/utils.ts";
import { DateTime } from "luxon";
import SearchPagination from "./SearchPagination.tsx";
import { SearchMovieResultProps } from "../../types";

const SearchMovieResult = ({
  loading,
  data,
  currentPage,
  handlePageChange,
}: SearchMovieResultProps) => {
  return (
    <div className="flex flex-col flex-1 gap-6 cursor-pointer">
      {loading && <Loading />}
      {data?.results.map((movie) => {
        const releaseDate =
          movie.release_date ?? movie.first_air_date ?? undefined;
        const imgSrc = hasGoodImageExtension(movie.poster_path)
          ? `${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.poster_path}`
          : "/assets/images/default.png";
        return (
          <div
            key={movie.id}
            className="card card-side bg-base-200 shadow-xl w-full h-52 flex flex-row"
          >
            <figure className="flex-none">
              <img className="max-w-[200px] h-full" src={imgSrc} alt="Movie" />
            </figure>
            <div className="card-body flex-1">
              <h2 className="card-title">{movie.title ?? movie.name}</h2>
              <p className="text-gray-500">
                Release Date:{" "}
                {releaseDate
                  ? DateTime.fromISO(releaseDate).toFormat("DDD")
                  : "N/A"}
              </p>
              <p>Vote average: {movie.vote_average ?? "N/A"}</p>
              <p>{movie.overview && truncateString(movie.overview, 200)}</p>
            </div>
          </div>
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
