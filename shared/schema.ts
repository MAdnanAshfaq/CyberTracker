import { pgTable, text, serial, integer, boolean, timestamp, real, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const shortlinks = pgTable("shortlinks", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  userId: integer("user_id").notNull(),
  targetUrl: text("target_url").notNull(),
  campaignName: text("campaign_name"),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const clickEvents = pgTable("click_events", {
  id: serial("id").primaryKey(),
  shortlinkId: integer("shortlink_id").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  ipAddress: text("ip_address"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  userAgent: text("user_agent"),
  browser: text("browser"),
  os: text("os"),
  screenResolution: text("screen_resolution"),
  language: text("language"),
  country: text("country"),
  city: text("city"),
});

export const usersRelations = relations(users, ({ many }) => ({
  shortlinks: many(shortlinks),
}));

export const shortlinksRelations = relations(shortlinks, ({ one, many }) => ({
  user: one(users, {
    fields: [shortlinks.userId],
    references: [users.id],
  }),
  clickEvents: many(clickEvents),
}));

export const clickEventsRelations = relations(clickEvents, ({ one }) => ({
  shortlink: one(shortlinks, {
    fields: [clickEvents.shortlinkId],
    references: [shortlinks.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertShortlinkSchema = createInsertSchema(shortlinks).omit({
  id: true,
  createdAt: true,
});

export const insertClickEventSchema = createInsertSchema(clickEvents).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertShortlink = z.infer<typeof insertShortlinkSchema>;
export type Shortlink = typeof shortlinks.$inferSelect;
export type InsertClickEvent = z.infer<typeof insertClickEventSchema>;
export type ClickEvent = typeof clickEvents.$inferSelect;
