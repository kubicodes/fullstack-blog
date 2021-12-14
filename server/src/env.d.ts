declare namespace NodeJS {
  interface ProcessEnv {
    SESSION_SECRET: string;
    DATABASE_URL: string;
    DATABASE_PORT: string;
    CORS_ORIGIN: string;
    REDIS_URL: string;
    DOMAIN: string;
  }
}