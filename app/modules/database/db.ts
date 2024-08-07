import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.ts";
import * as relations from "./relations.ts";

const ultraschema = {
  ...schema,
  ...relations,
};

const queryClient = postgres(
  "postgres://postgres:aihjkl@localhost:5433/aihjkl"
);
const db = drizzle(queryClient, {
  schema: ultraschema,
});

export { db, ultraschema };
