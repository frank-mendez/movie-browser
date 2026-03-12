import AppLayout from "../../layout/AppLayout.tsx";
import { TvShowTabInterface } from "../../types";
import { TvShowParamsEnum, TvShowTabEnum } from "../../enums";
import SearchBar from "../../components/SearchBar.tsx";
import MovieCard from "../../components/MovieCard.tsx";
import ScrollableTabs from "../../components/ScrollableTabs";
import SearchPagination from "../search/SearchPagination.tsx";
import { SkeletonGrid } from "../../components/SkeletonCard.tsx";
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useTvShowGenresQuery,
  useTvShowQuery,
} from "../../api/tv-show/query/useTvShowQuery.ts";
import { MediaTypeEnum } from "../../enums/MovieTabEnum.ts";

const TvShow = () => {
  const [search, setSearch] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const tvShowTabs: TvShowTabInterface[] = [
    { label: TvShowTabEnum.AIRING_TODAY, value: TvShowParamsEnum.AIRING_TODAY },
    { label: TvShowTabEnum.ON_THE_AIR, value: TvShowParamsEnum.ON_THE_AIR },
    { label: TvShowTabEnum.POPULAR, value: TvShowParamsEnum.POPULAR },
    { label: TvShowTabEnum.TOP_RATED, value: TvShowParamsEnum.TOP_RATED },
  ];

  const [currentTab, setCurrentTab] = useState<TvShowParamsEnum>(
    TvShowParamsEnum.AIRING_TODAY,
  );

  const { data, isPending } = useTvShowQuery({
    params: currentTab,
    page: search.get("page") || "1",
  });

  const { data: tvGenresData } = useTvShowGenresQuery();
  const tvGenres = Object.fromEntries(
    (tvGenresData?.genres ?? []).map((genre) => [genre.id, genre.name]),
  );

  const filteredShows = useMemo(() => {
    if (!data?.results) return [];
    if (selectedGenre === null) return data.results;
    return data.results.filter((m) => m.genre_ids?.includes(selectedGenre));
  }, [data, selectedGenre]);

  const handlePageChange = (page: number) => {
    setSearch({ page: page.toString() });
    window.scrollTo(0, 0);
  };
  const currentPage = Number.parseInt(search.get("page") || "1", 10) - 1;

  const handleTabChange = (value: TvShowParamsEnum) => {
    setSearch({ page: "1" });
    setCurrentTab(value);
    setSelectedGenre(null);
  };

  return (
    <AppLayout>
      <div
        data-testid="tvshow-element"
        className="container mx-auto px-4 md:px-8 py-6"
      >
        <SearchBar />

        <div className="flex flex-wrap items-center justify-between gap-4 my-6">
          <ScrollableTabs
            items={tvShowTabs}
            activeValue={currentTab}
            onChange={handleTabChange}
          />

          {/* Genre filter */}
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-outline btn-sm gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
              {selectedGenre ? tvGenres[selectedGenre] : "Genre"}
            </button>
            <ul className="dropdown-content menu bg-base-200 rounded-box z-50 w-48 p-2 shadow-xl max-h-64 overflow-y-auto">
              <li>
                <button
                  className={selectedGenre === null ? "active" : ""}
                  onClick={() => setSelectedGenre(null)}
                >
                  All Genres
                </button>
              </li>
              {(tvGenresData?.genres ?? []).map((g) => (
                <li key={g.id}>
                  <button
                    className={selectedGenre === g.id ? "active" : ""}
                    onClick={() => setSelectedGenre(g.id)}
                  >
                    {g.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {(() => {
          if (isPending) return <SkeletonGrid count={10} />;
          if (filteredShows.length === 0)
            return (
              <div className="flex flex-col items-center justify-center py-20 text-base-content/50 gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="h-16 w-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
                <p className="text-lg font-medium">No TV shows found</p>
                <p className="text-sm">Try a different genre or category</p>
              </div>
            );
          return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              <MovieCard
                mediaType={MediaTypeEnum.TV}
                movies={filteredShows}
                genreMapByType={{ tv: tvGenres }}
              />
            </div>
          );
        })()}

        <div className="flex justify-center mt-10">
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
