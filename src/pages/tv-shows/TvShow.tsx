import AppLayout from "../../layout/AppLayout.tsx";
import {TvShowTabInterface} from "../../types";
import {TvShowParamsEnum, TvShowTabEnum} from "../../enums";
import SearchBar from "../../components/SearchBar.tsx";
import Loading from "../../components/Loading.tsx";
import MovieCard from "../../components/MovieCard.tsx";
import SearchPagination from "../search/SearchPagination.tsx";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useTvShowQuery} from "../../api/tv-show/query/useTvShowQuery.ts";
import {MediaTypeEnum} from "../../enums/MovieTabEnum.ts";

const TvShow = () => {
  const [search, setSearch] = useSearchParams();
  const tvShowTabs: TvShowTabInterface[] = [
    {
      label: TvShowTabEnum.AIRING_TODAY,
      value: TvShowParamsEnum.AIRING_TODAY,
    },
    {
      label: TvShowTabEnum.ON_THE_AIR,
      value: TvShowParamsEnum.ON_THE_AIR,
    },
    {
      label: TvShowTabEnum.POPULAR,
      value: TvShowParamsEnum.POPULAR,
    },
    {
      label: TvShowTabEnum.TOP_RATED,
      value: TvShowParamsEnum.TOP_RATED,
    },
  ];

  const [curentTab, setCurrentTab] = useState<TvShowParamsEnum>(
    TvShowParamsEnum.AIRING_TODAY,
  );

  const { data, isPending } = useTvShowQuery({
    params: curentTab,
    page: search.get("page") || "1",
  });

  const handlePageChange = (page: number) => {
    setSearch({ page: page.toString() });
    window.scrollTo(0, 0);
  };
  const currentPage = parseInt(search.get("page") || "1") - 1;

  const handleTabChange = (value: TvShowParamsEnum) => {
    setSearch({ page: "1" });
    setCurrentTab(value);
  };

  return (
    <AppLayout>
      <div data-testid="tvshow-element" className="container m-auto py-6">
        <SearchBar />
        <div role="tablist" className="tabs tabs-boxed my-10">
          {tvShowTabs.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              className={`tab ${curentTab === tab.value ? "tab-active" : ""}`}
              onClick={() => handleTabChange(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {isPending && <Loading />}
        <div className="grid grid-cols-5 gap-6 items-center">
          {data && data?.results.length > 0 && (
            <MovieCard mediaType={MediaTypeEnum.TV} movies={data.results} />
          )}
        </div>
        <div className="flex flex-row m-auto items-center my-10">
          <SearchPagination
            currentPage={currentPage}
            data={data}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default TvShow;
