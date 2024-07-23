import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../handlers/getApplications";

type QueryParams = {
  isPublic?: boolean;
};

export const useApplications = (query: QueryParams) => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => await getApplications(query),
  });
};
