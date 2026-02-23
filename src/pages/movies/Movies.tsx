import AppLayout from "../../layout/AppLayout.tsx";
import { MovieParamsEnum, MovieTabEnum } from "../../enums";
import { MovieTabInterface } from "../../types";
import { useState } from "react";
import Loading from "../../components/Loading.tsx";
import SearchBar from "../../components/SearchBar.tsx";
import { useMoviesQuery } from "../../api/movies/query/useMovieQuery.ts";
import MovieCard from "../../components/MovieCard.tsx";
import SearchPagination from "../search/SearchPagination.tsx";
import { useSearchParams } from "react-router-dom";
import { MediaTypeEnum } from "../../enums/MovieTabEnum.ts";

const Movies = () => {
  const [search, setSearch] = useSearchParams();

  const movieTabs: MovieTabInterface[] = [
    {
      label: MovieTabEnum.POPULAR,
      value: MovieParamsEnum.POPULAR,
    },
    {
      label: MovieTabEnum.NOW_PLAYING,
      value: MovieParamsEnum.NOW_PLAYING,
    },
    {
      label: MovieTabEnum.TOP_RATED,
      value: MovieParamsEnum.TOP_RATED,
    },
    {
      label: MovieTabEnum.UPCOMING,
      value: MovieParamsEnum.UPCOMING,
    },
  ];

  const [curentTab, setCurrentTab] = useState<MovieParamsEnum>(
    MovieParamsEnum.POPULAR,
  );

  const { data, isPending } = useMoviesQuery({
    params: curentTab,
    page: search.get("page") || "1",
  });
  const handlePageChange = (page: number) => {
    setSearch({ page: page.toString() });
    window.scrollTo(0, 0);
  };
  const currentPage = parseInt(search.get("page") || "1") - 1;

  const handleTabChange = (value: MovieParamsEnum) => {
    setSearch({ page: "1" });
    setCurrentTab(value);
  };

  return (
    <AppLayout>
      <div data-testid="movies-element" className="container m-auto p-5">
        <SearchBar />
        <div role="tablist" className="tabs tabs-boxed my-10">
          {movieTabs.map((tab) => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 items-center ">
          {data && data?.results.length > 0 && (
            <MovieCard mediaType={MediaTypeEnum.MOVIE} movies={data.results} />
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

export default Movies;
