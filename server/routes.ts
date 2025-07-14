import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertShortlinkSchema, insertClickEventSchema } from "@shared/schema";
import { nanoid } from "nanoid";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Create tracking shortlink
  app.post("/api/shortlinks", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const validatedData = insertShortlinkSchema.parse({
        ...req.body,
        userId: req.user!.id,
        slug: nanoid(8),
      });

      const shortlink = await storage.createShortlink(validatedData);
      res.status(201).json(shortlink);
    } catch (error) {
      next(error);
    }
  });

  // Get user's shortlinks
  app.get("/api/shortlinks", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const shortlinks = await storage.getShortlinksByUser(req.user!.id);
      res.json(shortlinks);
    } catch (error) {
      next(error);
    }
  });

  // Get shortlink click events
  app.get("/api/shortlinks/:id/clicks", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const shortlinkId = parseInt(req.params.id);
      const clicks = await storage.getClickEventsByShortlink(shortlinkId);
      res.json(clicks);
    } catch (error) {
      next(error);
    }
  });

  // Get user's all click events
  app.get("/api/clicks", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const clicks = await storage.getClickEventsByUser(req.user!.id);
      res.json(clicks);
    } catch (error) {
      next(error);
    }
  });

  // Tracking page route - captures metadata
  app.get("/s/:slug", async (req, res, next) => {
    try {
      const shortlink = await storage.getShortlinkBySlug(req.params.slug);
      
      if (!shortlink || !shortlink.isActive) {
        return res.status(404).send("Link not found");
      }

      // Serve tracking page that will capture metadata
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Redirecting...</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h2>Redirecting...</h2>
            <p>Please wait while we redirect you...</p>
          </div>
          <script>
            (async function() {
              const data = {
                shortlinkId: ${shortlink.id},
                userAgent: navigator.userAgent,
                language: navigator.language,
                screenResolution: screen.width + 'x' + screen.height
              };

              // Try to get IP and location info
              try {
                const ipResponse = await fetch('https://ipapi.co/json/');
                const ipData = await ipResponse.json();
                data.ipAddress = ipData.ip;
                data.country = ipData.country_name;
                data.city = ipData.city;
              } catch (e) {
                console.log('Could not get IP info');
              }

              // Try to get geolocation
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  async (position) => {
                    data.latitude = position.coords.latitude;
                    data.longitude = position.coords.longitude;
                    await sendData(data);
                  },
                  async (error) => {
                    console.log('Geolocation denied or failed');
                    await sendData(data);
                  }
                );
              } else {
                await sendData(data);
              }

              async function sendData(data) {
                try {
                  await fetch('/api/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                  });
                } catch (e) {
                  console.log('Tracking failed');
                }
                
                // Redirect to target URL
                window.location.href = '${shortlink.targetUrl}';
              }
            })();
          </script>
        </body>
        </html>
      `);
    } catch (error) {
      next(error);
    }
  });

  // Track click event
  app.post("/api/track", async (req, res, next) => {
    try {
      console.log("Tracking data received:", req.body);
      const validatedData = insertClickEventSchema.parse(req.body);
      
      const clickEvent = await storage.createClickEvent(validatedData);
      console.log("Click event created:", clickEvent);
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Tracking error:", error);
      next(error);
    }
  });

  // Dashboard stats
  app.get("/api/stats", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const shortlinks = await storage.getShortlinksByUser(req.user!.id);
      const clicks = await storage.getClickEventsByUser(req.user!.id);
      
      const activeLinks = shortlinks.filter(link => link.isActive).length;
      const totalClicks = clicks.length;
      
      res.json({
        totalLinks: shortlinks.length,
        activeLinks,
        totalClicks,
        threatScore: 'Medium' // This would be calculated based on actual threat intelligence
      });
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
