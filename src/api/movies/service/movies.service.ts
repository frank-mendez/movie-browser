import { axios } from "../../../config/axios.ts";
import { MovieResponse } from "../../../types";
import { TrendingParamsEnum } from "../../../enums";

export const getTrendingMovies = (
  params: TrendingParamsEnum,
): Promise<MovieResponse> => {
  return axios
    .get(`/trending/all/${params}?language=en-US?`)
    .then((response) => response.data as MovieResponse);
};
