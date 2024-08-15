import {TvShowParams} from "../../../types/tvShow.ts";

const tvShowKeys = {
    tvShows: ["tvShows"],
    tvShowList: () => [...tvShowKeys.tvShows, "list"],
    tvShowCollection: (params: TvShowParams) => [
        ...tvShowKeys.tvShowList(),
        params,
    ],
    tvShowDetail: (id: string) => ['tv-show-details', id],
    tvShowCredits: (id: string) => ['tv-show-credits', id],
};

export default tvShowKeys;
