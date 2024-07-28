import {getTrendingMovies} from "../service/movies.service.ts";
import movieKeys from "./query-key-factory.ts";
import {useQuery} from "@tanstack/react-query";

export const useTrendingMoviesQuery = () => {
   return useQuery({
         queryKey: movieKeys.trending,
         queryFn: getTrendingMovies
   })
}