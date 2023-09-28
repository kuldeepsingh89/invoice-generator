import rateLimit from "express-rate-limit";
import { systemLogs } from "../utils/Logger.js";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message:
      "Too many requests from the IP address, please try again after 15 minutes",
  },
  handler: (req, res, next, options) => {
    systemLogs.error(
      `Too many request: ${options.message.message}\t${req.url}\t${req.method}\t${req.headers.origin}`,
    );

    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const loginLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 20,
  message: {
    message:
      "Too many login attempt requests from the IP address, please try again after 30 minutes",
  },
  handler: (req, res, next, options) => {
    systemLogs.error(
      `Too many request: ${options.message.message}\t${req.url}\t${req.method}\t${req.headers.origin}`,
    );

    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
