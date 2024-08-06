import { Link } from "react-router-dom";
import { SearchMovieResultProps } from "../../types";
import SearchPagination from "./SearchPagination.tsx";

const SearchKeywordResult = ({
  loading,
  data,
  currentPage,
  handlePageChange,
}: SearchMovieResultProps) => {
  return (
    <div className={`${loading ? "skeleton w-52 h-12" : ""}`}>
      <ul>
        {data &&
          data.results.map((result) => (
            <li key={result.id}>
              <Link to="/">{result.name}</Link>
            </li>
          ))}
      </ul>
      <SearchPagination
        currentPage={currentPage}
        data={data}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchKeywordResult;
