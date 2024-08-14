import { TrendingParamsEnum } from "../../../enums";
import { MovieParams } from "../../../types";

const movieKeys = {
  trending: ["trending"],
  trendingList: () => [...movieKeys.trending, "list"],
  trendingCollection: (params: TrendingParamsEnum) => [
    ...movieKeys.trendingList(),
    params,
  ],
  popular: ["popular"],
  movies: ["movies"],
  movieList: () => [...movieKeys.movies, "list"],
  movieCollection: (params: MovieParams) => [...movieKeys.movieList(), params],
  movieDetails: (id: string) => ["movieDetails", id],
  movieCredits: (id: string) => ["movieCredits", id]
};

export default movieKeys;
