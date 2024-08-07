import { relations } from "drizzle-orm";
import { technicianAvailabilityTable, techniciansTable } from "./schema.ts";

export const techniciansRelations = relations(techniciansTable, ({ many }) => ({
  availability: many(technicianAvailabilityTable),
}));

export const availabilityRelations = relations(
  technicianAvailabilityTable,
  ({ one }) => ({
    technician: one(techniciansTable, {
      fields: [technicianAvailabilityTable.technicianId],
      references: [techniciansTable.id],
    }),
  })
);
