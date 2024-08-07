import { db } from "./db.ts";
import { techniciansTable } from "./schema.ts";
import { techniciansSeeds } from "./seeds/technicians.seeds.ts";

console.log("start seeding");

await db.transaction(async (tx) => {
  await tx
    .insert(techniciansTable)
    .values(techniciansSeeds)
    .onConflictDoNothing();
});

console.log("end seeding");
