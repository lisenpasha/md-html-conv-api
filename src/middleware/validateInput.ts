import { Request, Response, NextFunction } from "express";
import validator from "validator"; // Install this library: npm install validator
import sanitizeHtml from "sanitize-html";

export function validateAndSanitizeInput(req: Request, res: Response, next: NextFunction): void {
  const { content, url, selector } = req.body;

  try {
    // 1. Validate and sanitize URL
    if (url) {
      if (!validator.isURL(url, { protocols: ["http", "https"], require_protocol: true })) {
        res.status(400).json({ error: "Invalid URL format." });
        return;
      }
      req.body.url = validator.trim(url); // Sanitize by trimming spaces
    }

    // 2. Sanitize content to prevent XSS attacks. (if present)
    if (content) {
      req.body.content = sanitizeHtml(content)
    }

    

    next(); // Proceed to the next middleware/controller
  } catch (error: any) {
    res.status(500).json({ error: "Error validating input: " + error.message });
  }
}
