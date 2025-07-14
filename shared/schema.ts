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

export const insertClickEventSchema = z.object({
  shortlinkId: z.number(),
  timestamp: z.string().datetime().optional(),
  ipAddress: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  userAgent: z.string().optional(),
  browser: z.string().optional(),
  os: z.string().optional(),
  screenResolution: z.string().optional(),
  language: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  isp: z.string().optional(),
  deviceModel: z.string().optional(),
  deviceType: z.string().optional(),
  androidVersion: z.string().optional(),
  timezone: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertShortlink = z.infer<typeof insertShortlinkSchema>;
export type Shortlink = typeof shortlinks.$inferSelect;
export type InsertClickEvent = z.infer<typeof insertClickEventSchema>;
export type ClickEvent = z.infer<typeof clickEventSchema>;

export const clickEventSchema = z.object({
  id: z.number(),
  shortlinkId: z.number(),
  timestamp: z.string(),
  ipAddress: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  userAgent: z.string().nullable(),
  browser: z.string().nullable(),
  os: z.string().nullable(),
  screenResolution: z.string().nullable(),
  language: z.string().nullable(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  isp: z.string().nullable(),
  deviceModel: z.string().nullable(),
  deviceType: z.string().nullable(),
  androidVersion: z.string().nullable(),
  timezone: z.string().nullable(),
});