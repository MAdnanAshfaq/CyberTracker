import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });

export const clickEvents = sqliteTable("click_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  shortlinkId: integer("shortlink_id").notNull().references(() => shortlinks.id),
  timestamp: text("timestamp").notNull(),
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
  isp: text("isp"),
  deviceModel: text("device_model"),
  deviceType: text("device_type"),
  androidVersion: text("android_version"),
  timezone: text("timezone"),
});