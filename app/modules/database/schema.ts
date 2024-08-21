import {
  index,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
  vector,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
});

export const techniciansTable = pgTable("technicians", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
});

export const technicianAvailabilityTable = pgTable("technicians_availability", {
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
  currencyCode: text("currency_code").notNull(),
});

export const skillsTable = pgTable(
  "skills",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }),
  },
  (table) => ({
    embeddingIndex: index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  })
);

export const technicianSkillsTable = pgTable(
  "technicians_skills",
  {
    technicianId: serial("technician_id")
      .references(() => techniciansTable.id)
      .notNull(),
    skillId: serial("skill_id")
      .references(() => skillsTable.id)
      .notNull(),
  },
  (t) => ({
    unq: unique().on(t.technicianId, t.skillId),
  })
);
