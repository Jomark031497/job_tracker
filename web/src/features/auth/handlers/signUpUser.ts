import { __API_URL__ } from "../../../constants";
import { User } from "../../users/users.types";
import { SignUpInputs } from "../auth.schemas";

export const signUpUser = async (values: SignUpInputs) => {
  const url = new URL("/api/auth/sign-up", __API_URL__);

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
