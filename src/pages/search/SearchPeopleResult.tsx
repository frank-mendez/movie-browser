import { SearchMovieResultProps } from "../../types";
import Loading from "../../components/Loading.tsx";
import { hasValidImageExtension, truncateString } from "../../utils/utils.ts";
import SearchPagination from "./SearchPagination.tsx";
import { useNavigate } from "react-router-dom";

const SearchPeopleResult = ({
  loading,
  data,
  currentPage,
  handlePageChange,
}: SearchMovieResultProps) => {
  const navigate = useNavigate();

  return (
    <div
      data-testid="search-result-people-element"
      className="flex flex-1 flex-col gap-6"
    >
      {loading && <Loading />}
      {data?.results.map((person) => {
        const imgSrc = hasValidImageExtension(person.profile_path)
          ? `${import.meta.env.VITE_TMDB_IMAGE_URL}${person.profile_path}`
          : "/assets/images/default.png";

        return (
          <button
            type="button"
            key={person.id}
            className="card w-full overflow-hidden bg-base-200 text-left shadow-xl transition-transform hover:-translate-y-0.5 md:card-side"
            onClick={() => navigate(`/people/${person.id}`)}
          >
            <figure className="bg-base-300 md:max-w-[200px] md:flex-none">
              <img
                className="h-56 w-full object-cover md:h-full md:w-[200px]"
                src={imgSrc}
                alt={person.name ?? person.original_name ?? "Person"}
              />
            </figure>
            <div className="card-body flex-1 gap-2">
              <h2 className="card-title">
                {person.name ?? person.original_name}
              </h2>
              <p className="text-sm text-base-content/70">
                {person.known_for_department || "Department unavailable"}
              </p>
              <p className="text-sm text-base-content/80">
                {truncateString(
                  person.known_for
                    .map(
                      (item) => item.title ?? item.name ?? item.original_name,
                    )
                    .join(", "),
                  180,
                ) || "No credits available."}
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

export default SearchPeopleResult;
