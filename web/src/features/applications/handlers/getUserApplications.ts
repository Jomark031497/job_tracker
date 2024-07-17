import { __API_URL__ } from "../../../constants";
import { Application } from "../applications.types";

export const getUserApplications = async (id: string) => {
  const url = new URL(`/api/applications/user/${id}`, __API_URL__);

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);
  return data as Application[];
};
