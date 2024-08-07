import { TvShowParamsEnum, TvShowTabEnum } from "../enums";
import { Movie } from "./movies.ts";

export type TvShowTabInterface = {
  label: TvShowTabEnum;
  value: TvShowParamsEnum;
};

export type TvShowParams = {
  page: string;
  params: TvShowParamsEnum;
};

export interface TvShowResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
