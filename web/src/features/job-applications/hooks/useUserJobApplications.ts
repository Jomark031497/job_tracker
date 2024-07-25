import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUserJobApplications } from "../handlers/getUserJobApplications";
import { SearchParams } from "../../miscs/misc.types";

export const useUserJobApplications = (id: string, query?: SearchParams) => {
  return useQuery({
    queryKey: ["userJobApplications", id, query],
    queryFn: async () => await getUserJobApplications(id, query),
    placeholderData: keepPreviousData,
  });
};
