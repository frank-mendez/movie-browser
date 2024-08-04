import { SearchMovieKeywordQuery, SearchResult } from "../../../types";
import { axios } from "../../../config/axios.ts";

export const searchMovieKeywords = (
  params: SearchMovieKeywordQuery,
): Promise<SearchResult> => {
  const { query, page } = params;
  return axios
    .get(`/search/movie?query=${query}&page=${page}`)
    .then((response) => response.data as SearchResult);
};

export const searchTvShowKeywords = (
  params: SearchMovieKeywordQuery,
): Promise<SearchResult> => {
  const { query, page } = params;
  return axios
    .get(`/search/tv?query=${query}&page=${page}`)
    .then((response) => response.data as SearchResult);
};

export const searchPeopleKeywords = (params: SearchMovieKeywordQuery) => {
  const { query, page } = params;
  return axios
    .get(`/search/person?query=${query}&page=${page}`)
    .then((response) => response.data as SearchResult);
};

export const searchKeywords = (params: SearchMovieKeywordQuery) => {
  const { query, page } = params;
  return axios(`/search/keyword?query=${query}&page=${page}`).then(
    (response) => response.data as SearchResult,
  );
};

export const searchCollections = (params: SearchMovieKeywordQuery) => {
  const { query, page } = params;
  return axios(`/search/collection?query=${query}&page=${page}`).then(
    (response) => response.data as SearchResult,
  );
};

export const searchCompanies = (params: SearchMovieKeywordQuery) => {
  const { query, page } = params;
  return axios(`/search/company?query=${query}&page=${page}`).then(
    (response) => response.data as SearchResult,
  );
};
