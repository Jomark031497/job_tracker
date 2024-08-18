import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { db } from "../db/dbInstance.js";
import { sessionTable } from "../domains/auth/auth.schema.js";
import { users } from "../domains/users/users.schema.js";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, "id">;
  }
}

export interface DatabaseUser {
  id: string;
  username: string;
}
