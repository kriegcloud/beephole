import { defineConfig } from "drizzle-kit";
import { config as dotenv } from "dotenv";

dotenv({
  path: "../../.env",
});

export default defineConfig({
  out: "./drizzle",
  schema: "./src/DbSchema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    url: process.env.DATABASE_URL!,
  },
});
