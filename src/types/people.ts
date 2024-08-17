import { KnownFor } from "./search.ts";

export type PopularPeopleResponse = {
  page: number;
  results: PopularPerson[];
  total_results: number;
  total_pages: number;
};
export type PopularPerson = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  known_for: KnownFor[];
};

export interface PersonDetailsResponse {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string
  deathday: string
  gender: number
  homepage: string
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
}

export interface PersonCreditsResponse {
  cast: Cast[]
  crew: Crew[]
  id: number
}

export interface Cast {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title?: string
  overview: string
  popularity: number
  poster_path?: string
  release_date?: string
  title?: string
  video?: boolean
  vote_average: number
  vote_count: number
  character: string
  credit_id: string
  order?: number
  media_type: string
  origin_country?: string[]
  original_name?: string
  first_air_date?: string
  name?: string
  episode_count?: number
}

export interface Crew {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title?: string
  overview: string
  popularity: number
  poster_path?: string
  release_date?: string
  title?: string
  video?: boolean
  vote_average: number
  vote_count: number
  credit_id: string
  department: string
  job: string
  media_type: string
  origin_country?: string[]
  original_name?: string
  first_air_date?: string
  name?: string
  episode_count?: number
}

export interface PersonExternalIds {
  id: number
  freebase_mid: string
  freebase_id: string
  imdb_id: string
  tvrage_id: number
  wikidata_id: string
  facebook_id: string
  instagram_id: string
  tiktok_id: string
  twitter_id: string
  youtube_id: string
}

