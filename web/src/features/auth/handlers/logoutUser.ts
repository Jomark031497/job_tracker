import { __API_URL__ } from "../../../constants";

export const logoutUser = async () => {
  const url = new URL("/api/auth/logout", __API_URL__);

  const res = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
