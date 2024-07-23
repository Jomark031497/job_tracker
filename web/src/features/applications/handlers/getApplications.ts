import { __API_URL__ } from "../../../constants";
import { Application } from "../applications.types";

type QueryParams = {
  isPublic?: boolean;
};

export const getApplications = async (query: QueryParams) => {
  const url = new URL("/api/applications", __API_URL__);

  query.isPublic && url.searchParams.set("isPublic", query.isPublic ? "true" : "false");

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data as { data: Application[]; count: number };
};
