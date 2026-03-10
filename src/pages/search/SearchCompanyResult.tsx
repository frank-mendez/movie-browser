import { SearchMovieResultProps } from "../../types";
import SearchPagination from "./SearchPagination.tsx";
import ReactCountryFlag from "react-country-flag";
import Loading from "../../components/Loading.tsx";

const SearchCompanyResult = ({
  loading,
  data,
  currentPage,
  handlePageChange,
}: SearchMovieResultProps) => {
  return (
    <div className="flex flex-1 flex-col gap-6">
      {loading && <Loading />}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data?.results.map((result) => (
          <article key={result.id} className="card bg-base-200 shadow-xl">
            <div className="card-body gap-3">
              {result.logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${result.logo_path}`}
                  alt={result.name}
                  className="h-24 w-full rounded-lg object-contain bg-base-100 p-3"
                />
              )}
              <h2 className="card-title">{result.name}</h2>
              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <span>Origin Country: {result.origin_country ?? "N/A"}</span>
                {result.origin_country && (
                  <ReactCountryFlag countryCode={result.origin_country} />
                )}
              </div>
            </div>
          </article>
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
