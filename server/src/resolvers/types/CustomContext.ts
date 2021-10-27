import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { Response } from "express";
export interface CustomContext {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
  redis: Redis;
}
