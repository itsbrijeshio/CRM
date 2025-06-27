import { rateLimit } from "express-rate-limit";

const rateLimiter = (
  options: {
    windowMs?: number;
    max?: number;
    message?: string;
  } = {}
) =>
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    statusCode: 429,
    message: `Too many requests from this IP, please try again after ${
      (options?.windowMs as number) / 60000 || 15
    } minutes`,
    ...options,
  });

export default rateLimiter;
