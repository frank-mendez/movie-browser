import {axios} from "../../../config/axios.ts";
import {MovieResponse} from "../../../types/movies.ts";

export const getTrendingMovies = (): Promise<MovieResponse> => {
    return axios.get('/trending/all/day?language=en-US?').then((response) => response.data as MovieResponse);
}