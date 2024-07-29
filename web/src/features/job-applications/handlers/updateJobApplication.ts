import { __API_URL__ } from "../../../constants";
import { JobApplicationInputs } from "../job-applications.schema";

export const updateJobApplication = async (jobApplicationId: string, payload: JobApplicationInputs) => {
  const url = new URL(`/api/job-applications/${jobApplicationId}`, __API_URL__);

  const res = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(payload),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
