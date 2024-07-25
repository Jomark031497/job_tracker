import { __API_URL__ } from "../../../constants";

export const getUserJobApplicationsOverview = async (userId: string) => {
  const url = new URL(`/api/job-applications/user/${userId}/overview`, __API_URL__);

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data as {
    count: number;
    inProgress: number;
    submitted: number;
    rejected: number;
  };
};
