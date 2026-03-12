import { SearchPaginationProps } from "../../types";
import { useSearchParams } from "react-router-dom";

const SearchPagination = ({
  data,
  handlePageChange,
}: SearchPaginationProps) => {
  const [search] = useSearchParams();
  const activePage = parseInt(search.get("page") || "1");
  const maxPages = Math.min(data?.total_pages ?? 0, 500); // TMDB caps at 500

  if (!data || maxPages <= 1) {
    return <div data-testid="search-pagination-element" />;
  }

  const pages: (number | "...")[] = [];
  if (maxPages <= 7) {
    for (let i = 1; i <= maxPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (activePage > 3) pages.push("...");
    for (
      let i = Math.max(2, activePage - 1);
      i <= Math.min(maxPages - 1, activePage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (activePage < maxPages - 2) pages.push("...");
    pages.push(maxPages);
  }

  return (
    <div data-testid="search-pagination-element" className="mt-6 flex justify-center">
      <div className="join">
        <button
          className="join-item btn btn-sm"
          disabled={activePage === 1}
          onClick={() => handlePageChange(activePage - 1)}
        >
          «
        </button>
        {pages.map((page, i) =>
          page === "..." ? (
            <button key={`ellipsis-${i}`} className="join-item btn btn-sm btn-disabled">
              …
            </button>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page as number)}
              className={`join-item btn btn-sm ${
                activePage === page ? "btn-active btn-primary" : ""
              }`}
            >
              {page}
            </button>
          ),
        )}
        <button
          className="join-item btn btn-sm"
          disabled={activePage >= maxPages}
          onClick={() => handlePageChange(activePage + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default SearchPagination;
