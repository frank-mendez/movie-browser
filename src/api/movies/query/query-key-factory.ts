import {TrendingParamsEnum} from "../../../enums";

const movieKeys = {
    trending: ['trending'],
    trendingList: () => [...movieKeys.trending, 'list'],
    trendingCollection: (params: TrendingParamsEnum) => [...movieKeys.trendingList(), params],
    popular: ['popular'],
}

export default movieKeys;