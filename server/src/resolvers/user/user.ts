import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { CustomContext } from "../types/CustomContext";
import { UserResponse } from "../types/UserResponse";
import argon2 from "argon2";
import { Role } from "../../entities/Role";

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("role") roleId: number,
    @Ctx() { req }: CustomContext
  ) {
    const hashedPassword = await argon2.hash(username);
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role_id: roleId,
    }).save();

    const matchedRole = await Role.findOne(roleId);

    return {
      ...createdUser,
      role: {
        role: {
          id: roleId,
          title: matchedRole?.title,
        },
      },
    };
  }
}
