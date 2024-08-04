import { SearchMovieKeywordQuery } from "../../../types";

const searchKeys = {
  movies: ["movies"],
  movieList: () => [...searchKeys.movies, "list"],
  movieCollection: (params: SearchMovieKeywordQuery) => [
    ...searchKeys.movieList(),
    params,
  ],
  tvShows: ["tvShows"],
  tvShowList: () => [...searchKeys.tvShows, "list"],
  tvShowCollection: (params: SearchMovieKeywordQuery) => [
    ...searchKeys.tvShowList(),
    params,
  ],
  people: ["people"],
  peopleList: () => [...searchKeys.people, "list"],
  peopleCollection: (params: SearchMovieKeywordQuery) => [
    ...searchKeys.peopleList(),
    params,
  ],
  keywords: ["keywords"],
  keywordList: () => [...searchKeys.keywords, "list"],
  keywordCollection: (params: SearchMovieKeywordQuery) => [
    ...searchKeys.keywordList(),
    params,
  ],
  collections: ["collections"],
  collectionList: () => [...searchKeys.collections, "list"],
  collectionCollection: (params: SearchMovieKeywordQuery) => [
    ...searchKeys.collectionList(),
    params,
  ],
  companies: ["companies"],
  companyList: () => [...searchKeys.companies, "list"],
  companyCollection: (params: SearchMovieKeywordQuery) => [
    ...searchKeys.companyList(),
    params,
  ],
};

export default searchKeys;
