import { MiddlewareFn } from "type-graphql";
import { CustomContext } from "../resolvers/types/CustomContext";

export const isAuth: MiddlewareFn<CustomContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }

  return next();
};
