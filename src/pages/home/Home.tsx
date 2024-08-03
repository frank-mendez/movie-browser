import AppLayout from "../../layout/AppLayout.tsx";
import { useTrendingMoviesQuery } from "../../api/movies/query/useMovieQuery.ts";
import Loading from "../../components/Loading.tsx";
import MovieCard from "../../components/MovieCard.tsx";
import { useState } from "react";
import { TrendingParamsEnum, TrendingTabEnum } from "../../enums";
import { Search } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
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

  const handleSearch = () => {
    navigate(`/search?${search.toString()}`);
  };

  const [search, setSearch] = useSearchParams();

  return (
    <AppLayout>
      <div
        data-testid="home-element"
        className="container flex flex-col gap-4 m-auto p-4"
      >
        <div className="flex flex-row gap-2">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Search for a movie, tv show, person"
            value={search.get("query") || ""}
            onChange={(e) => setSearch({ query: e.target.value })}
          />
          <button className="btn" onClick={handleSearch}>
            Search
            <Search />
          </button>
        </div>
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
        <div className="grid grid-cols-5 gap-6 items-center">
          {data && data?.results.length > 0 && (
            <MovieCard movies={data.results} />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
