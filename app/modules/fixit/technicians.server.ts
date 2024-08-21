import { and, cosineDistance, desc, eq, gt, inArray, sql } from "drizzle-orm";
import { db } from "../database/db.ts";
import {
  skillsTable,
  technicianAvailabilityTable,
  technicianSkillsTable,
  techniciansTable,
} from "../database/schema.ts";

export async function getTechniciansWithSkills(
  skillEmbeddings: number[][],
  startTime?: Date
) {
  console.log({ skillEmbeddings });

  const similarity = sql<number>`1 - (${cosineDistance(
    skillsTable.embedding,
    skillEmbeddings[0]
  )})`;

  const similarSkills = await db
    .select({
      id: skillsTable.id,
      name: skillsTable.name,
      similarity,
    })
    .from(skillsTable)
    .where(gt(similarity, 0.5))
    .orderBy((t) => desc(t.similarity))
    .limit(5);

  const bbb = db
    .select({
      id: skillsTable.id,
      name: skillsTable.name,
      similarity,
    })
    .from(skillsTable)
    .where(gt(similarity, 0.5))
    .orderBy((t) => desc(t.similarity))
    .limit(5)
    .toSQL().sql;

  console.log({ bbb });

  console.log({ similarSkills });

  const matchingTechnicicans = await db
    .selectDistinct({
      id: techniciansTable.id,
      firstName: techniciansTable.firstName,
      lastName: techniciansTable.lastName,
      email: techniciansTable.email,
    })
    .from(technicianSkillsTable)
    .where(
      and(
        inArray(
          technicianSkillsTable.skillId,
          similarSkills.map((s) => s.id)
        )
      )
    )
    .leftJoin(
      techniciansTable,
      eq(technicianSkillsTable.technicianId, techniciansTable.id)
    );

  console.log({ matchingTechnicicans });

  const techninciansIds = matchingTechnicicans
    .map((t) => t.id)
    .filter((id) => id !== null);

  const dateFormatted = `${startTime?.getFullYear()}-${
    Number(startTime?.getMonth()) + 1
  }-${startTime?.getDate()}`;

  console.log({ dateFormatted });

  const techniciansOnNeededDay =
    await db.query.technicianAvailabilityTable.findMany({
      where: and(
        inArray(technicianAvailabilityTable.technicianId, techninciansIds),
        sql`DATE(${technicianAvailabilityTable.startTime}) = DATE(${dateFormatted})`
      ),
    });

  console.log({ techniciansOnNeededDay });

  return matchingTechnicicans.filter((t) =>
    techniciansOnNeededDay.some((ta) => ta.technicianId === t.id)
  );
}
