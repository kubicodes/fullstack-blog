import {
  Arg, Mutation, Query,
  Resolver
} from "type-graphql";
import { Role } from "../../entities/Role";
import { RoleResponse } from "./types/RoleResponse";

@Resolver(Role)
export class RoleResolver {
  @Query(() => RoleResponse)
  async roles(): Promise<RoleResponse> {
    try {
      const foundRoles = await Role.find({});
      return { roles: foundRoles };
    } catch (error) {
      return { errors: { message: error.message } };
    }
  }

  @Mutation(() => RoleResponse)
  async createRole(@Arg("title") title: string): Promise<RoleResponse> {
    try {
      const createdRole = await Role.create({ title }).save();
      return { roles: createdRole };
    } catch (error) {
      return { errors: { message: error.message } };
    }
  }
}
