import { searchMovieKeywords } from "../service/search.service.ts";
import { useQuery } from "@tanstack/react-query";
import searchKeys from "./query-search-key-factory.ts";

export const useSearchMovieKeywordQuery = (query: string) => {
  console.log("query", query);
  return useQuery({
    queryKey: searchKeys.movieCollection(query),
    queryFn: () => searchMovieKeywords(query),
  });
};
