import { SearchPaginationProps } from "../../types";
import { useSearchParams } from "react-router-dom";

const SearchPagination = ({
  currentPage,
  data,
  handlePageChange,
}: SearchPaginationProps) => {
  const [search] = useSearchParams();
  return (
    <div className="join m-auto">
      {data && data?.total_pages > 1 && (
        <>
          {currentPage > 0 && (
            <button
              onClick={() => handlePageChange(currentPage)}
              className="join-item btn mr-2"
            >
              «
            </button>
          )}
          {Array.from({ length: data.total_pages }, (_, i) => {
            const currentPage = parseInt(search.get("page") || "1") - 1;
            if (
              (i >= currentPage && i < currentPage + 4) ||
              i === data.total_pages - 1
            ) {
              return (
                <button
                  onClick={() => handlePageChange(i + 1)}
                  key={i}
                  className={`btn mr-2 ${
                    i + 1 === parseInt(search.get("page") || "1")
                      ? "btn-active"
                      : ""
                  }`}
                >
                  {i + 1}
                </button>
              );
            } else if (i === currentPage + 4) {
              return (
                <button key={i} className="btn mr-2 btn-disabled">
                  ...
                </button>
              );
            }
            return null;
          })}
          {currentPage < data.total_pages - 1 && (
            <button
              onClick={() => handlePageChange(currentPage + 2)}
              className="join-item btn"
            >
              »
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPagination;
