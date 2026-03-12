import { SearchMovieResultProps } from "../../types";
import SearchPagination from "./SearchPagination.tsx";
import ReactCountryFlag from "react-country-flag";

const COMPANY_SKELETON_KEYS = ["cs-0", "cs-1", "cs-2", "cs-3", "cs-4", "cs-5"];

const SearchCompanyResult = ({
  loading,
  data,
  currentPage,
  handlePageChange,
}: SearchMovieResultProps) => {
  if (loading) {
    return (
      <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {COMPANY_SKELETON_KEYS.map((key) => (
          <div key={key} className="skeleton h-40 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!data?.results?.length) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-base-content/40">
        <p className="text-lg">No companies found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.results.map((result) => (
          <article
            key={result.id}
            className="card bg-base-200 shadow-lg transition-all hover:bg-base-300 hover:shadow-xl"
          >
            <div className="card-body gap-3">
              {result.logo_path ? (
                <div className="flex h-20 items-center justify-center rounded-lg bg-white/10 p-3">
                  <img
                    src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${result.logo_path}`}
                    alt={result.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex h-20 items-center justify-center rounded-lg bg-base-300 text-base-content/30">
                  <svg
                    className="h-10 w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              )}
              <h2 className="card-title text-base">{result.name}</h2>
              {result.origin_country && (
                <div className="flex items-center gap-2 text-sm text-base-content/60">
                  <ReactCountryFlag countryCode={result.origin_country} svg />
                  <span>{result.origin_country}</span>
                </div>
              )}
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
