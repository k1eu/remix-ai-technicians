import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/modules/database/schema.ts",
  out: "./app/modules/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:aihjkl@localhost:5433/aihjkl",
  },
});
