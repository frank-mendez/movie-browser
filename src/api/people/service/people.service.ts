import { axios } from "../../../config/axios.ts";
import { PopularPeopleResponse } from "../../../types";

export const getPopularPeople = (
  page: number,
): Promise<PopularPeopleResponse> => {
  return axios
    .get(`/person/popular?page=${page}`)
    .then((response) => response.data as PopularPeopleResponse);
};
