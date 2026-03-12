import AppLayout from "../../layout/AppLayout.tsx";
import { MovieParamsEnum, MovieTabEnum } from "../../enums";
import { MovieTabInterface } from "../../types";
import { useState, useMemo } from "react";
import ScrollableTabs from "../../components/ScrollableTabs";
import SearchBar from "../../components/SearchBar.tsx";
import {
  useMovieGenresQuery,
  useMoviesQuery,
} from "../../api/movies/query/useMovieQuery.ts";
import MovieCard from "../../components/MovieCard.tsx";
import SearchPagination from "../search/SearchPagination.tsx";
import { useSearchParams } from "react-router-dom";
import { MediaTypeEnum } from "../../enums/MovieTabEnum.ts";
import { SkeletonGrid } from "../../components/SkeletonCard.tsx";

const Movies = () => {
  const [search, setSearch] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const movieTabs: MovieTabInterface[] = [
    { label: MovieTabEnum.POPULAR, value: MovieParamsEnum.POPULAR },
    { label: MovieTabEnum.NOW_PLAYING, value: MovieParamsEnum.NOW_PLAYING },
    { label: MovieTabEnum.TOP_RATED, value: MovieParamsEnum.TOP_RATED },
    { label: MovieTabEnum.UPCOMING, value: MovieParamsEnum.UPCOMING },
  ];

  const [currentTab, setCurrentTab] = useState<MovieParamsEnum>(
    MovieParamsEnum.POPULAR,
  );

  const { data, isPending } = useMoviesQuery({
    params: currentTab,
    page: search.get("page") || "1",
  });

  const { data: movieGenresData } = useMovieGenresQuery();
  const movieGenres = Object.fromEntries(
    (movieGenresData?.genres ?? []).map((genre) => [genre.id, genre.name]),
  );

  const filteredMovies = useMemo(() => {
    if (!data?.results) return [];
    if (selectedGenre === null) return data.results;
    return data.results.filter((m) => m.genre_ids?.includes(selectedGenre));
  }, [data, selectedGenre]);

  const handlePageChange = (page: number) => {
    setSearch({ page: page.toString() });
    window.scrollTo(0, 0);
  };
  const currentPage = Number.parseInt(search.get("page") || "1", 10) - 1;

  const handleTabChange = (value: MovieParamsEnum) => {
    setSearch({ page: "1" });
    setCurrentTab(value);
    setSelectedGenre(null);
  };

  return (
    <AppLayout>
      <div
        data-testid="movies-element"
        className="container mx-auto px-4 md:px-8 py-6"
      >
        <SearchBar />

        <div className="flex flex-wrap items-center justify-between gap-4 my-6">
          <ScrollableTabs
            items={movieTabs}
            activeValue={currentTab}
            onChange={handleTabChange}
          />

          {/* Genre filter */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-outline btn-sm gap-1"
            >
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
              {selectedGenre ? movieGenres[selectedGenre] : "Genre"}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 rounded-box z-50 w-48 p-2 shadow-xl max-h-64 overflow-y-auto"
            >
              <li>
                <button
                  className={selectedGenre === null ? "active" : ""}
                  onClick={() => setSelectedGenre(null)}
                >
                  All Genres
                </button>
              </li>
              {(movieGenresData?.genres ?? []).map((g) => (
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

        {isPending ? (
          <SkeletonGrid count={10} />
        ) : filteredMovies.length === 0 ? (
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
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125h-.625a1.125 1.125 0 0 1-1.125-1.125V4.875A1.125 1.125 0 0 1 3 3.75h17.25A1.125 1.125 0 0 1 21.375 4.875v13.5A1.125 1.125 0 0 1 20.25 19.5h-.625"
              />
            </svg>
            <p className="text-lg font-medium">No movies found</p>
            <p className="text-sm">Try a different genre or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            <MovieCard
              mediaType={MediaTypeEnum.MOVIE}
              movies={filteredMovies}
              genreMapByType={{ movie: movieGenres }}
            />
          </div>
        )}

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

export default Movies;
