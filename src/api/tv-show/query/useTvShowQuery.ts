import { TvShowParams } from "../../../types/tvShow.ts";
import { useQuery } from "@tanstack/react-query";
import tvShowKeys from "./query-tv-show-key-factory.ts";
import {
  getTvShowCredits,
  getTvShowDetail,
  getTvShowGenres,
  getTvShowImages,
  getTvShows,
  getTvShowVideos,
} from "../service/tv-show.service.ts";

export const useTvShowQuery = (params: TvShowParams) => {
  return useQuery({
    queryKey: tvShowKeys.tvShowCollection(params),
    queryFn: () => getTvShows(params),
  });
};

export const useTvShowDetailQuery = (id: string) => {
  return useQuery({
    queryKey: tvShowKeys.tvShowDetail(id),
    queryFn: () => getTvShowDetail(id),
  });
};

export const useTvShowCreditsQuery = (id: string) => {
  return useQuery({
    queryKey: tvShowKeys.tvShowCredits(id),
    queryFn: () => getTvShowCredits(id),
  });
};

export const useTvShowGenresQuery = () => {
  return useQuery({
    queryKey: tvShowKeys.tvShowGenres(),
    queryFn: getTvShowGenres,
  });
};

export const useTvShowVideosQuery = (id: string) => {
  return useQuery({
    queryKey: tvShowKeys.tvShowVideos(id),
    queryFn: () => getTvShowVideos(id),
    enabled: !!id,
  });
};

export const useTvShowImagesQuery = (id: string) => {
  return useQuery({
    queryKey: tvShowKeys.tvShowImages(id),
    queryFn: () => getTvShowImages(id),
    enabled: !!id,
  });
};
