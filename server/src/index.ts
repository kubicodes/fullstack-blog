import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { CommentResolver } from "./resolvers/comment/comment";
import { PostResolver } from "./resolvers/post/post";
import { RoleResolver } from "./resolvers/role/role";
import { UserResolver } from "./resolvers/user/user";

const main = async () => {
  const connection = await createConnection();

  await connection.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(" "),
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https,
        domain: __prod__ ? process.env.DOMAIN : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RoleResolver, UserResolver, PostResolver, CommentResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  await apolloServer.start();
  /**
   * Create a GraphQl Endpoint on Express
   */
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
};

main().catch((error) => console.error(error));
