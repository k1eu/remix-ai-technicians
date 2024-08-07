import { sql } from "drizzle-orm";
import { db } from "../database/db.ts";
import { techniciansTable } from "../database/schema.ts";

export async function getTechniciansWithSkills(skills: string[]) {
  const matchingTechnicicans = await db.query.techniciansTable.findMany({
    where: sql`${techniciansTable.skills} && ${sql`array[${skills.join(
      ","
    )}]`}`,
  });

  return matchingTechnicicans;
}
