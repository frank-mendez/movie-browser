import AppLayout from "../../layout/AppLayout.tsx";
import { useSearchParams } from "react-router-dom";
import {
  useSearchCollectionsQuery,
  useSearchCompaniesQuery,
  useSearchKeywordsQuery,
  useSearchMovieKeywordQuery,
  useSearchPeopleKeywordQuery,
  useSearchTvShowKeywordQuery,
} from "../../api/search/query/useSearchMovieKeywordQuery.ts";
import Loading from "../../components/Loading.tsx";
import { DateTime } from "luxon";
import { hasGoodImageExtension, truncateString } from "../../utils/utils.ts";

const Search = () => {
  const [search, setSearch] = useSearchParams();
  const params = {
    query: search.get("query") || "",
    page: search.get("page") || "1",
  };
  const { data: movieData, isPending: moviePending } =
    useSearchMovieKeywordQuery(params);
  const { data: tvShowData, isPending: tvShowPending } =
    useSearchTvShowKeywordQuery(params);
  const { data: peopleData, isPending: peoplePending } =
    useSearchPeopleKeywordQuery(params);
  const { data: keywordData, isPending: keywordPending } =
    useSearchKeywordsQuery(params);
  const { data: collectionData, isPending: collectionPending } =
    useSearchCollectionsQuery(params);
  const { data: companyData, isPending: companyPending } =
    useSearchCompaniesQuery(params);

  const handlePageChange = (page: number) => {
    setSearch({ page: page.toString(), query: search.get("query") || "" });
    window.scrollTo(0, 0);
  };
  const currentPage = parseInt(search.get("page") || "1") - 1;

  return (
    <AppLayout>
      <div className="container m-auto">
        <div className="flex flex-row gap-2 my-10">
          <input
            data-testid="search-input"
            className="input input-bordered w-full"
            type="text"
            placeholder="Search for a movie, tv show, person"
            value={search.get("query") || ""}
            onChange={(e) => setSearch({ query: e.target.value })}
          />
          <button className="btn">Search</button>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col flex-none gap-4">
            <h1 data-testid="search-result" className="text-4xl">
              Search Results
            </h1>
            <button className="btn justify-between btn-active">
              Movies
              <div
                className={`badge badge-info ${moviePending ? "skeleton w-10" : ""}`}
              >
                {movieData?.total_results}
              </div>
            </button>
            <button className="btn justify-between">
              TV Shows
              <div
                className={`badge badge-info ${tvShowPending ? "skeleton w-10" : ""}`}
              >
                {tvShowData?.total_results}
              </div>
            </button>
            <button className="btn justify-between">
              People
              <div
                className={`badge badge-info ${peoplePending ? "skeleton w-10" : ""}`}
              >
                {peopleData?.total_results}
              </div>
            </button>
            <button className="btn justify-between">
              Keywords
              <div
                className={`badge badge-info ${keywordPending ? "skeleton w-10" : ""}`}
              >
                {keywordData?.total_results}
              </div>
            </button>
            <button className="btn justify-between">
              Collections
              <div
                className={`badge badge-info ${collectionPending ? "skeleton w-10" : ""}`}
              >
                {collectionData?.total_results}
              </div>
            </button>
            <button className="btn justify-between">
              Companies
              <div
                className={`badge badge-info ${companyPending ? "skeleton w-10" : ""}`}
              >
                {companyData?.total_results}
              </div>
            </button>
          </div>
          <div className="flex flex-col flex-1 gap-6 cursor-pointer">
            {moviePending && <Loading />}
            {movieData?.results.map((movie) => {
              const releaseDate = movie.release_date;
              const imgSrc = hasGoodImageExtension(movie.poster_path)
                ? `${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.poster_path}`
                : "/assets/images/default.png";
              return (
                <div
                  key={movie.id}
                  className="card card-side bg-base-200 shadow-xl w-full h-52 flex flex-row"
                >
                  <figure className="flex-none">
                    <img
                      className="max-w-[200px] h-full"
                      src={imgSrc}
                      alt="Movie"
                    />
                  </figure>
                  <div className="card-body flex-1">
                    <h2 className="card-title">{movie.title}</h2>
                    <p className="text-gray-500">
                      Release Date:{" "}
                      {releaseDate
                        ? DateTime.fromISO(releaseDate).toFormat("DDD")
                        : ""}
                    </p>
                    <p>Vote average: {movie.vote_average}</p>
                    <p>{truncateString(movie.overview, 200)}</p>
                  </div>
                </div>
              );
            })}
            <div className="join m-auto">
              {movieData && movieData?.total_pages > 1 && (
                <>
                  {currentPage > 0 && (
                    <button
                      onClick={() => handlePageChange(currentPage)}
                      className="join-item btn mr-2"
                    >
                      «
                    </button>
                  )}
                  {Array.from({ length: movieData.total_pages }, (_, i) => {
                    const currentPage = parseInt(search.get("page") || "1") - 1;
                    if (
                      (i >= currentPage && i < currentPage + 4) ||
                      i === movieData.total_pages - 1
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
                  {currentPage < movieData.total_pages - 1 && (
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
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;
