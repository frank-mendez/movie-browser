import { Search } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSearch = () => {
    navigate(`/search?${search.toString()}`);
  };
  return (
    <div className="flex flex-row gap-2">
      <input
        className="input input-bordered w-full"
        type="text"
        placeholder="Search for a movie, tv show, person"
        value={search.get("query") || ""}
        onChange={(e) => setSearch({ query: e.target.value })}
        onKeyDown={handleKeyDown}
      />
      <button className="btn" onClick={handleSearch}>
        Search
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
