import { SearchResult } from "../../../types";
import { axios } from "../../../config/axios.ts";

export const searchMovieKeywords = (query: string): Promise<SearchResult> => {
  return axios
    .get(`/search/movie?query=${query}`)
    .then((response) => response.data as SearchResult);
};
