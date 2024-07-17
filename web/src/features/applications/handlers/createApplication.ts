import { __API_URL__ } from "../../../constants";
import { ApplicationInputs } from "../applications.schema";
import { Application } from "../applications.types";

export const createApplication = async (payload: ApplicationInputs & { userId: string }) => {
  const url = new URL("/api/applications", __API_URL__);

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

  return data as Application;
};
