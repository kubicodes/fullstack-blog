import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Role } from "../../entities/Role";
import { validateTitle } from "../utils/validation/validateTitle";
import { RoleResponse } from "../types/RoleResponse";
import { SingleRoleResponse } from "../types/SingleRoleResponse";

@Resolver(Role)
export class RoleResolver {
  @Query(() => RoleResponse)
  async roles(): Promise<RoleResponse> {
    try {
      const foundRoles = await Role.find({});

      if (!foundRoles) {
        return { errors: [{ message: "No Roles exists" }] };
      }

      return { roles: foundRoles };
    } catch (error) {
      return { errors: [{ message: error.message }] };
    }
  }

  @Query(() => SingleRoleResponse)
  async role(@Arg("id") id: number): Promise<SingleRoleResponse> {
    try {
      if (!id) {
        return { errors: [{ field: "id", message: "ID cannot be empty" }] };
      }

      const foundRole = await Role.findOne(id);

      if (!foundRole) {
        return {
          errors: [
            { field: "id", message: `Role with ID ${id} does not exist` },
          ],
        };
      }

      return { role: foundRole };
    } catch (error) {
      return { errors: [{ message: error.message }] };
    }
  }

  @Mutation(() => SingleRoleResponse)
  async createRole(@Arg("title") title: string): Promise<SingleRoleResponse> {
    const titleValidationResult = validateTitle(title, 3);

    if (titleValidationResult) {
      return { errors: titleValidationResult.errors };
    }

    let createdRole;
    try {
      createdRole = await Role.create({ title });
    } catch (error) {
      return {
        errors: [
          {
            message: "Unexpected Server error creating role. Try again later",
          },
        ],
      };
    }

    try {
      await createdRole?.save();
    } catch (error) {
      return {
        errors: [
          {
            field: "title",
            message: `Role with title ${title} already exists`,
          },
        ],
      };
    }

    return { role: createdRole };
  }

  @Mutation(() => SingleRoleResponse)
  async deleteRole(@Arg("id") id: number): Promise<SingleRoleResponse> {
    try {
      if (!id) {
        return { errors: [{ field: "id", message: "ID cannot be empty" }] };
      }

      const foundRole = await Role.findOne(id);

      if (!foundRole) {
        return {
          errors: [
            { field: "id", message: `Role with ID ${id} does not exist` },
          ],
        };
      }

      return { role: foundRole };
    } catch (error) {
      return { errors: [{ message: error.message }] };
    }
  }

  @Mutation(() => SingleRoleResponse)
  async updateRole(
    @Arg("id") id: number,
    @Arg("title") title: string
  ): Promise<SingleRoleResponse> {
    if (!id) {
      return { errors: [{ field: "id", message: "ID cannot be empty" }] };
    }

    const titleValidationResult = validateTitle(title, 3);

    if (titleValidationResult) {
      return { errors: titleValidationResult.errors };
    }

    try {
      await Role.update({ id }, { title });
    } catch (error) {
      return {
        errors: [{ message: "Error while Updating role. Try again later" }],
      };
    }

    let updatedRole;
    try {
      updatedRole = await Role.findOne(id);
    } catch (error) {
      return {
        errors: [{ message: "Unexpected Server Error. Try again later" }],
      };
    }
    return { role: updatedRole };
  }
}
