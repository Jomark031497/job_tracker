import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserApplications } from "../handlers/getUserApplications";

export const useUserApplications = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["userApplications", id],
    queryFn: async () => await getUserApplications(id),
  });
};
