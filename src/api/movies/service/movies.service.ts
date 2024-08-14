import { axios } from "../../../config/axios.ts";
import { MovieResponse, MoviesDetails } from "../../../types";
import { TrendingParamsEnum } from "../../../enums";
import {MovieCreditsResponse, MovieParams} from "../../../types/movies.ts";

export const getTrendingMovies = (
  params: TrendingParamsEnum,
): Promise<MovieResponse> => {
  return axios
    .get(`/trending/all/${params}?language=en-US?`)
    .then((response) => response.data as MovieResponse);
};

export const getMovies = (data: MovieParams): Promise<MovieResponse> => {
  const { params, page } = data;
  return axios
    .get(`/movie/${params}?language=en-US&page=${page}`)
    .then((response) => response.data as MovieResponse);
};

export const getMovieDetails = (id: string): Promise<MoviesDetails> => {
  return axios
    .get(`/movie/${id}?language=en-US`)
    .then((response) => response.data as MoviesDetails);
};

export const getMovieCredits = (id: string): Promise<MovieCreditsResponse> => {
    return axios
        .get(`/movie/${id}/credits?language=en-US`)
        .then((response) => response.data as MovieCreditsResponse);
}