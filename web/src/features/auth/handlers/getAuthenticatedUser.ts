import { __API_URL__ } from "../../../constants";
import { User } from "../../users/users.types";

export const getAuthenticatedUser = async () => {
  const url = new URL("/api/auth/user", __API_URL__);

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data as User;
};
