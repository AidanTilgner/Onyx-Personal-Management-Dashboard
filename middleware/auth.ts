import { Response, Request, NextFunction } from "express";
import { readFileSync } from "fs";
import Logger from "../utils/logger";

const apiKeys = JSON.parse(readFileSync(".api-keys.json", "utf-8"));

const authLogger = new Logger({
  name: "Auth Middleware",
});

export default async function verifyAPIKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const apiKey =
      req.headers["x-api-key"] ||
      (req.headers["Authorization"] as string).split(" ")[1];
    const service = req.headers["x-service"] as string;
    if (!apiKey) {
      authLogger.warn("No API key provided");
      return res.status(401).json({
        error: "Unauthorized, no API key provided",
      });
    }
    if (!service) {
      authLogger.warn("No service provided");
      return res.status(401).json({
        error: "Unauthorized, no service provided",
      });
    }
    if (!apiKeys[service].includes(apiKey)) {
      authLogger.warn(`Unauthorized API key: ${apiKey}`);
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    next();
  } catch (error) {
    authLogger.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
