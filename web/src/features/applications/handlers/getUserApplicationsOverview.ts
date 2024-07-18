import { __API_URL__ } from "../../../constants";

export const getUserApplicationsOverview = async (id: string) => {
  const url = new URL(`/api/applications/user/overview/${id}`, __API_URL__);

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
