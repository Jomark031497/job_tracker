import { __API_URL__ } from "../../../constants";
import { JobApplicationInputs } from "../job-applications.schema";
import { JobApplication } from "../job-applications.types";

export const createJobApplication = async (payload: JobApplicationInputs & { userId: string }) => {
  const url = new URL("/api/job-applications", __API_URL__);

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data as JobApplication;
};
