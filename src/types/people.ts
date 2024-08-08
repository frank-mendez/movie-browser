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
