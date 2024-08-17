import { useQuery } from "@tanstack/react-query";
import peopleKeys from "./query-people-key-factory.ts";

import {getPersonCredits, getPersonDetails, getPersonExternalIds, getPopularPeople} from "../service/people.service.ts";

export const usePeopleQuery = (page: number) => {
  return useQuery({
    queryKey: peopleKeys.peopleCollection(page),
    queryFn: () => getPopularPeople(page),
  });
};

export const usePersonDetailsQuery = (id: string) => {
    return useQuery({
        queryKey: peopleKeys.peopleDetails(id),
        queryFn: () => getPersonDetails(id),
    });
}

export const usePersonCreditsQuery = (id: string) => {
    return useQuery({
        queryKey: peopleKeys.peopleCredits(id),
        queryFn: () => getPersonCredits(id),
    });
}

export const usePersonExternalIdsQuery = (id: string) => {
    return useQuery({
        queryKey: peopleKeys.peopleExternalIds(id),
        queryFn: () => getPersonExternalIds(id),
    });
}