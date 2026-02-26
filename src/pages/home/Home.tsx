import AppLayout from "../../layout/AppLayout.tsx";
import { useTrendingMoviesQuery } from "../../api/movies/query/useMovieQuery.ts";
import Loading from "../../components/Loading.tsx";
import MovieCard from "../../components/MovieCard.tsx";
import { useState } from "react";
import { TrendingParamsEnum, TrendingTabEnum } from "../../enums";
import SearchBar from "../../components/SearchBar.tsx";

const Home = () => {
  const [trendingTab, setTrendingTab] = useState<TrendingTabEnum>(
    TrendingTabEnum.TODAY,
  );

  const { data, isPending } = useTrendingMoviesQuery({
    params:
      trendingTab === TrendingTabEnum.TODAY
        ? TrendingParamsEnum.TODAY
        : TrendingParamsEnum.THIS_WEEK,
  });

  const onChangeTrending = (trending: TrendingTabEnum) => {
    setTrendingTab(trending);
  };

  return (
    <AppLayout>
      <div
        data-testid="home-element"
        className="container flex flex-col gap-4 m-auto p-4"
      >
        <SearchBar />
        <div className="flex flex-row gap-4 items-center">
          <h1 className="text-4xl my-6">Trending</h1>
          <div role="tablist" className="tabs tabs-boxed">
            {Object.values(TrendingTabEnum).map((tab) => (
              <button
                key={tab}
                role="tab"
                className={`tab ${trendingTab === tab ? "tab-active" : ""}`}
                onClick={() => onChangeTrending(tab as TrendingTabEnum)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {isPending && <Loading />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 items-center">
          {data && data?.results.length > 0 && (
            <MovieCard movies={data.results} />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
