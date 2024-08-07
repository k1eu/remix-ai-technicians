import { db } from "~/modules/database/db.ts";

export async function loader() {
  const technicians = await db.query.techniciansTable.findMany();

  return {
    technicians,
  };
}
