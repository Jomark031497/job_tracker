import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "**/*.schema.{js,ts}",
  out: "./drizzle",
  verbose: true,
  strict: true,
  dialect: "postgresql",
  dbCredentials: {
    url: <string>process.env.DATABASE_URL,
  },
});
