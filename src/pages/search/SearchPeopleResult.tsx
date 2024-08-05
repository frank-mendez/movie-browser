import { SearchMovieResultProps } from "../../types";
import Loading from "../../components/Loading.tsx";
import { hasGoodImageExtension } from "../../utils/utils.ts";
import SearchPagination from "./SearchPagination.tsx";

const SearchPeopleResult = ({
  loading,
  data,
  currentPage,
  handlePageChange,
}: SearchMovieResultProps) => {
  return (
    <div className="flex flex-col flex-1 gap-6 cursor-pointer">
      {loading && <Loading />}
      {data?.results.map((movie) => {
        const imgSrc = hasGoodImageExtension(movie.profile_path)
          ? `${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.profile_path}`
          : "/assets/images/default.png";
        return (
          <div
            key={movie.id}
            className="card card-side bg-base-200 shadow-xl w-full h-52 flex flex-row"
          >
            <figure className="flex-none">
              <img className="h-full" src={imgSrc} alt="Movie" />
            </figure>
            <div className="card-body flex-1">
              <p>{movie.original_name}</p>
              <p>{movie.known_for_department}</p>
              <p>
                {movie.known_for
                  .map((item) => item.title ?? item.name ?? item.original_name)
                  .join(", ")}
              </p>
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

export default SearchPeopleResult;
