import { __API_URL__ } from "../../../constants";

export const deleteJobApplication = async (id: string) => {
  const url = new URL(`/api/job-applications/${id}`, __API_URL__);

  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
};
