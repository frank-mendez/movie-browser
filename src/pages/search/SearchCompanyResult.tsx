import { SearchMovieResultProps } from "../../types";
import SearchPagination from "./SearchPagination.tsx";
import ReactCountryFlag from "react-country-flag";

const SearchCompanyResult = ({
  loading,
  data,
  currentPage,
  handlePageChange,
}: SearchMovieResultProps) => {
  return (
    <div className={`${loading ? "skeleton w-52 h-12" : ""}`}>
      <div className="grid grid-cols-4 gap-4 mb-10">
        {data &&
          data.results.map((result) => (
            <div
              key={result.id}
              className="rounded-btn bg-base-200 p-4 cursor-pointer"
            >
              {result.logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${result.logo_path}`}
                  alt={result.name}
                  className="w-auto h-auto"
                />
              )}
              <p> Name: {result.name}</p>
              <p> Origin Country: {result.origin_country ?? "N/A"}</p>{" "}
              {result.origin_country && (
                <ReactCountryFlag countryCode={result.origin_country} />
              )}
            </div>
          ))}
      </div>
      <SearchPagination
        currentPage={currentPage}
        data={data}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchCompanyResult;
