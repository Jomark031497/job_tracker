import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as users from "../domains/users/users.schema";
import * as auth from "../domains/auth/auth.schema";
import * as applications from "../domains/job-applications/job-applications.schema";

const sql = postgres(<string>process.env.DATABASE_URL);

export const db = drizzle(sql, {
  schema: {
    ...users,
    ...applications,
    ...auth,
  },
});
