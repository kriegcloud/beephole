import { config as dotenv } from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv({
  path: "../../.env",
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL ENV NOT FOUND");
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/DbSchema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
