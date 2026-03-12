import { SearchMovieResultProps } from "../../types";
import { hasValidImageExtension, truncateString } from "../../utils/utils.ts";
import SearchPagination from "./SearchPagination.tsx";
import { useNavigate } from "react-router-dom";

const SkeletonRow = () => (
  <div className="flex gap-4 rounded-xl bg-base-200 p-3">
    <div className="skeleton h-20 w-20 shrink-0 rounded-full" />
    <div className="flex flex-1 flex-col justify-center gap-3">
      <div className="skeleton h-5 w-1/2 rounded" />
      <div className="skeleton h-4 w-1/4 rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
    </div>
  </div>
);

const SearchPeopleResult = ({
  loading,
  data,
  currentPage,
  handlePageChange,
}: SearchMovieResultProps) => {
  const navigate = useNavigate();

  return (
    <div data-testid="search-result-people-element" className="flex flex-1 flex-col gap-4">
      {loading && (
        <div data-testid="loading-element" className="flex flex-col gap-4">
          {!data?.results?.length &&
            Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
          {data?.results?.length ? (
            <progress className="progress progress-primary w-full" />
          ) : null}
        </div>
      )}

      {!loading && !data?.results?.length && (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-20 text-center text-base-content/40">
          <svg className="h-14 w-14 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-lg font-medium">No people found</p>
        </div>
      )}

      {data?.results?.map((person) => {
        const imgSrc = hasValidImageExtension(person.profile_path)
          ? `${import.meta.env.VITE_TMDB_IMAGE_URL}${person.profile_path}`
          : "/assets/images/default.png";
        const knownFor = person.known_for
          ?.map((item) => item.title ?? item.name ?? item.original_name)
          .filter(Boolean)
          .join(", ");

        return (
          <button
            type="button"
            key={person.id}
            className="group flex w-full gap-4 rounded-xl bg-base-200 p-3 text-left transition-all hover:bg-base-300 hover:shadow-lg"
            onClick={() => navigate(`/people/${person.id}`)}
          >
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-base-300 transition-colors group-hover:border-primary">
              <img
                className="h-full w-full object-cover"
                src={imgSrc}
                alt={person.name ?? person.original_name ?? "Person"}
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1">
              <h3 className="text-base font-semibold transition-colors group-hover:text-primary">
                {person.name ?? person.original_name}
              </h3>
              {person.known_for_department && (
                <span className="badge badge-sm badge-outline w-fit">
                  {person.known_for_department}
                </span>
              )}
              {knownFor && (
                <p className="mt-0.5 line-clamp-2 text-sm text-base-content/60">
                  Known for: {truncateString(knownFor, 150)}
                </p>
              )}
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
