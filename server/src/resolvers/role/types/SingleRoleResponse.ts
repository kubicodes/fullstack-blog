import { ObjectType, Field } from "type-graphql";
import { Role } from "../../../entities/Role";
import { FieldError } from "./FieldError";

@ObjectType()
export class SingleRoleResponse {
  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field(() => [FieldError], { nullable: true })
  errors?: [FieldError];
}
