import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import sanitizeHtml from "sanitize-html";
import { Request, Response, NextFunction } from "express";

export function applyGeneralSecurityMiddleware(app: any): void {
  // 1. Use Helmet to set security headers
  app.use(helmet());


  // 2. Rate limiter to limit repeated requests
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per windowMs
    message: { error: "Too many requests, please try again later." },
  });
  app.use(limiter);

  // 3. Enable CORS
  app.use(
    cors({
      origin: "*", 
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
    })
  );

    // 4. Middleware for sanitizing incoming HTML
    app.use((req: Request, res: Response, next: NextFunction) => {
        
        function sanitizeRecursive (data: any): any {
          if (typeof data === "string") {
            return sanitizeHtml(data); // Sanitize strings
          } else if (typeof data === "object" && data !== null) {
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                data[key] = sanitizeRecursive(data[key]); // Recursively sanitize objects
              }
            }
          }
          return data;
        };
    
        req.body = sanitizeRecursive(req.body);
        req.query = sanitizeRecursive(req.query);
        req.params = sanitizeRecursive(req.params);
    
        next();
      });
}
