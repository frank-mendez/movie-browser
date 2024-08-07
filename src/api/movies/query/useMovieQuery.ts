import { getMovies, getTrendingMovies } from "../service/movies.service.ts";
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
