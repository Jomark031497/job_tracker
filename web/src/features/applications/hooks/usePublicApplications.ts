import { useQuery } from "@tanstack/react-query";
import { getPublicApplications } from "../handlers/getPublicApplications";
import { SearchParams } from "../../miscs/misc.types";

type QueryParams = {
  isPublic?: boolean;
} & SearchParams;

export const usePublicApplications = (query: QueryParams) => {
  return useQuery({
    queryKey: ["publicApplications", query],
    queryFn: async () => await getPublicApplications(query),
  });
};
