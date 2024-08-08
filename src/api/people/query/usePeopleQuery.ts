import { useQuery } from "@tanstack/react-query";
import peopleKeys from "./query-people-key-factory.ts";

import { getPopularPeople } from "../service/people.service.ts";

export const usePeopleQuery = (page: number) => {
  return useQuery({
    queryKey: peopleKeys.peopleCollection(page),
    queryFn: () => getPopularPeople(page),
  });
};
