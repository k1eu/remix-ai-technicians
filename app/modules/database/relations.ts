import { relations } from "drizzle-orm";
import {
  skillsTable,
  technicianAvailabilityTable,
  technicianSkillsTable,
  techniciansTable,
} from "./schema.ts";

export const techniciansRelations = relations(techniciansTable, ({ many }) => ({
  availability: many(technicianAvailabilityTable),
  skills: many(technicianSkillsTable),
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

export const technicianSkillsRelations = relations(
  technicianSkillsTable,
  ({ one }) => ({
    skill: one(skillsTable, {
      fields: [technicianSkillsTable.skillId],
      references: [skillsTable.id],
    }),
    technician: one(techniciansTable, {
      fields: [technicianSkillsTable.technicianId],
      references: [techniciansTable.id],
    }),
  })
);
