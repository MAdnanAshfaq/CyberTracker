import { users, shortlinks, clickEvents, type User, type InsertUser, type Shortlink, type InsertShortlink, type ClickEvent, type InsertClickEvent } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createShortlink(shortlink: InsertShortlink): Promise<Shortlink>;
  getShortlinkBySlug(slug: string): Promise<Shortlink | undefined>;
  getShortlinksByUser(userId: number): Promise<Shortlink[]>;
  updateShortlink(id: number, updates: Partial<Shortlink>): Promise<Shortlink | undefined>;
  deleteShortlink(id: number): Promise<boolean>;
  
  createClickEvent(clickEvent: InsertClickEvent): Promise<ClickEvent>;
  getClickEventsByShortlink(shortlinkId: number): Promise<ClickEvent[]>;
  getClickEventsByUser(userId: number): Promise<ClickEvent[]>;
  
  sessionStore: any;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createShortlink(insertShortlink: InsertShortlink): Promise<Shortlink> {
    const [shortlink] = await db
      .insert(shortlinks)
      .values(insertShortlink)
      .returning();
    return shortlink;
  }

  async getShortlinkBySlug(slug: string): Promise<Shortlink | undefined> {
    const [shortlink] = await db
      .select()
      .from(shortlinks)
      .where(eq(shortlinks.slug, slug));
    return shortlink || undefined;
  }

  async getShortlinksByUser(userId: number): Promise<Shortlink[]> {
    return await db
      .select()
      .from(shortlinks)
      .where(eq(shortlinks.userId, userId))
      .orderBy(desc(shortlinks.createdAt));
  }

  async updateShortlink(id: number, updates: Partial<Shortlink>): Promise<Shortlink | undefined> {
    const [shortlink] = await db
      .update(shortlinks)
      .set(updates)
      .where(eq(shortlinks.id, id))
      .returning();
    return shortlink || undefined;
  }

  async deleteShortlink(id: number): Promise<boolean> {
    const result = await db
      .delete(shortlinks)
      .where(eq(shortlinks.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async createClickEvent(insertClickEvent: InsertClickEvent): Promise<ClickEvent> {
    const [clickEvent] = await db
      .insert(clickEvents)
      .values(insertClickEvent)
      .returning();
    return clickEvent;
  }

  async getClickEventsByShortlink(shortlinkId: number): Promise<ClickEvent[]> {
    return await db
      .select()
      .from(clickEvents)
      .where(eq(clickEvents.shortlinkId, shortlinkId))
      .orderBy(desc(clickEvents.timestamp));
  }

  async getClickEventsByUser(userId: number): Promise<ClickEvent[]> {
    return await db
      .select({
        id: clickEvents.id,
        shortlinkId: clickEvents.shortlinkId,
        timestamp: clickEvents.timestamp,
        ipAddress: clickEvents.ipAddress,
        latitude: clickEvents.latitude,
        longitude: clickEvents.longitude,
        userAgent: clickEvents.userAgent,
        browser: clickEvents.browser,
        os: clickEvents.os,
        screenResolution: clickEvents.screenResolution,
        language: clickEvents.language,
        country: clickEvents.country,
        city: clickEvents.city,
      })
      .from(clickEvents)
      .innerJoin(shortlinks, eq(clickEvents.shortlinkId, shortlinks.id))
      .where(eq(shortlinks.userId, userId))
      .orderBy(desc(clickEvents.timestamp));
  }
}

export const storage = new DatabaseStorage();
