import { SearchTabTypes } from "../../types";

const SearchTab = ({
  loading,
  count,
  isActive,
  title,
  onClick,
}: SearchTabTypes) => {
  return (
    <button
      data-testid="search-tab-button"
      onClick={() => onClick(title)}
      disabled={loading || count === 0}
      className={`flex w-full min-w-max items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all ${
        isActive
          ? "bg-primary text-primary-content shadow-md"
          : "bg-base-200 text-base-content/70 hover:bg-base-300 hover:text-base-content disabled:opacity-40"
      }`}
    >
      <span>{title}</span>
      <span
        className={`ml-3 rounded-full px-2 py-0.5 text-xs font-semibold ${
          isActive ? "bg-primary-content/20 text-primary-content" : "bg-base-300"
        } ${loading ? "skeleton w-8" : ""}`}
      >
        {loading ? "" : count.toLocaleString()}
      </span>
    </button>
  );
};

export default SearchTab;
