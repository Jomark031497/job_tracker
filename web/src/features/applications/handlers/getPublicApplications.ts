import { __API_URL__ } from "../../../constants";
import { SearchParams } from "../../miscs/misc.types";
import { Application } from "../applications.types";

type QueryParams = {
  isPublic?: boolean;
} & SearchParams;

export const getPublicApplications = async (query: QueryParams) => {
  const url = new URL("/api/applications", __API_URL__);

  query.isPublic && url.searchParams.set("isPublic", query.isPublic ? "true" : "false");
  query?.page && url.searchParams.set("page", query.page.toString());
  query?.pageSize && url.searchParams.set("pageSize", query.pageSize.toString());

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data as { data: Application[]; count: number };
};
