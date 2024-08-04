import {
  searchCollections,
  searchCompanies,
  searchKeywords,
  searchMovieKeywords,
  searchPeopleKeywords,
  searchTvShowKeywords,
} from "../service/search.service.ts";
import { useQuery } from "@tanstack/react-query";
import searchKeys from "./query-search-key-factory.ts";
import { SearchMovieKeywordQuery } from "../../../types";

export const useSearchMovieKeywordQuery = (params: SearchMovieKeywordQuery) => {
  return useQuery({
    queryKey: searchKeys.movieCollection(params),
    queryFn: () => searchMovieKeywords(params),
  });
};

export const useSearchTvShowKeywordQuery = (
  params: SearchMovieKeywordQuery,
) => {
  return useQuery({
    queryKey: searchKeys.tvShowCollection(params),
    queryFn: () => searchTvShowKeywords(params),
  });
};

export const useSearchPeopleKeywordQuery = (
  params: SearchMovieKeywordQuery,
) => {
  return useQuery({
    queryKey: searchKeys.peopleCollection(params),
    queryFn: () => searchPeopleKeywords(params),
  });
};

export const useSearchKeywordsQuery = (params: SearchMovieKeywordQuery) => {
  return useQuery({
    queryKey: searchKeys.keywordCollection(params),
    queryFn: () => searchKeywords(params),
  });
};

export const useSearchCollectionsQuery = (params: SearchMovieKeywordQuery) => {
  return useQuery({
    queryKey: searchKeys.collectionCollection(params),
    queryFn: () => searchCollections(params),
  });
};

export const useSearchCompaniesQuery = (params: SearchMovieKeywordQuery) => {
  return useQuery({
    queryKey: searchKeys.companyCollection(params),
    queryFn: () => searchCompanies(params),
  });
};
