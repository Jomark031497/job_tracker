import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserApplicationsOverview } from "../handlers/getUserApplicationsOverview";

export const useUserApplicationsOverview = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["userApplicationsOverview", id],
    queryFn: async () => await getUserApplicationsOverview(id),
  });
};
