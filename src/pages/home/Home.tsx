import AppLayout from "../../layout/AppLayout.tsx";
import {
  useMovieGenresQuery,
  useTrendingMoviesQuery,
} from "../../api/movies/query/useMovieQuery.ts";
import MovieCard from "../../components/MovieCard.tsx";
import ScrollableTabs from "../../components/ScrollableTabs";
import HeroSection from "../../components/HeroSection.tsx";
import { SkeletonGrid } from "../../components/SkeletonCard.tsx";
import { useState, useMemo } from "react";
import { TrendingParamsEnum, TrendingTabEnum } from "../../enums";
import { useTvShowGenresQuery } from "../../api/tv-show/query/useTvShowQuery.ts";

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

  const { data: movieGenresData } = useMovieGenresQuery();
  const { data: tvGenresData } = useTvShowGenresQuery();

  const movieGenres = Object.fromEntries(
    (movieGenresData?.genres ?? []).map((genre) => [genre.id, genre.name]),
  );

  const tvGenres = Object.fromEntries(
    (tvGenresData?.genres ?? []).map((genre) => [genre.id, genre.name]),
  );

  const filteredTrendingResults = useMemo(
    () =>
      (data?.results ?? []).filter(
        (item) => item.media_type === "movie" || item.media_type === "tv",
      ),
    [data],
  );

  const heroMovie =
    filteredTrendingResults.find((m) => m.backdrop_path) ??
    filteredTrendingResults[0];
  const gridMovies = filteredTrendingResults.slice(1);

  const trendingTabs = Object.values(TrendingTabEnum).map((tab) => ({
    label: tab,
    value: tab as TrendingTabEnum,
  }));

  return (
    <AppLayout>
      <div data-testid="home-element" className="flex flex-col gap-8">
        {/* Hero Section */}
        <section className="px-4 md:px-8 pt-4">
          {isPending ? (
            <div className="rounded-2xl animate-pulse bg-base-300 min-h-[70vh]" />
          ) : (
            heroMovie && <HeroSection movie={heroMovie} />
          )}
        </section>

        {/* Trending Section */}
        <section className="container mx-auto px-4 md:px-8 pb-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">Trending</h2>
            <ScrollableTabs
              items={trendingTabs}
              activeValue={trendingTab}
              onChange={setTrendingTab}
            />
          </div>
          {isPending ? (
            <SkeletonGrid count={10} />
          ) : (
            <>
              {filteredTrendingResults.length === 0 ? (
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
                  <p className="text-lg">No trending titles found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  <MovieCard
                    movies={gridMovies}
                    genreMapByType={{ movie: movieGenres, tv: tvGenres }}
                  />
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default Home;
