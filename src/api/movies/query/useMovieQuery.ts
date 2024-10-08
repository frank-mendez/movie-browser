import {
  getMovieCredits,
  getMovieDetails,
  getMovies,
  getTrendingMovies,
} from "../service/movies.service.ts";
import movieKeys from "./query-key-factory.ts";
import { useQuery } from "@tanstack/react-query";
import { TrendingParamsEnum } from "../../../enums";
import { MovieParams } from "../../../types/movies.ts";

export const useTrendingMoviesQuery = ({
  params,
}: {
  params: TrendingParamsEnum;
}) => {
  return useQuery({
    queryKey: movieKeys.trendingCollection(params),
    queryFn: () => getTrendingMovies(params),
  });
};

export const useMoviesQuery = (params: MovieParams) => {
  return useQuery({
    queryKey: movieKeys.movieCollection(params),
    queryFn: () => getMovies(params),
  });
};

export const useMovieDetailsQuery = (id: string) => {
  return useQuery({
    queryKey: movieKeys.movieDetails(id),
    queryFn: () => getMovieDetails(id),
  });
};

export const useMovieCreditsQuery = (id: string) => {
    return useQuery({
        queryKey: movieKeys.movieCredits(id),
        queryFn: () => getMovieCredits(id),
    });
}