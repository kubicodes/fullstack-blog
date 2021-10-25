import { Redis } from "ioredis";

export interface CustomContext {
  req: Request;
  res: Response;
  redis: Redis;
}
