declare namespace NodeJS {
  interface ProcessEnv {
    SESSION_SECRET: string;
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    DATABASE_PORT: string;
    PORT: string;
    CORS_ORIGIN: string;
    REDIS_URL: string;
  }
}
