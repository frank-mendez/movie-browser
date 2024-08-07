import { TvShowParams, TvShowResponse } from "../../../types/tvShow.ts";
import { axios } from "../../../config/axios.ts";

export const getTvShows = (params: TvShowParams): Promise<TvShowResponse> => {
  const { params: tvShowParams, page } = params;
  return axios
    .get(`/tv/${tvShowParams}?language=en-US&page=${page}`)
    .then((response) => response.data as TvShowResponse);
};
