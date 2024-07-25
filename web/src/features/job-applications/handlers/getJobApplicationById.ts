import { __API_URL__ } from "../../../constants";
import { JobApplication } from "../job-applications.types";

export const getJobApplicationById = async (id: string) => {
  const url = new URL(`/api/job-applications/${id}`, __API_URL__);

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data as JobApplication;
};
