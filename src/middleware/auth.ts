import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

function parseApiKeys(): Record<string, string> {
    const apiKeysEnv = process.env.API_KEYS || "";
    const apiKeysMap: Record<string, string> = {};
  
    apiKeysEnv.split(",").forEach((pair) => {
      const [client, key] = pair.split(":");
      if (client && key) {
        apiKeysMap[client.trim()] = key.trim();
      }
    });
  
    return apiKeysMap;
  }
const API_KEYS = parseApiKeys();

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    res.status(401).json({ error: "Unauthorized: API key is missing." });
    return;
  }

  const isValid = Object.values(API_KEYS).includes(apiKey);

  if (!isValid) {
    res.status(401).json({ error: "Unauthorized: Invalid API key." });
    return;
  }

  next();
};
