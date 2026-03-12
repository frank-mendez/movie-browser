import { useNavigate } from "react-router-dom";
import { SearchMovieResultProps } from "../../types";
import SearchPagination from "./SearchPagination.tsx";

const SearchKeywordResult = ({
  loading,
  data,
  currentPage,
  handlePageChange,
}: SearchMovieResultProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex flex-1 flex-wrap gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="skeleton h-8 w-24 rounded-full" />
        ))}
      </div>
    );
  }

  if (!data?.results?.length) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-base-content/40">
        <p className="text-lg">No keywords found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {data.results.map((result) => (
          <button
            key={result.id}
            onClick={() =>
              navigate(`/search?query=${encodeURIComponent(result.name ?? "")}`)
            }
            className="badge badge-lg badge-outline cursor-pointer transition-colors hover:badge-primary"
          >
            {result.name}
          </button>
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

export default SearchKeywordResult;
