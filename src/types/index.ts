import {
  MovieResponse,
  Movie,
  MovieTabInterface,
  MovieParams,
  MoviesDetails,
} from "./movies.ts";
import {
  SearchResult,
  SearchMovieKeywordQuery,
  SearchTabTypes,
  SearchPaginationProps,
  SearchMovieResultProps,
} from "./search.ts";
import { TvShowTabInterface, TvShowDetailResponse, TvShowCreditsResponse } from "./tvShow.ts";
import { PopularPeopleResponse, PopularPerson } from "./people.ts";

export type {
  MovieResponse,
  Movie,
  SearchResult,
  SearchMovieKeywordQuery,
  SearchTabTypes,
  SearchPaginationProps,
  SearchMovieResultProps,
  MovieTabInterface,
  MovieParams,
  TvShowTabInterface,
  PopularPeopleResponse,
  PopularPerson,
  MoviesDetails,
  TvShowDetailResponse,
  TvShowCreditsResponse
};
