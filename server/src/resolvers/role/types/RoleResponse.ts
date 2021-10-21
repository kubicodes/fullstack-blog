import { ObjectType, Field } from "type-graphql";
import { Role } from "../../../entities/Role";
import { FieldError } from "./FieldError";

@ObjectType()
export class RoleResponse {
  @Field(() => [Role], { nullable: true })
  roles?: Role[];

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError;
}
