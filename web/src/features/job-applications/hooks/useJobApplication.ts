import { useSuspenseQuery } from "@tanstack/react-query";
import { getJobApplicationById } from "../handlers/getJobApplicationById";

export const useJobApplication = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["jobApplication", id],
    queryFn: async () => await getJobApplicationById(id),
  });
};
