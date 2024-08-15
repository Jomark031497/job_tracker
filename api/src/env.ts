import { z } from "zod";
import { logger } from "./lib/logger";

const envSchema = z.object({
  PORT: z.string().transform(Number),
  CLIENT_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  logger.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit(1); // Exit if validation fails
}

export const env = parsedEnv.data;
