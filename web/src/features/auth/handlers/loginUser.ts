import { __API_URL__ } from "../../../constants";
import { User } from "../../users/users.types";
import { LoginInputs } from "../auth.schemas";

export const loginUser = async (values: LoginInputs) => {
  const url = new URL("/api/auth/login", __API_URL__);

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data as User;
};
