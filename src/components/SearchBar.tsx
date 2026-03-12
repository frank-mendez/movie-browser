import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const DEBOUNCE_MS = 400;

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(searchParams.get("query") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep local value in sync if URL query changes (e.g. browser back)
  useEffect(() => {
    setValue(searchParams.get("query") ?? "");
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setValue(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.trim()) {
      debounceRef.current = setTimeout(() => {
        navigate(`/search?query=${encodeURIComponent(q.trim())}`);
      }, DEBOUNCE_MS);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      navigate(`/search?query=${encodeURIComponent(value.trim())}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim()) {
      navigate(`/search?query=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form
      data-testid="searchbar-element"
      onSubmit={handleSubmit}
      className="flex gap-2 w-full"
    >
      <label className="input input-bordered flex items-center gap-2 flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4 opacity-50 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          className="grow bg-transparent outline-none placeholder:opacity-50"
          placeholder="Search movies, TV shows, people…"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            className="opacity-50 hover:opacity-100 transition-opacity"
            onClick={() => setValue("")}
          >
            ✕
          </button>
        )}
      </label>
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
