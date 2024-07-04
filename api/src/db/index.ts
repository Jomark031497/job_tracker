import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "../domains/users/users.schema";
import { sessionTable } from "../domains/auth/auth.schema";

const sql = postgres(<string>process.env.DATABASE_URL);

export const db = drizzle(sql, {
  schema: {
    users,
    auth: sessionTable,
  },
});
