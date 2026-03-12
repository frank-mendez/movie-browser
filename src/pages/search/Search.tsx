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
import { SearchTabEnums } from "../../enums";
import { useState, useRef } from "react";
import { SearchTabTypes } from "../../types";
import SearchTab from "./SearchTab.tsx";
import SearchMovieResult from "./SearchMovieResult.tsx";
import SearchPeopleResult from "./SearchPeopleResult.tsx";
import SearchKeywordResult from "./SearchKeywordResult.tsx";
import SearchCompanyResult from "./SearchCompanyResult.tsx";
import { MediaTypeEnum } from "../../enums/MovieTabEnum.ts";

const Search = () => {
  const [search, setSearch] = useSearchParams();
  const [currentSearchTab, setCurrentSearchTab] = useState<SearchTabEnums>(
    SearchTabEnums.MOVIES,
  );
  const query = search.get("query") || "";
  const params = {
    query,
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
    setSearch({ page: page.toString(), query });
    window.scrollTo(0, 0);
  };
  const currentPage = Number.parseInt(search.get("page") || "1") - 1;

  const handleTabChange = (value: SearchTabEnums) => {
    setSearch({ page: "1", query });
    setCurrentSearchTab(value);
  };

  const SearchTabs: SearchTabTypes[] = [
    {
      loading: moviePending,
      count: movieData?.total_results || 0,
      isActive: currentSearchTab === SearchTabEnums.MOVIES,
      title: SearchTabEnums.MOVIES,
      onClick: handleTabChange,
    },
    {
      loading: tvShowPending,
      count: tvShowData?.total_results || 0,
      isActive: currentSearchTab === SearchTabEnums.TV_SHOWS,
      title: SearchTabEnums.TV_SHOWS,
      onClick: handleTabChange,
    },
    {
      loading: peoplePending,
      count: peopleData?.total_results || 0,
      isActive: currentSearchTab === SearchTabEnums.PEOPLE,
      title: SearchTabEnums.PEOPLE,
      onClick: handleTabChange,
    },
    {
      loading: keywordPending,
      count: keywordData?.total_results || 0,
      isActive: currentSearchTab === SearchTabEnums.KEYWORDS,
      title: SearchTabEnums.KEYWORDS,
      onClick: handleTabChange,
    },
    {
      loading: collectionPending,
      count: collectionData?.total_results || 0,
      isActive: currentSearchTab === SearchTabEnums.COLLECTIONS,
      title: SearchTabEnums.COLLECTIONS,
      onClick: handleTabChange,
    },
    {
      loading: companyPending,
      count: companyData?.total_results || 0,
      isActive: currentSearchTab === SearchTabEnums.COMPANIES,
      title: SearchTabEnums.COMPANIES,
      onClick: handleTabChange,
    },
  ];

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputRef.current?.value.trim();
    if (val) setSearch({ query: val, page: "1" });
  };

  return (
    <AppLayout>
      <div className="min-h-screen pt-20">
        {/* Search Header */}
        <div className="border-b border-base-300 bg-base-200/60 backdrop-blur-md px-4 py-8">
          <div className="container mx-auto flex flex-col gap-4">
            {query ? (
              <h1 data-testid="search-result" className="text-2xl font-bold">
                Results for{" "}
                <span className="text-primary">&ldquo;{query}&rdquo;</span>
              </h1>
            ) : (
              <h1 data-testid="search-result" className="text-2xl font-bold text-base-content/40">
                Search for movies, TV shows &amp; people
              </h1>
            )}
            <form onSubmit={handleSearch} className="flex max-w-xl gap-2">
              <label className="input input-bordered flex flex-1 items-center gap-2">
                <svg className="h-4 w-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  ref={inputRef}
                  data-testid="search-input"
                  type="text"
                  className="grow bg-transparent outline-none"
                  placeholder="Refine your search…"
                  defaultValue={query}
                  key={query}
                />
              </label>
              <button type="submit" className="btn btn-primary">Search</button>
            </form>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {/* Sidebar Tabs */}
            <aside className="flex-none lg:w-56">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-base-content/40">Category</p>
              <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
                {SearchTabs.map((tab) => (
                  <SearchTab
                    key={tab.title}
                    title={tab.title}
                    loading={tab.loading}
                    onClick={tab.onClick}
                    count={tab.count}
                    isActive={tab.isActive}
                  />
                ))}
              </div>
            </aside>

            {/* Results */}
            <main className="flex-1 min-w-0">
              {currentSearchTab === SearchTabEnums.MOVIES && (
                <SearchMovieResult loading={moviePending} data={movieData} currentPage={currentPage} handlePageChange={handlePageChange} mediaType={MediaTypeEnum.MOVIE} />
              )}
              {currentSearchTab === SearchTabEnums.TV_SHOWS && (
                <SearchMovieResult loading={tvShowPending} data={tvShowData} currentPage={currentPage} handlePageChange={handlePageChange} mediaType={MediaTypeEnum.TV} />
              )}
              {currentSearchTab === SearchTabEnums.PEOPLE && (
                <SearchPeopleResult loading={peoplePending} handlePageChange={handlePageChange} data={peopleData} currentPage={currentPage} mediaType={MediaTypeEnum.PERSON} />
              )}
              {currentSearchTab === SearchTabEnums.COLLECTIONS && (
                <SearchMovieResult loading={collectionPending} data={collectionData} currentPage={currentPage} handlePageChange={handlePageChange} mediaType={MediaTypeEnum.COLLECTION} />
              )}
              {currentSearchTab === SearchTabEnums.KEYWORDS && (
                <SearchKeywordResult loading={keywordPending} data={keywordData} handlePageChange={handlePageChange} currentPage={currentPage} mediaType={MediaTypeEnum.KEYWORD} />
              )}
              {currentSearchTab === SearchTabEnums.COMPANIES && (
                <SearchCompanyResult loading={companyPending} data={companyData} currentPage={currentPage} handlePageChange={handlePageChange} mediaType={MediaTypeEnum.COMPANY} />
              )}
            </main>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;
