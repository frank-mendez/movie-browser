import { axios } from "../../../config/axios.ts";
import {PersonDetailsResponse, PersonExternalIds, PopularPeopleResponse} from "../../../types";
import {PersonCreditsResponse} from "../../../types/people.ts";

export const getPopularPeople = (
  page: number,
): Promise<PopularPeopleResponse> => {
  return axios
    .get(`/person/popular?page=${page}`)
    .then((response) => response.data as PopularPeopleResponse);
};

export const getPersonDetails = (id: string): Promise<PersonDetailsResponse> => {
    return axios.get(`/person/${id}`).then((response) => response.data as PersonDetailsResponse);
}

export const getPersonCredits = (id: string): Promise<PersonCreditsResponse> => {
    return axios.get(`/person/${id}/combined_credits`).then((response) => response.data as PersonCreditsResponse);
}

export const getPersonExternalIds = (id: string): Promise<PersonExternalIds> => {
    return axios.get(`/person/${id}/external_ids`).then((response) => response.data as PersonExternalIds);
}