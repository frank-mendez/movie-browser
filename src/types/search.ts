import { SearchTabEnums } from "../enums";

export type SearchResult = {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
};

export type Result = {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
  profile_path: string;
  original_name: string;
  known_for: KnownFor[];
  known_for_department: string;
  first_air_date: string;
  origin_country: string;
  logo_path: string;
};

export interface KnownFor {
  backdrop_path: string;
  id: number;
  name: string;
  title: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export type SearchMovieKeywordQuery = {
  query: string;
  page: string;
};

export type SearchTabTypes = {
  loading: boolean;
  count: number;
  isActive: boolean;
  title: SearchTabEnums;
  onClick: (value: SearchTabEnums) => void;
};

export type SearchPaginationProps = {
  currentPage: number;
  data?: SearchResult;
  handlePageChange: (page: number) => void;
};

export type SearchMovieResultProps = {
  loading: boolean;
  data?: SearchResult;
  currentPage: number;
  handlePageChange: (page: number) => void;
};
