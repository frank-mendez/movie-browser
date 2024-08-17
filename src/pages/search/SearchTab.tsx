import {SearchTabTypes} from "../../types";

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
            className={`btn justify-between ${isActive ? "btn-active" : ""}`}
        >
            {title}
            <div className={`badge badge-info ${loading ? "skeleton w-10" : ""}`}>
                {count}
            </div>
        </button>
    );
};

export default SearchTab;
