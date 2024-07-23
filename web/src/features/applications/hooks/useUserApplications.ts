import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUserApplications } from "../handlers/getUserApplications";
import { SearchParams } from "../../miscs/misc.types";

export const useUserApplications = (id: string, query?: SearchParams) => {
  return useQuery({
    queryKey: ["userApplications", id, query],
    queryFn: async () => await getUserApplications(id, query),
    placeholderData: keepPreviousData,
  });
};
