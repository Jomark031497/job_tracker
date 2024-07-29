import { useSuspenseQuery } from "@tanstack/react-query";
import { getSingleUserJobApplication } from "../handlers/getSingleUserJobApplication";

export const useJobApplication = (id: string) => {
  return useSuspenseQuery({
    queryKey: ["jobApplication", id],
    queryFn: async () => await getSingleUserJobApplication(id),
  });
};
