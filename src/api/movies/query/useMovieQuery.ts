import {getPopularMovies, getTrendingMovies} from "../service/movies.service.ts";
import movieKeys from "./query-key-factory.ts";
import {useQuery} from "@tanstack/react-query";
import {TrendingParamsEnum} from "../../../enums";

export const useTrendingMoviesQuery = ({params}: { params: TrendingParamsEnum }) => {
    return useQuery({
        queryKey: movieKeys.trendingCollection(params),
        queryFn: () => getTrendingMovies(params)
    })
}

export const usePopularMoviesQuery = () => {
    return useQuery({
        queryKey: movieKeys.popular,
        queryFn: getPopularMovies
    })
}