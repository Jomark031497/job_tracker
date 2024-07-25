import { __API_URL__ } from "../../../constants";
import { SearchParams } from "../../miscs/misc.types";
import { Application } from "../job-applications.types";

export const getUserJobApplications = async (id: string, query?: SearchParams) => {
  const url = new URL(`/api/job-applications/user/${id}`, __API_URL__);

  query?.page && url.searchParams.set("page", query.page.toString());
  query?.pageSize && url.searchParams.set("pageSize", query.pageSize.toString());

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);
  return data as { data: Application[]; count: number };
};
