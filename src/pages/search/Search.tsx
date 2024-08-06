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
import { useState } from "react";
import { SearchTabTypes } from "../../types";
import SearchTab from "./SearchTab.tsx";
import SearchMovieResult from "./SearchMovieResult.tsx";
import SearchPeopleResult from "./SearchPeopleResult.tsx";
import SearchKeywordResult from "./SearchKeywordResult.tsx";
import SearchCompanyResult from "./SearchCompanyResult.tsx";

const Search = () => {
  const [search, setSearch] = useSearchParams();
  const [currentSearchTab, setCurrentSearchTab] = useState<SearchTabEnums>(
    SearchTabEnums.MOVIES,
  );
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

  const handleTabChange = (value: SearchTabEnums) => {
    setSearch({ page: "1", query: search.get("query") || "" });
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
            {SearchTabs.map((tab) => (
              <SearchTab
                title={tab.title}
                loading={tab.loading}
                onClick={tab.onClick}
                count={tab.count}
                isActive={tab.isActive}
                key={tab.title}
              />
            ))}
          </div>
          {currentSearchTab === SearchTabEnums.MOVIES && (
            <SearchMovieResult
              loading={moviePending}
              data={movieData}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
          {currentSearchTab === SearchTabEnums.TV_SHOWS && (
            <SearchMovieResult
              loading={tvShowPending}
              data={tvShowData}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
          {currentSearchTab === SearchTabEnums.PEOPLE && (
            <SearchPeopleResult
              loading={peoplePending}
              handlePageChange={handlePageChange}
              data={peopleData}
              currentPage={currentPage}
            />
          )}
          {currentSearchTab === SearchTabEnums.COLLECTIONS && (
            <SearchMovieResult
              loading={collectionPending}
              data={collectionData}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
          {currentSearchTab === SearchTabEnums.KEYWORDS && (
            <SearchKeywordResult
              loading={keywordPending}
              data={keywordData}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          )}
          {currentSearchTab === SearchTabEnums.COMPANIES && (
            <SearchCompanyResult
              loading={companyPending}
              data={companyData}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;
