import { Field, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";
import { User } from "./User";

@ObjectType()
export class UserResponse {
  @Field(() => [User], { nullable: true })
  users?: User[];

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
