import {
  getMovieCredits,
  getMovieDetails,
  getMovieGenres,
  getMovieImages,
  getMovies,
  getMovieVideos,
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
};

export const useMovieGenresQuery = () => {
  return useQuery({
    queryKey: movieKeys.movieGenres(),
    queryFn: getMovieGenres,
  });
};

export const useMovieVideosQuery = (id: string) => {
  return useQuery({
    queryKey: movieKeys.movieVideos(id),
    queryFn: () => getMovieVideos(id),
    enabled: !!id,
  });
};

export const useMovieImagesQuery = (id: string) => {
  return useQuery({
    queryKey: movieKeys.movieImages(id),
    queryFn: () => getMovieImages(id),
    enabled: !!id,
  });
};
