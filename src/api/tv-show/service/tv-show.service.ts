import {TvShowCreditsResponse, TvShowDetailResponse, TvShowParams, TvShowResponse} from "../../../types/tvShow.ts";
import { axios } from "../../../config/axios.ts";

export const getTvShows = (params: TvShowParams): Promise<TvShowResponse> => {
  const { params: tvShowParams, page } = params;
  return axios
    .get(`/tv/${tvShowParams}?language=en-US&page=${page}`)
    .then((response) => response.data as TvShowResponse);
};

export const getTvShowDetail = (id: string): Promise<TvShowDetailResponse> => {
  return axios.get(`/tv/${id}?language=en-US`).then((response) => response.data);
};

export const getTvShowCredits = (id: string): Promise<TvShowCreditsResponse> => {
    return axios.get(`/tv/${id}/aggregate_credits`).then((response) => response.data);
}