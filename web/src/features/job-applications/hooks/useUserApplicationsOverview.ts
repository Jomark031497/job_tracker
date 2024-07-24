import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserJobApplicationsOverview } from "../handlers/getUserJobApplicationsOverview";

export const useUserApplicationsOverview = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["userApplicationsOverview", id],
    queryFn: async () => await getUserJobApplicationsOverview(id),
  });
};
