import { sql } from "drizzle-orm";
import { numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
});

export const techniciansTable = pgTable("technicians", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  skills: text("skills")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
});

export const technicianAvailabilityTable = pgTable("technician_availability", {
  id: serial("id").primaryKey(),
  technicianId: serial("technician_id")
    .references(() => techniciansTable.id)
    .notNull(),
  startTime: timestamp("start_time", {
    mode: "string",
    precision: 3,
    withTimezone: true,
  }).notNull(),
  endTime: timestamp("end_time", {
    mode: "string",
    precision: 3,
    withTimezone: true,
  }).notNull(),
  pricePerHour: numeric("price_per_hour").notNull(),
  currenyCode: text("curreny_code").notNull(),
});

// export const skillsTable = pgTable("skills", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
// });

// export const technicianSkillsTable = pgTable(
//   "technician_skills",
//   {
//     technicianId: serial("technician_id")
//       .references(() => techniciansTable.id)
//       .notNull(),
//     skillId: serial("skill_id")
//       .references(() => skillsTable.id)
//       .notNull(),
//   },
//   (t) => ({
//     unq: unique().on(t.technicianId, t.skillId),
//   })
// );
