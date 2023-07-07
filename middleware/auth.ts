import { verifyToken } from "../utils/auth";
import { Request, Response, NextFunction } from "express";
import Logger from "../utils/logger";
import { getRequestPath, getRequesterInfo } from "../utils/requests";
import UserController from "../controllers/User";
import { readFileSync } from "fs";

const authLogger = new Logger({ name: "Auth Middleware" });

const apiKeys = JSON.parse(readFileSync(".api-keys.json", "utf-8"));

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const requesterInfo = getRequesterInfo(req);
    if (!token) {
      authLogger.warn(
        "No token provided",
        JSON.stringify(requesterInfo),
        JSON.stringify(getRequestPath(req))
      );
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const decoded = await verifyToken(token);
    if (!decoded) {
      // attempt to refresh token
      const refreshed = await UserController.refreshStatic({
        refreshToken: req.headers["x-refresh-token"] as string,
      });
      if (!refreshed) {
        authLogger.warn(
          "Invalid token",
          JSON.stringify(requesterInfo),
          JSON.stringify(getRequestPath(req))
        );
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      req.body.decoded = await verifyToken(refreshed.accessToken);
      res.set({
        "x-refreshed": "true",
        "x-access-token": refreshed.accessToken,
        "x-refresh-token": refreshed.refreshToken,
      });
      return next();
    }
    req.body.decoded = decoded;
    next();
  } catch (error) {
    authLogger.error(
      error,
      JSON.stringify(getRequesterInfo(req)),
      JSON.stringify(getRequestPath(req))
    );
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.body.decoded;
    if (role !== "admin") {
      authLogger.warn(
        "Unauthorized access",
        JSON.stringify(getRequesterInfo(req)),
        JSON.stringify(getRequestPath(req))
      );
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    authLogger.error(
      error,
      JSON.stringify(getRequesterInfo(req)),
      JSON.stringify(getRequestPath(req))
    );
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export async function verifyAPIKey(
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
    if (!apiKeys[service]?.includes(apiKey)) {
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
