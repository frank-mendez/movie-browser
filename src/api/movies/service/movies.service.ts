import { axios } from "../../../config/axios.ts";
import { MovieResponse, MoviesDetails } from "../../../types";
import { TrendingParamsEnum } from "../../../enums";
import {
  MovieCreditsResponse,
  MovieGenreListResponse,
  MovieImagesResponse,
  MovieParams,
  MovieVideosResponse,
} from "../../../types/movies.ts";

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
};

export const getMovieGenres = (): Promise<MovieGenreListResponse> => {
  return axios
    .get(`/genre/movie/list?language=en-US`)
    .then((response) => response.data as MovieGenreListResponse);
};

export const getMovieVideos = (id: string): Promise<MovieVideosResponse> => {
  return axios
    .get(`/movie/${id}/videos?language=en-US`)
    .then((response) => response.data as MovieVideosResponse);
};

export const getMovieImages = (id: string): Promise<MovieImagesResponse> => {
  return axios
    .get(`/movie/${id}/images`)
    .then((response) => response.data as MovieImagesResponse);
};
