import { TvShowParams } from "../../../types/tvShow.ts";
import { useQuery } from "@tanstack/react-query";
import tvShowKeys from "./query-tv-show-key-factory.ts";
import { getTvShows } from "../service/tv-show.service.ts";

export const useTvShowQuery = (params: TvShowParams) => {
  return useQuery({
    queryKey: tvShowKeys.tvShowCollection(params),
    queryFn: () => getTvShows(params),
  });
};
